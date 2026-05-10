module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.ignores.add(".git/**");
  eleventyConfig.ignores.add(".github/**");
  eleventyConfig.ignores.add(".venv/**");
  eleventyConfig.ignores.add("_site/**");
  eleventyConfig.ignores.add("site/**");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("README.md");

  eleventyConfig.addGlobalData("layout", "layout.njk");
  eleventyConfig.addGlobalData("site", {
    name: "The Vault - James Burchill",
    description: "A Markdown-first public vault for durable writing, notes, references, and source material.",
    url: "https://vault.jamesburchill.com",
    repository: "https://github.com/jamesburchill/vault",
    copyrightYear: new Date().getFullYear(),
    buildDate: new Date()
  });

  function contentDate(item) {
    if (item.data.date) {
      return new Date(item.data.date);
    }

    const match = item.inputPath.match(/content\/(\d{4})\/(\d{2})\//);
    if (match) {
      return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1));
    }

    return new Date(0);
  }

  function monthKey(item) {
    const match = item.inputPath.match(/content\/(\d{4})\/(\d{2})\//);
    if (!match) {
      return null;
    }

    return `${match[1]}-${match[2]}`;
  }

  function monthTitle(year, month) {
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
    return new Intl.DateTimeFormat("en-CA", {
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    }).format(date);
  }

  function isPublished(item) {
    const status = String(item.data.status || "published").toLowerCase();
    return status !== "draft" && status !== "private";
  }

  function oldWordPressPath(originalUrl) {
    if (!originalUrl) {
      return false;
    }

    let url;
    try {
      url = new URL(originalUrl);
    } catch {
      return false;
    }

    let pathname = url.pathname;
    if (!pathname || pathname === "/" || pathname.startsWith("/content/")) {
      return false;
    }

    if (!pathname.endsWith("/")) {
      pathname = `${pathname}/`;
    }

    return pathname;
  }

  eleventyConfig.addCollection("vaultContent", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/**/*.md")
      .filter(isPublished)
      .filter((item) => !item.inputPath.endsWith("/index.md"))
      .filter((item) => !item.inputPath.endsWith("/months.md"))
      .filter((item) => !item.inputPath.endsWith("/years.md"))
      .sort((a, b) => contentDate(b) - contentDate(a));
  });

  eleventyConfig.addCollection("vaultMonths", function (collectionApi) {
    const months = new Map();

    collectionApi.getFilteredByGlob("content/**/*.md")
      .filter(isPublished)
      .filter((item) => !item.inputPath.endsWith("/index.md"))
      .filter((item) => !item.inputPath.endsWith("/months.md"))
      .filter((item) => !item.inputPath.endsWith("/years.md"))
      .forEach((item) => {
        const key = monthKey(item);
        if (!key) {
          return;
        }

        const [year, month] = key.split("-");
        if (!months.has(key)) {
          months.set(key, {
            key,
            year,
            month,
            title: monthTitle(year, month),
            url: `/content/${year}/${month}/`,
            items: []
          });
        }

        months.get(key).items.push(item);
      });

    return [...months.values()]
      .map((entry) => ({
        ...entry,
        items: entry.items.sort((a, b) => contentDate(b) - contentDate(a))
      }))
      .sort((a, b) => b.key.localeCompare(a.key));
  });

  eleventyConfig.addCollection("vaultYears", function (collectionApi) {
    const years = new Map();

    collectionApi.getFilteredByGlob("content/**/*.md")
      .filter(isPublished)
      .filter((item) => !item.inputPath.endsWith("/index.md"))
      .filter((item) => !item.inputPath.endsWith("/months.md"))
      .filter((item) => !item.inputPath.endsWith("/years.md"))
      .forEach((item) => {
        const key = monthKey(item);
        if (!key) {
          return;
        }

        const [year, month] = key.split("-");
        if (!years.has(year)) {
          years.set(year, {
            year,
            title: year,
            url: `/content/${year}/`,
            items: [],
            months: new Map()
          });
        }

        const yearEntry = years.get(year);
        yearEntry.items.push(item);

        if (!yearEntry.months.has(key)) {
          yearEntry.months.set(key, {
            key,
            year,
            month,
            title: monthTitle(year, month),
            url: `/content/${year}/${month}/`,
            items: []
          });
        }

        yearEntry.months.get(key).items.push(item);
      });

    return [...years.values()]
      .map((entry) => ({
        ...entry,
        items: entry.items.sort((a, b) => contentDate(b) - contentDate(a)),
        months: [...entry.months.values()]
          .map((month) => ({
            ...month,
            items: month.items.sort((a, b) => contentDate(b) - contentDate(a))
          }))
          .sort((a, b) => b.key.localeCompare(a.key))
      }))
      .sort((a, b) => b.year.localeCompare(a.year));
  });

  eleventyConfig.addCollection("wordpressRedirects", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/**/*.md")
      .filter(isPublished)
      .filter((item) => oldWordPressPath(item.data.original_url))
      .sort((a, b) => contentDate(b) - contentDate(a));
  });

  eleventyConfig.addFilter("readableDate", function (value) {
    return new Intl.DateTimeFormat("en-CA", {
      dateStyle: "long",
      timeZone: "UTC"
    }).format(new Date(value));
  });

  eleventyConfig.addFilter("isoDate", function (value) {
    return new Date(value).toISOString();
  });

  eleventyConfig.addFilter("rssDate", function (value) {
    return new Date(value).toUTCString();
  });

  eleventyConfig.addFilter("json", function (value) {
    return JSON.stringify(value, null, 2);
  });

  eleventyConfig.addFilter("absoluteUrl", function (value, siteUrl) {
    if (!value) {
      return "";
    }

    try {
      return new URL(value).toString();
    } catch {
      return new URL(value, siteUrl).toString();
    }
  });

  eleventyConfig.addFilter("summary", function (data) {
    return data.summary || data.description || "";
  });

  eleventyConfig.addFilter("topics", function (data) {
    return data.topics || data.tags || [];
  });

  eleventyConfig.addFilter("isVaultArticle", function (inputPath) {
    const normalizedPath = String(inputPath || "").replace(/^\.\//, "");
    return /^content\/\d{4}\/\d{2}\/[^/]+\.md$/.test(normalizedPath);
  });

  eleventyConfig.addFilter("sourceUrl", function (inputPath, repository) {
    const normalizedPath = String(inputPath || "").replace(/^\.\//, "");
    const encodedPath = normalizedPath.split("/").map(encodeURIComponent).join("/");
    return `${repository}/blob/main/${encodedPath}`;
  });

  eleventyConfig.addFilter("oldWordPressPath", oldWordPressPath);

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"]
  };
};
