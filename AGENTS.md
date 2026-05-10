# Repository Instructions

## Working Principles

- Always use Canadian English spelling: `colour`, `behaviour`, `organise`, `artefact`, and similar forms.
- Treat Markdown as the canonical source of record. Generated HTML is only a public rendering of the Markdown.
- This repo is a public vault, not a CMS clone. Prefer simple, durable files, explicit metadata, stable URLs, and machine-readable structure over platform-specific convenience.
- Assume the repo is being shaped for both human readers and AI/search systems. Keep content easy to parse, cite, summarize, archive, and migrate.
- Do not make broad site architecture changes unless the user explicitly asks for them.

## Content Model

- Articles, notes, and source material live in `content/YYYY/MM/`.
- Supporting assets for dated content live in `assets/YYYY/MM/`.
- Article URLs are generated as `/content/YYYY/MM/slug/`.
- Shared images and site-wide static assets live directly under `assets/`.
- `_site/` is build output. Do not edit generated files by hand.

## Creating New Content

- Prefer the repo helper:

```sh
make content "Article Title"
```

- Use `DATE=YYYY-MM-DD` when the user gives a specific publication date.
- Use the current date in `America/Toronto` when no date is supplied.
- New content can default to `status: published`; it will not go public until the user commits and pushes.
- Use `status: draft` only when the user asks for a draft or the content is clearly incomplete.
- Keep article filenames and slugs lowercase, descriptive, and stable.

## Front Matter

Every article should use this shape unless existing content proves a narrower local convention:

```yaml
---
title: "Example Title"
date: 2026-05-10
slug: example-title
summary: "One concise sentence for archives, feeds, previews, and AI/search systems."
topics:
  - publishing
  - markdown
status: published
original_url: ""
featured_image: ""
canonical_url: ""
---
```

- Write summaries as intentional metadata, not filler. They are used by archives, feeds, previews, and machine-readable discovery files.
- Use `topics` for useful retrieval and grouping. Prefer a few concrete topics over a long tag list.
- Use `original_url` only for imported legacy WordPress posts or other migrated source URLs.
- Use `canonical_url` only when the canonical page should deliberately be somewhere other than the generated vault URL.
- Use `featured_image` when an article has a primary image or social-preview asset.

## Images And Assets

- Put article-specific images in the matching dated asset folder, for example `assets/2026/05/example.png`.
- Reference images from Markdown with root-relative site paths:

```md
![Useful alt text](/assets/2026/05/example.png)
```

- Generated featured images should represent the article idea clearly without relying on readable embedded text, logos, or brand marks.
- Keep source image files when they are useful for future edits, such as SVGs used to render PNG featured images.
- Use descriptive asset filenames based on the article slug.

## Writing Guidance

- Preserve James Burchill's voice: direct, systems-aware, pragmatic, and readable.
- Prefer concrete reasoning over generic thought-leadership language.
- When writing in the first person, make the claim specific enough that it sounds owned, not performative.
- Avoid overexplaining the website machinery inside the article unless the machinery is the subject.
- Do not invent personal history, client facts, metrics, or external claims. If a detail matters and is not in the prompt or repo, ask or keep it general.

## WordPress Migration

- Imported WordPress content should become clean Markdown, not WordPress-shaped Markdown.
- Preserve the original source URL in `original_url` so `redirects.njk` can generate legacy redirects.
- Review imported Markdown before treating it as publishable. Clean up shortcodes, escaped markup, broken media, and CMS-specific residue.
- Do not keep WordPress categories or slugs automatically if clearer vault metadata would serve readers and discovery better.

## Machine-Readable Publishing

- Keep `feeds/vault.json.njk`, `feeds/rss.xml.njk`, `llms.txt.njk`, and `sitemap.xml.njk` in mind when changing metadata or URLs.
- Favour explicit front matter over implicit inference from rendered HTML.
- Maintain stable URLs unless the user explicitly wants a rename or redirect.
- When changing content paths or slugs for already-published material, consider redirect and canonical implications.

## Validation

- For content-only changes, run:

```sh
make build
```

- `npm run build` is also acceptable and runs the same Eleventy build path.
- For helper-script changes, test the script path directly or through the Makefile target it supports.
- Before reporting completion, check `git status --short` and mention unrelated pre-existing changes if present.

