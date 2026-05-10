---
title: "Why I Moved This Site From WordPress to Markdown"
date: 2026-05-10
slug: why-i-moved-this-site-from-wordpress-to-markdown
summary: "Why this site now treats Markdown in Git as the canonical source for readers, search engines, and AI systems."
topics:
  - publishing
  - markdown
  - ai-search
  - github
status: published
original_url: ""
featured_image: "/assets/2026/05/why-i-moved-this-site-from-wordpress-to-markdown.png"
canonical_url: ""
---

# Why I Moved This Site From WordPress to Markdown

![A traditional CMS stack flattening into Markdown files and a static site](/assets/2026/05/why-i-moved-this-site-from-wordpress-to-markdown.png)

For a long time, this site ran the normal way: WordPress, a database, themes, plugins, admin screens, rendered pages, feeds, redirects, and all the familiar machinery that comes with a full CMS.

That model works. WordPress became dominant for good reasons. It made publishing accessible, gave non-technical people a capable editing surface, and created a huge ecosystem around websites that needed to change frequently.

But it also means the durable version of a page is not really the page. It is a set of database rows, theme decisions, plugin behaviours, shortcodes, redirects, generated HTML, and runtime assumptions. The public article is the output of a system.

I wanted the opposite.

I wanted the article itself to be the source.

So I moved this site to Markdown in Git, with GitHub generating the public version. The Markdown file is now the canonical artefact. The website is a rendering of that file, not the place where the original meaning lives.

## Why Markdown

Markdown is boring in the best possible way.

It is plain text. It diffs cleanly. It can be read without a database, an admin interface, a plugin stack, or a working build process. If the styling disappears, the content still makes sense. If the publishing system changes later, the source can move without being extracted from someone else's model.

That matters because I am no longer thinking of a website only as something people browse in a visual interface. I am thinking of it as structured public source material.

People still need a readable site. Search engines still need stable URLs. Feeds still matter. But AI systems, answer engines, crawlers, summarizers, retrieval tools, and future search interfaces are increasingly trying to understand the underlying content directly.

In that world, clean canonical text is an advantage.

## The Bet

My bet is simple: AI and search systems will rely more heavily on canonical, structured text than on heavily mediated web pages.

That does not mean design stops mattering. It means the design should serve the content, not obscure it. A page can still be pleasant to read, but the underlying article should be easy to parse, cite, summarize, archive, migrate, and reason over.

A Markdown file with clear front matter gives the system a few important signals:

- the title is explicit;
- the date is explicit;
- the slug is stable;
- the summary is intentional;
- the topics are declared;
- the canonical source is visible;
- the body is plain structured text.

That is a different posture from publishing into a CMS and hoping every downstream system correctly infers the important parts from rendered HTML.

## What I Lose

This approach is not free.

I lose the convenience of logging into a polished admin panel from anywhere. I lose the large plugin marketplace. I lose some of the easy knobs that WordPress provides for editing, previewing, forms, media handling, and site management.

For some sites, those losses would be unacceptable. If the site depends on complex editorial workflows, memberships, commerce, comments, dynamic personalization, or non-technical publishing at scale, WordPress may still be the better tool.

That is not what this vault needs to be.

This site is closer to a public notebook, archive, and reference surface. For that shape of work, the CMS layer felt increasingly indirect. I was maintaining machinery around the writing instead of making the writing itself more durable.

## What I Gain

The gains are the reason I made the switch.

I get version history for every article. I get cleaner backups. I get reviewable changes. I get a content model that is easy to inspect locally. I get URLs and metadata generated from files I can actually see.

Most importantly, I get a source format that does not depend on the current website implementation. Markdown in Git is not fashionable, but it is resilient. It gives both humans and machines a direct path to the content.

That is the point.

The site you see in the browser is one output. The Markdown file is the durable record. If search changes, if AI retrieval becomes more important, if the presentation layer changes, or if GitHub Pages is replaced by something else later, the archive is still plain text with structure around it.

I am betting that will age better than a page whose meaning has to be reconstructed from a CMS stack.

## The Principle

This is not really a WordPress versus Markdown argument. It is a canonical-source argument.

For this site, I want the canonical source to be simple, inspectable, portable, and friendly to both people and machines. I want the public web page, feeds, discovery files, and future AI/search surfaces to all point back to the same structured content.

The less interpretation required, the better.

So the move is deliberately modest: fewer layers, flatter files, clearer metadata, and a publishing path that treats the text as the thing that matters most.
