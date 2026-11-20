---
title: "I Built the Vault for This Web"
date: 2026-11-20
slug: i-built-the-vault-for-this-web
summary: "Firecrawl Local shows why the web needs clean content for AI, and The Vault shows how publishers can provide it with verifiable provenance."
topics:
  - publishing
  - markdown
  - ai-search
  - provenance
status: published
original_url: ""
featured_image: "/assets/2026/11/i-built-the-vault-for-this-web.png"
canonical_url: ""
---

# I Built the Vault for This Web

![A Markdown source sheet and its rendered web page joined by a thread anchored to a red seal](/assets/2026/11/i-built-the-vault-for-this-web.png)

When I saw Firecrawl Local, my first thought was, *Of course somebody built this.*

Give [Firecrawl Local](https://www.firecrawl.dev/changelog/firecrawl-local) a URL and it can turn the page into clean Markdown. Give it a site and it can crawl across pages. It runs on your own machine. There’s a real need for that because most of the web gives an AI the same thing it gives a browser and leaves the AI to work out which parts are worth reading.

I’ve been thinking about that problem from the publisher’s side for a while. In [October 2025](/content/2025/10/rebuilding-trust-in-the-age-of-synthetic-content-introducing-verified-provenance/), I wrote about how easily synthetic content could overwhelm the signals we use to decide what to believe. In May 2026, I [moved The Vault from WordPress to Markdown in Git](/content/2026/05/why-i-moved-this-site-from-wordpress-to-markdown/), added [machine-readable discovery](/content/2026/05/making-the-vault-easier-for-machines-to-read/), and shipped [per-article provenance](/content/2026/05/verified-provenance-for-the-vault/).

I expected machines to become some of the most consequential readers of anything I published. They would find it, quote it, summarize it, and put it in front of people who might never visit my site. I wanted those systems to have the original text, a stable address, and a way to trace what they found back to my publication. Firecrawl Local is a practical confirmation of that design decision. There’s enough friction in getting clean content from the web that people are building dedicated software to remove it.

## Give the machine the article

A browser receives everything it needs to present a page. An AI assistant looking for a passage also gets the menus, the footer, the related posts, and whatever else came along for the ride. At that point it has to reconstruct the boundaries of a document the author already had.

Markdown gives it the document directly. A heading marks a change of subject. A nested list preserves the relationship between points. A link carries a reference, and a fenced block gives a tool a clear boundary around the code. The same file is readable in a plain text editor, diffable in Git, and easy to pass to an assistant.

In The Vault I keep that Markdown file as the canonical source. It travels with a small set of explicit metadata, including the title, date, summary, and topics. The build uses it to generate the HTML, search and full-text indexes, feeds, sitemap, and discovery files. A browser gets a normal website. An assistant can go directly to the text. If I fix a paragraph or change a summary, the next build carries the correction through the outputs.

## Provenance gives trust something to stand on

Clean text is easy to reuse. That makes it just as easy to detach from its source.

Imagine an assistant quoting one of my articles six months from now. The quote might have come from The Vault, a mirror, a partial copy, or a summary of a summary. They can all be written in perfectly readable Markdown. To decide whether to rely on the quote, I want to know which page it came from and whether the text can be traced back to what I published.

That is why every published Vault article has a **Verified Provenance** link beside **View source Markdown**. The provenance record identifies the publisher, article URL, and source file. It carries timestamps, build metadata, and a SHA-256 hash of the rendered HTML. The publishing workflow checks the Ed25519 signatures, and the site exposes the corresponding public key. A reader or tool can use that key to check the record’s signature and recompute the hash to see whether the published page matches it.

Once I’ve established which version I’m reading and where it came from, I can assess the argument and its evidence on their merits. That ability to check the trail is what makes provenance a basis for trust. As convincing text gets cheaper to produce, I expect the ability to show where it came from to matter more to whether people believe it.

## Stack the deck in your favour

This is how I think about AI SEO. A stable URL makes an article easier to find and cite. Clear metadata helps a tool decide whether the article is relevant. Markdown lets it work with the full text. Provenance gives it an inspectable trail back to the publication. Those are advantages I can build into the site regardless of which assistant or search engine somebody uses.

The part I’m proudest of is that the system runs as part of publishing. I edit one article in Git. The build produces the other representations, and the validators check that they agree. I can spend my time on the argument because I’ve already done the work to give it a durable source, a readable page, and a verifiable trail.

You can check it out for yourself. Start at the bottom of this article and open the Markdown and provenance links. Then look through [The Vault repository](https://github.com/jamesburchill/vault). The articles, front matter, templates, build scripts, and validators are all there. If you want to use the same structure for your own site, you can see exactly how I put it together.
