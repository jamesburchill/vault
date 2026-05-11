const path = require("node:path");
const fs = require("node:fs");

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
  eleventyConfig.ignores.add("AGENTS.md");

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

  function sourcePath(inputPath) {
    return String(inputPath || "").replace(/^\.\//, "");
  }

  function isVaultArticlePath(inputPath) {
    return /^content\/\d{4}\/\d{2}\/[^/]+\.md$/.test(sourcePath(inputPath));
  }

  function vaultArticleItems(collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/**/*.md")
      .filter((item) => isVaultArticlePath(item.inputPath));
  }

  function encodeSourcePath(inputPath) {
    return sourcePath(inputPath).split("/").map(encodeURIComponent).join("/");
  }

  function frontMatterFields(inputPath) {
    const content = fs.readFileSync(sourcePath(inputPath), "utf8");
    const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

    if (!match) {
      return new Set();
    }

    return new Set(
      match[1]
        .split(/\r?\n/)
        .map((line) => line.match(/^([A-Za-z0-9_-]+):(?:\s|$)/))
        .filter(Boolean)
        .map((field) => field[1])
    );
  }

  function repositorySourceUrl(inputPath, repository) {
    return `${repository}/blob/main/${encodeSourcePath(inputPath)}`;
  }

  function repositoryRawSourceUrl(inputPath, repository) {
    const encodedPath = encodeSourcePath(inputPath);

    try {
      const url = new URL(repository);
      if (url.hostname === "github.com") {
        return `https://raw.githubusercontent.com${url.pathname}/main/${encodedPath}`;
      }
    } catch {
      // Fall through to a generic repository URL shape.
    }

    return `${repository}/raw/main/${encodedPath}`;
  }

  function validateVaultArticleFrontMatter(items) {
    const errors = [];
    const requiredFields = ["title", "slug", "date", "status", "topics", "summary"];
    const validStatuses = new Set(["published", "draft", "private"]);

    for (const item of items) {
      const data = item.data || {};
      const path = sourcePath(item.inputPath);
      const fields = frontMatterFields(item.inputPath);

      for (const field of requiredFields) {
        if (!fields.has(field)) {
          errors.push(`${path}: missing required front matter field "${field}"`);
        }
      }

      if (fields.has("title") && typeof data.title !== "string") {
        errors.push(`${path}: "title" must be a string`);
      }

      if (fields.has("slug") && (typeof data.slug !== "string" || !data.slug.trim())) {
        errors.push(`${path}: "slug" must be a non-empty string`);
      }

      if (fields.has("summary") && typeof data.summary !== "string") {
        errors.push(`${path}: "summary" must be a string`);
      }

      if (fields.has("topics") && !Array.isArray(data.topics)) {
        errors.push(`${path}: "topics" must be a list`);
      }

      if (fields.has("status")) {
        const status = String(data.status || "").toLowerCase();
        if (!validStatuses.has(status)) {
          errors.push(`${path}: "status" must be one of published, draft, or private`);
        }
      }

      if (fields.has("date") && Number.isNaN(new Date(data.date).getTime())) {
        errors.push(`${path}: "date" must be a valid date`);
      }
    }

    if (errors.length) {
      throw new Error(`Content front matter validation failed:\n${errors.join("\n")}`);
    }
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

  function relativeSiteUrl(value, fromUrl) {
    if (!value || !value.startsWith("/") || value.startsWith("//")) {
      return value;
    }

    const [, pathname, suffix = ""] = value.match(/^([^?#]*)([?#].*)?$/);
    const fromPath = String(fromUrl || "/").replace(/^\//, "").replace(/\/$/, "");
    const targetPath = pathname.replace(/^\//, "").replace(/\/$/, "");
    const relativePath = path.posix.relative(fromPath, targetPath) || ".";

    return `${relativePath}${pathname.endsWith("/") && relativePath !== "." ? "/" : ""}${suffix}`;
  }

  function rewriteRootRelativeUrls(content, pageUrl) {
    return content
      .replace(/\b(href|src)=(["'])(\/(?!\/)[^"']*)\2/g, (_match, attribute, quote, value) => {
        return `${attribute}=${quote}${relativeSiteUrl(value, pageUrl)}${quote}`;
      })
      .replace(/(content=(["'])\s*\d+\s*;\s*url=)(\/(?!\/)[^"']*)(\2)/gi, (_match, prefix, _quote, value, suffix) => {
        return `${prefix}${relativeSiteUrl(value, pageUrl)}${suffix}`;
      });
  }

  eleventyConfig.addCollection("vaultContent", function (collectionApi) {
    const items = vaultArticleItems(collectionApi);
    validateVaultArticleFrontMatter(items);

    return items
      .filter(isPublished)
      .sort((a, b) => contentDate(b) - contentDate(a));
  });

  eleventyConfig.addCollection("vaultMonths", function (collectionApi) {
    const months = new Map();

    vaultArticleItems(collectionApi)
      .filter(isPublished)
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

    vaultArticleItems(collectionApi)
      .filter(isPublished)
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
    return vaultArticleItems(collectionApi)
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

  eleventyConfig.addFilter("dateOnly", function (value) {
    return new Date(value).toISOString().slice(0, 10);
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
    return isVaultArticlePath(inputPath);
  });

  eleventyConfig.addFilter("sourcePath", function (inputPath) {
    return sourcePath(inputPath);
  });

  eleventyConfig.addFilter("sourceUrl", function (inputPath, repository) {
    return repositorySourceUrl(inputPath, repository);
  });

  eleventyConfig.addFilter("rawSourceUrl", function (inputPath, repository) {
    return repositoryRawSourceUrl(inputPath, repository);
  });

  eleventyConfig.addFilter("oldWordPressPath", oldWordPressPath);

  eleventyConfig.addTransform("relativeInternalUrls", function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    return rewriteRootRelativeUrls(content, this.page.url);
  });

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
