---
title: "Verified Provenance for The Vault"
date: 2026-05-12
slug: verified-provenance-for-the-vault
summary: "How The Vault now publishes cryptographically verifiable provenance records for each article, and why that matters in an age of synthetic content."
topics:
  - provenance
  - publishing
  - markdown
  - trust
  - ai-search
status: published
original_url: ""
featured_image: "/assets/2026/05/verified-provenance-for-the-vault.png"
canonical_url: ""
---

# Verified Provenance for The Vault

![A verified provenance trust layer connecting Markdown source, signed metadata, and a public article](/assets/2026/05/verified-provenance-for-the-vault.png)

The internet is getting very good at producing convincing surface area.

Articles can be copied, rewritten, summarised, republished, scraped, remixed, translated, and regenerated faster than most readers can trace where anything came from. Some of that is useful. Some of it is noise. Some of it is deliberate deception. The problem is that all three can look almost identical by the time they land in a browser, a search result, a social feed, or an AI answer.

That is why I have added verified provenance to The Vault.

Not as a decorative badge. Not as a promise that every idea is perfect. Not as a claim that the web can be made magically trustworthy again.

As a machine-readable trail that says: this is the page, this is the source, this is the rendered output, this is the hash, this is when the build created the record, and this is the public key that can verify the signature.

## Why provenance matters now

For a long time, publishing trust was mostly social.

You trusted the publication, the author, the domain name, the brand, or the platform. That still matters, but it is no longer enough. Synthetic content has made it cheap to imitate tone, layout, volume, and confidence. A page can look authoritative without having a meaningful source trail behind it.

That changes the job of a public website.

It is not enough for a page to be readable by humans. It should also be inspectable by machines. Search systems, AI crawlers, archival tools, research assistants, and future verification services need more than rendered HTML. They need stable metadata that can be checked independently.

The Vault already treats Markdown in Git as the canonical source. Verified provenance extends that idea into the published site.

The Markdown is still the source of record. The public HTML is still the reader-facing version. The provenance record connects the two.

## What The Vault now publishes

Every published article now gets a companion provenance document beside the rendered page.

For example, an article at:

```text
/content/2026/05/example-article/
```

has a provenance document at:

```text
/content/2026/05/example-article/provenance.jsonld
```

The site also publishes a provenance index at:

```text
/.well-known/provenance.json
```

That index lists the published articles, their provenance document URLs, their content hashes, their modified timestamps, and their source paths.

The footer links to the site-level provenance index. Each article also has a visible **Verified Provenance** link near the source Markdown link. A reader can click it and see the raw JSON-LD record for that article.

This is intentionally plain. The record is not hidden behind an API, an account, or a proprietary verification service. It is just a public file.

## What is inside a provenance record

Each article provenance file includes the important checks:

- the article URL;
- the title;
- a SHA-256 hash of the rendered HTML;
- the source Markdown path;
- the GitHub source URL;
- the raw Markdown URL;
- created and modified timestamps;
- build metadata;
- publisher details;
- signing metadata;
- a cryptographic signature when the publishing build has access to the signing secret.

The hash is taken from the rendered HTML, not the Markdown.

That distinction matters. The Markdown is the canonical source, but the HTML is what the public site actually serves. If the template changes, the page changes. If the layout injects a new link, the page changes. If the rendered article is altered after the build, the hash no longer matches.

The provenance record is about the published artefact, not just the source file.

## How signing works

The Vault uses Ed25519 signing for provenance records.

During a normal local build, provenance can still be generated without a private key. That keeps the writing workflow simple. During the GitHub Pages build, the private signing secret is available through GitHub Actions. The build signs the site provenance index and each article provenance file.

Only the private signing material is secret.

The public verification key is published at:

```text
/.well-known/provenance-key.jwk
```

That means an external verifier can fetch the article provenance file, fetch the public key, remove the signature field from the record, canonicalise the remaining JSON, and verify that the signature matches.

The important part is canonicalisation. JSON can be formatted many different ways without changing its meaning. A signature over pretty-printed JSON would be fragile. The Vault signs a canonical JSON payload so that whitespace and key-order differences do not change the bytes being verified.

The validation step checks all of this before the site is deployed.

## What this does not prove

Provenance is not a truth machine.

It does not prove that an argument is correct. It does not prove that a conclusion is wise. It does not prove that a source was never wrong.

It proves something narrower and more useful: this published page has a traceable record, the content hash matches the rendered page, and the provenance document was signed by the Vault's publishing key.

That is the layer the web needs more of.

Not claims of certainty. Verifiable structure.

## Why it belongs in The Vault

The Vault is built around a simple idea: the durable version of an article should be inspectable.

That is why the site moved away from database-backed publishing and toward Markdown in Git. The article should not be trapped inside a CMS runtime. It should be readable, diffable, archivable, and portable.

Verified provenance is the next logical step.

The Markdown says what was written.

Git says how the source changed.

The rendered page shows what readers receive.

The provenance record ties those pieces together in a form that machines can verify.

As more of the web becomes synthetic, that kind of boring, inspectable structure becomes more important. It gives readers, crawlers, archives, and AI systems a stronger signal than vibes. It makes the source trail part of the public surface of the site.

That is the point.

If the web is going to be full of generated confidence, then serious publishing needs generated evidence.
