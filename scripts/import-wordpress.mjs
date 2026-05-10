import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import TurndownService from "turndown";

const SOURCE = "https://vault.jamesburchill.com";
const API = `${SOURCE}/wp-json/wp/v2/posts`;
const args = process.argv.slice(2);

function hasFlag(name) {
  return args.includes(name);
}

function optionValue(name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

function usage(exitCode = 0) {
  console.log(`
Usage:
  node scripts/import-wordpress.mjs --dry-run
  node scripts/import-wordpress.mjs --limit 10
  node scripts/import-wordpress.mjs

Imports public WordPress posts from ${SOURCE} into:
  content/YYYY/MM/
  assets/YYYY/MM/
`.trim());
  process.exit(exitCode);
}

if (hasFlag("--help") || hasFlag("-h")) {
  usage(0);
}

const dryRun = hasFlag("--dry-run");
const limit = optionValue("--limit") ? Number(optionValue("--limit")) : undefined;

if (limit !== undefined && (!Number.isInteger(limit) || limit < 1)) {
  throw new Error("--limit must be a positive integer.");
}

const turndown = new TurndownService({
  codeBlockStyle: "fenced",
  headingStyle: "atx"
});

turndown.addRule("removeScriptsAndStyles", {
  filter: ["script", "style", "noscript"],
  replacement: () => ""
});

turndown.addRule("wordpressFileObject", {
  filter: (node) => node.nodeName === "OBJECT",
  replacement: () => ""
});

function decodeEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&hellip;/g, "...")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, "\"")
    .replace(/&ldquo;/g, "\"")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'");
}

function stripHtml(value = "") {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\[[^\]]*...\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value) {
  return decodeEntities(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function yamlString(value) {
  return JSON.stringify(value ?? "");
}

function yamlList(values) {
  if (!values.length) {
    return " []";
  }

  return `\n${values.map((value) => `  - ${value}`).join("\n")}`;
}

function terms(post) {
  const groups = post._embedded?.["wp:term"] || [];
  return groups.flat()
    .filter((term) => term.taxonomy === "category" || term.taxonomy === "post_tag")
    .map((term) => slugify(term.slug || term.name))
    .filter(Boolean);
}

function unique(values) {
  return [...new Set(values)];
}

function dateParts(post) {
  const date = post.date?.slice(0, 10) || new Date().toISOString().slice(0, 10);
  const [year, month] = date.split("-");
  return { date, year, month };
}

function uploadedAssetUrl(url) {
  try {
    const parsed = new URL(decodeEntities(url), SOURCE);
    if (parsed.hostname !== "vault.jamesburchill.com") {
      return null;
    }

    if (!parsed.pathname.startsWith("/wp-content/uploads/")) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function filenameFromUrl(url, fallback) {
  const raw = decodeURIComponent(path.posix.basename(url.pathname)) || fallback;
  const ext = path.extname(raw);
  const base = path.basename(raw, ext);
  const cleanBase = slugify(base) || fallback;
  const cleanExt = ext.toLowerCase().replace(/[^.a-z0-9]/g, "");
  return `${cleanBase}${cleanExt}`;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }

  return {
    body: await response.json(),
    headers: response.headers
  };
}

async function fetchPosts() {
  const first = await fetchJson(`${API}?per_page=100&_embed=1&page=1`);
  const totalPages = Number(first.headers.get("x-wp-totalpages") || 1);
  const posts = [...first.body];

  for (let page = 2; page <= totalPages; page += 1) {
    const next = await fetchJson(`${API}?per_page=100&_embed=1&page=${page}`);
    posts.push(...next.body);
  }

  return limit ? posts.slice(0, limit) : posts;
}

function uniqueFilename(name, seen) {
  if (!seen.has(name)) {
    seen.add(name);
    return name;
  }

  const ext = path.extname(name);
  const base = path.basename(name, ext);
  let index = 2;
  let candidate = `${base}-${index}${ext}`;
  while (seen.has(candidate)) {
    index += 1;
    candidate = `${base}-${index}${ext}`;
  }

  seen.add(candidate);
  return candidate;
}

async function downloadAsset(url, assetsDir, preferredName, seenNames) {
  const name = uniqueFilename(preferredName, seenNames);
  const outputPath = path.join(assetsDir, name);
  const publicPath = `/${outputPath.split(path.sep).join("/")}`;

  if (!dryRun && !existsSync(outputPath)) {
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} downloading ${url.href}`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    await mkdir(assetsDir, { recursive: true });
    await writeFile(outputPath, bytes);
  }

  return publicPath;
}

async function rewriteAssets(html, assetsDir, slug) {
  const seenNames = new Set();
  const replacements = new Map();
  const attributePattern = /\b(src|href|data)=["']([^"']+)["']/gi;
  const matches = [...html.matchAll(attributePattern)];

  for (const match of matches) {
    const original = match[2];
    if (replacements.has(original)) {
      continue;
    }

    const assetUrl = uploadedAssetUrl(original);
    if (!assetUrl) {
      continue;
    }

    const publicPath = await downloadAsset(
      assetUrl,
      assetsDir,
      `${slug}-${filenameFromUrl(assetUrl, "asset")}`,
      seenNames
    );
    replacements.set(original, publicPath);
  }

  let rewritten = html;
  for (const [original, replacement] of replacements) {
    rewritten = rewritten.split(original).join(replacement);
  }

  return { html: rewritten, assetCount: replacements.size };
}

async function mediaById(id) {
  const response = await fetch(`${SOURCE}/wp-json/wp/v2/media/${id}`);
  if (!response.ok) {
    return null;
  }

  return response.json();
}

async function featuredMedia(post) {
  const embedded = post._embedded?.["wp:featuredmedia"]?.[0];
  if (embedded?.source_url) {
    return embedded;
  }

  if (post.featured_media) {
    return mediaById(post.featured_media);
  }

  return null;
}

async function downloadFeaturedImage(post, assetsDir, slug) {
  const media = await featuredMedia(post);
  if (!media?.source_url) {
    return null;
  }

  const url = uploadedAssetUrl(media.source_url);
  if (!url) {
    return null;
  }

  const publicPath = await downloadAsset(
    url,
    assetsDir,
    `${slug}-${filenameFromUrl(url, "featured-image")}`,
    new Set()
  );

  return {
    publicPath,
    alt: stripHtml(media.alt_text || post.title?.rendered || slug)
  };
}

async function existingWordPressId(filePath) {
  if (!existsSync(filePath)) {
    return null;
  }

  const body = await readFile(filePath, "utf8");
  const match = body.match(/^wordpress_id:\s*(\d+)/m);
  return match ? Number(match[1]) : null;
}

async function outputPathFor(post, contentDir, slug) {
  const base = path.join(contentDir, `${slug}.md`);
  const existingId = await existingWordPressId(base);

  if (!existsSync(base) || existingId === post.id) {
    return base;
  }

  return path.join(contentDir, `${slug}-wp-${post.id}.md`);
}

async function importPost(post) {
  const title = stripHtml(post.title?.rendered || post.slug);
  const slug = slugify(post.slug || title);
  const summary = stripHtml(post.excerpt?.rendered || "");
  const { date, year, month } = dateParts(post);
  const contentDir = path.join("content", year, month);
  const assetsDir = path.join("assets", year, month);
  const contentPath = await outputPathFor(post, contentDir, slug);
  const topics = unique(terms(post));
  const originalUrl = post.link;

  const featured = await downloadFeaturedImage(post, assetsDir, slug);
  const rewritten = await rewriteAssets(post.content?.rendered || "", assetsDir, slug);
  const markdown = turndown.turndown(rewritten.html)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const featuredMarkdown = featured ? `![${featured.alt}](${featured.publicPath})\n\n` : "";

  const frontMatter = `---
title: ${yamlString(title)}
date: ${date}
slug: ${slug}
summary: ${yamlString(summary)}
topics:${yamlList(topics)}
status: published
original_url: ${yamlString(originalUrl)}
wordpress_id: ${post.id}
${featured ? `featured_image: ${yamlString(featured.publicPath)}\n` : ""}
---
`;

  const body = `${frontMatter}
# ${title}

${featuredMarkdown}
${markdown}
`;

  if (!dryRun) {
    await mkdir(contentDir, { recursive: true });
    await mkdir(assetsDir, { recursive: true });
    await writeFile(contentPath, body, "utf8");
  }

  return {
    contentPath,
    assetCount: rewritten.assetCount + (featured ? 1 : 0),
    title
  };
}

const posts = await fetchPosts();
console.log(`${dryRun ? "Would import" : "Importing"} ${posts.length} posts from ${SOURCE}`);

let imported = 0;
let assets = 0;

for (const post of posts) {
  const result = await importPost(post);
  imported += 1;
  assets += result.assetCount;
  console.log(`${String(imported).padStart(3, " ")}. ${result.contentPath} (${result.assetCount} assets) - ${result.title}`);
}

console.log(`${dryRun ? "Dry run complete" : "Import complete"}: ${imported} posts, ${assets} referenced uploaded assets.`);
