# The Vault - James Burchill

This repository is the source for the public vault at `https://vault.jamesburchill.com`.

The public homepage is [index.md](index.md). This README is for operating the repository.

## Publishing Model

Content is written as Markdown and published as a static site with Eleventy and GitHub Pages. The Markdown files are the source of record; the generated website is the readable public view.

On every push to `main`, GitHub Actions builds the site and deploys the generated `_site/` output to GitHub Pages.

## Source Layout

- `index.md` controls the public homepage.
- `about.md` controls `/about/`.
- `now.md` controls `/now/`.
- `content/YYYY/MM/*.md` contains dated articles, notes, and source material.
- `assets/YYYY/MM/` contains images and supporting files for dated content.
- `assets/` contains shared site assets such as logos and icons.
- `search-index.json.njk`, `feeds/vault.json.njk`, `feeds/rss.xml.njk`, `llms.txt.njk`, and `sitemap.xml.njk` generate machine-readable discovery files.
- `404.md` controls the GitHub Pages not-found page.
- `redirects.njk` generates static redirect pages for imported WordPress URLs using `original_url`.

## Create Content

Use the Makefile helper:

```sh
make content "My New Piece"
```

It creates:

```text
content/YYYY/MM/my-new-piece.md
assets/YYYY/MM/
```

To backdate or future-date a piece:

```sh
make content "My New Piece" DATE=2026-05-10
```

To preview what would be created without writing files:

```sh
make content-dry-run "My New Piece"
```

## Front Matter

New content should usually include front matter like this:

```yaml
---
title: "Example Page"
date: 2026-05-10
slug: example-page
summary: "One-sentence summary for search and previews."
topics:
  - publishing
  - markdown
status: published
original_url: ""
featured_image: ""
canonical_url: ""
---
```

Use `original_url` for imported legacy URLs. Use `featured_image` for social previews and article metadata. Leave `canonical_url` blank unless the canonical URL should deliberately point somewhere other than the generated vault URL.

## Machine-Readable Publishing

Markdown files in `content/YYYY/MM/` are canonical. JSON, RSS, `llms.txt`, and sitemap files are generated projections from that Markdown during the Eleventy build.

Generated public artefacts include:

- `/search-index.json` for lightweight search, AI, and discovery metadata.
- `/feeds/vault.json` for JSON Feed consumers.
- `/feeds/rss.xml` for RSS readers.
- `/llms.txt` for AI-oriented discovery.
- `/sitemap.xml` for crawler discovery.

The generated JSON is not maintained by hand. Run `make build` or `npm run build` locally to validate content metadata and regenerate the public artefacts into `_site/`. The GitHub Pages workflow runs the same build on every push to `main`.

## Images

Put images for a dated piece in the matching assets folder:

```text
assets/YYYY/MM/image-name.jpg
```

Reference them from Markdown with an absolute site path:

```md
![Alt text for the image](/assets/YYYY/MM/image-name.jpg)
```

Site CSS constrains article images to the text width, so large source images can remain large on disk without breaking the page layout.

## Local Preview

Install dependencies once:

```sh
npm install
```

Run the local preview server:

```sh
make preview
```

Then open the URL printed by Eleventy, usually `http://127.0.0.1:8000` or the next available port.

## Build

Run a production build locally:

```sh
make build
```

or:

```sh
npm run build
```

## Import WordPress Content

The temporary importer can pull public WordPress posts into the vault format:

```sh
make import-wordpress-dry-run
make import-wordpress
```

Review imported Markdown and images before publishing.

## GitHub Pages

In the GitHub repository settings, configure Pages to use **GitHub Actions** as the build and deployment source.

When the custom domain is ready, set `vault.jamesburchill.com` in GitHub Pages and point DNS at GitHub Pages.
