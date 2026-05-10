import { mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);

function usage(exitCode = 0) {
  const message = `
Usage:
  npm run new -- "My New Piece"
  npm run new -- "My New Piece" --date 2026-05-10
  npm run new -- "My New Piece" --dry-run

Creates:
  content/YYYY/MM/my-new-piece.md
  assets/YYYY/MM/

The Markdown file includes the front matter used by archives, feeds, social previews,
source links, redirects for imported posts, and article structured data.

Then put images in the printed assets folder and reference them as:
  ![Alt text](/assets/YYYY/MM/image-name.jpg)
`;

  console.log(message.trim());
  process.exit(exitCode);
}

function optionValue(name) {
  const index = args.indexOf(name);
  if (index === -1) {
    return undefined;
  }

  return args[index + 1];
}

function hasFlag(name) {
  return args.includes(name);
}

function todayInToronto() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

function validateDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Date must use YYYY-MM-DD format: ${date}`);
  }

  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Date is not valid: ${date}`);
  }

  return date;
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const title = args.find((arg, index) => {
  if (arg.startsWith("--")) {
    return false;
  }

  const previous = args[index - 1];
  return previous !== "--date" && previous !== "--slug";
});

if (hasFlag("--help") || hasFlag("-h")) {
  usage(0);
}

if (!title) {
  usage(1);
}

const date = validateDate(optionValue("--date") || todayInToronto());
const slug = slugify(optionValue("--slug") || title);
const dryRun = hasFlag("--dry-run");

if (!slug) {
  throw new Error("Could not create a slug from the title.");
}

const [year, month] = date.split("-");
const contentDir = path.join("content", year, month);
const assetsDir = path.join("assets", year, month);
const contentPath = path.join(contentDir, `${slug}.md`);
const imageExample = `/assets/${year}/${month}/${slug}.jpg`;

const body = `---
title: ${JSON.stringify(title)}
date: ${date}
slug: ${slug}
summary: ""
topics: []
status: published
original_url: ""
featured_image: ""
canonical_url: ""
---

# ${title}

Write here.

<!-- Put images for this page in assets/${year}/${month}/ and reference them like this:
![Alt text](${imageExample})
-->
`;

if (existsSync(contentPath)) {
  throw new Error(`Content file already exists: ${contentPath}`);
}

if (!dryRun) {
  await mkdir(contentDir, { recursive: true });
  await mkdir(assetsDir, { recursive: true });
  await writeFile(contentPath, body, "utf8");
}

console.log(`Content: ${contentPath}`);
console.log(`Assets:  ${assetsDir}/`);
console.log(`Image:   ![Alt text](${imageExample})`);

if (dryRun) {
  console.log("Dry run only; no files were written.");
}
