---
title: "Making The Vault Easier for Machines to Read"
date: 2026-05-11
slug: making-the-vault-easier-for-machines-to-read
summary: "Why The Vault now generates a search index and validates article metadata while keeping Markdown as the canonical source."
topics:
  - publishing
  - markdown
  - ai-search
  - structured-data
status: published
original_url: ""
featured_image: "/assets/2026/05/making-the-vault-easier-for-machines-to-read.png"
canonical_url: ""
---

# Making The Vault Easier for Machines to Read

![Markdown source material flowing into structured discovery data](/assets/2026/05/making-the-vault-easier-for-machines-to-read.png)

I made a small change to this vault that matters more than it looks.

The site now generates a lightweight search index during the normal build. It also validates the front matter on article files before publishing. Nothing about that is flashy. There is no new database, no admin screen, no CMS layer, and no extra place where content has to be maintained by hand.

That is the point.

The Markdown files remain the source of record. The public HTML remains the human-facing version. The new JSON is just a machine-readable projection of the same source material.

## Why This Matters

Most websites are still built around the assumption that the rendered page is the main object.

That made sense when people were the primary readers and search engines were mostly crawling pages. But the web is shifting. Search systems, AI tools, retrieval engines, archive tools, and personal agents increasingly need clean metadata and stable source links. They do not just need a nice page. They need to understand what the page is, where it came from, how it is classified, and where the canonical source lives.

I do not want those systems guessing.

So the vault now exposes a generated `search-index.json` file. Each published article gets a metadata record with its title, slug, public URL, source path, GitHub source URL, raw Markdown URL, publication date, status, topics, summary, and featured image.

That gives machines a clear map without changing the writing workflow.

## Why Generated JSON

The important design decision is that the JSON is not authored directly.

If I had to maintain Markdown, HTML, RSS, JSON Feed, sitemap entries, AI discovery files, and search records by hand, the system would drift. Something would eventually disagree with something else. A title would be updated in one place and missed in another. A topic would change in the article but not in the index. A URL would move and leave stale metadata behind.

That is exactly the kind of maintenance debt I moved away from.

Instead, the article front matter is the compact source of truth:

- title;
- date;
- slug;
- summary;
- topics;
- status;
- image metadata;
- canonical/source hints when needed.

Everything else is generated from that.

The generated files can be deleted and rebuilt. They are useful, but they are not canonical. That distinction keeps the system honest.

## Why Validation

The second change is validation.

If the front matter is now feeding archive pages, feeds, structured data, `llms.txt`, and the search index, then missing metadata is no longer a cosmetic issue. It affects discovery, parsing, preview quality, and machine readability.

The build now checks article front matter for the fields the vault expects: title, slug, date, status, topics, and summary. If a required field is missing or malformed, the build can fail clearly instead of quietly publishing incomplete metadata.

That is a better failure mode.

I would rather catch a missing summary before publishing than ship a page that looks fine to a human reader but presents weak or ambiguous data to everything downstream.

## What I Did Not Add

I deliberately did not add full per-article JSON files yet.

That may come later, but it is not the first move. A full article JSON file can be useful for retrieval systems, offline archives, or agent workflows, especially if it includes the Markdown body, plain text, word count, and reading time. But it also duplicates more of the canonical source.

Duplication is acceptable when it is generated and disposable, but it still deserves a reason.

For now, the search index gives the vault a clean public catalogue without creating a second representation of every article body.

I also avoided adding `id` and `type` to the author-maintained front matter. Those are generated system fields. The stable ID can come from the public URL. The type can default to `article`. Authors should maintain meaning, not bookkeeping.

## The Larger Pattern

This is the shape I want for the vault:

- Markdown is the durable source.
- HTML is the readable presentation.
- JSON is a generated projection.
- Feeds and discovery files are outputs.
- The build enforces the contract.

That is a simple publishing model, but it is a useful one.

It means a person can read the site normally. A search engine can crawl it. An AI system can find the content map. A future tool can pull the raw Markdown. And the source still stays plain, inspectable, portable, and versioned in Git.

The web page is one output.

The Markdown is the record.

Everything else should be rebuilt from the record, not manually kept beside it.
