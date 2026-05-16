(() => {
  const root = document.querySelector("[data-vault-search]");
  if (!root) {
    return;
  }

  const form = root.querySelector("[data-search-form]");
  const input = root.querySelector("[data-search-input]");
  const status = root.querySelector("[data-search-status]");
  const results = root.querySelector("[data-search-results]");

  const state = {
    index: null,
    items: [],
    homeUrl: null
  };

  const normalize = (value) =>
    String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const tokenize = (value) =>
    normalize(value)
      .split(/[^a-z0-9]+/)
      .filter(Boolean);

  const escapeHtml = (value) =>
    String(value || "").replace(/[&<>"']/g, (character) => {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });

  const displayDate = (value) => {
    if (!value) {
      return "";
    }

    const date = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat("en-CA", {
      dateStyle: "medium",
      timeZone: "UTC"
    }).format(date);
  };

  const localUrl = (value) => {
    if (!value) {
      return "#";
    }

    try {
      const itemUrl = new URL(value);
      if (state.homeUrl && itemUrl.hostname === state.homeUrl.hostname) {
        return `${itemUrl.pathname}${itemUrl.search}${itemUrl.hash}`;
      }
      return itemUrl.toString();
    } catch {
      return value;
    }
  };

  const searchableText = (item) => {
    return normalize([
      item.title,
      item.summary,
      item.slug,
      item.date_published,
      ...(item.topics || [])
    ].join(" "));
  };

  const scoreItem = (item, query, queryTokens) => {
    const haystack = searchableText(item);
    if (!queryTokens.every((token) => haystack.includes(token))) {
      return 0;
    }

    const title = normalize(item.title);
    const summary = normalize(item.summary);
    const slug = normalize(item.slug);
    const date = normalize(item.date_published);
    const topics = normalize((item.topics || []).join(" "));

    let score = 1;

    if (title.includes(query)) {
      score += 120;
    }
    if (topics.includes(query)) {
      score += 70;
    }
    if (summary.includes(query)) {
      score += 35;
    }
    if (slug.includes(query)) {
      score += 20;
    }

    queryTokens.forEach((token) => {
      if (title.includes(token)) {
        score += 30;
      }
      if (topics.includes(token)) {
        score += 18;
      }
      if (summary.includes(token)) {
        score += 10;
      }
      if (slug.includes(token)) {
        score += 8;
      }
      if (date.includes(token)) {
        score += 5;
      }
    });

    return score;
  };

  const setStatus = (message) => {
    status.textContent = message;
  };

  const updateUrl = (query) => {
    const url = new URL(window.location.href);
    if (query) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState({}, "", url);
  };

  const renderResults = (matches, query) => {
    results.innerHTML = "";

    if (!query) {
      setStatus(`Search ${state.items.length} published article${state.items.length === 1 ? "" : "s"}.`);
      return;
    }

    if (!matches.length) {
      setStatus(`No results for "${query}".`);
      return;
    }

    setStatus(`${matches.length} result${matches.length === 1 ? "" : "s"} for "${query}".`);

    results.innerHTML = matches
      .slice(0, 25)
      .map(({ item }) => {
        const topics = (item.topics || [])
          .map((topic) => `<span>${escapeHtml(topic)}</span>`)
          .join("");
        const date = displayDate(item.date_published);

        return `
          <li class="search-result">
            <h2><a href="${escapeHtml(localUrl(item.url))}">${escapeHtml(item.title || item.slug)}</a></h2>
            <p class="search-result__meta">${escapeHtml(date)}${date && item.type ? " · " : ""}${escapeHtml(item.type || "")}</p>
            ${item.summary ? `<p>${escapeHtml(item.summary)}</p>` : ""}
            ${topics ? `<div class="search-result__topics" aria-label="Topics">${topics}</div>` : ""}
          </li>
        `;
      })
      .join("");
  };

  const runSearch = () => {
    const query = input.value.trim();
    const normalizedQuery = normalize(query);
    const queryTokens = tokenize(query);

    updateUrl(query);

    if (!state.index) {
      setStatus("Search index is still loading.");
      return;
    }

    if (!queryTokens.length) {
      renderResults([], "");
      return;
    }

    const matches = state.items
      .map((item) => ({
        item,
        score: scoreItem(item, normalizedQuery, queryTokens)
      }))
      .filter((match) => match.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return String(b.item.date_published || "").localeCompare(String(a.item.date_published || ""));
      });

    renderResults(matches, query);
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch();
  });

  input.addEventListener("input", runSearch);

  fetch("/search-index.json", {
    headers: {
      Accept: "application/json"
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Search index request failed with ${response.status}`);
      }
      return response.json();
    })
    .then((index) => {
      state.index = index;
      state.items = Array.isArray(index.items) ? index.items : [];
      state.homeUrl = index.home_page_url ? new URL(index.home_page_url) : null;

      const params = new URLSearchParams(window.location.search);
      const query = params.get("q") || "";
      input.value = query;
      runSearch();
    })
    .catch((error) => {
      console.error(error);
      setStatus("Search is unavailable because the index could not be loaded.");
    });
})();
