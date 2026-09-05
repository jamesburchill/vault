---
title: The Vault - James Burchill
description: Field notes on software, AI, business, and the decisions that keep systems useful as they change.
permalink: /
---

<div class="home-masthead">
  <img src="/assets/theVault.png" alt="The Vault" width="400" height="150">
</div>

# Field Notes on Software, AI, and Business

Field notes on software, AI, business, and the decisions that keep systems useful as they change.

I’m James Burchill. My work spans engineering, publishing, teaching, entrepreneurship, and technical leadership. This is where I explore what I learn from building systems, working through difficult decisions, and watching how things change in practice.

[Because Drift Happens™](https://becausedrifthappens.com/) is a recurring theme: how small changes accumulate, and what helps us notice and respond.

<p class="button-row">
  <a class="md-button md-button--primary" href="/reading-paths/">Find a reading path</a>
  <a class="md-button" href="/content/">Browse the archive</a>
  <a class="md-button" href="/about/">About the Vault</a>
</p>

## Start with Your Interest

- [Building with AI](/reading-paths/#building-with-ai) — From a working prototype to systems with clear boundaries and human control.
- [Architecture and Operations](/reading-paths/#architecture-and-operations) — Decisions that make software easier to maintain, recover, and trust.
- [Business and Product](/reading-paths/#business-and-product) — Useful products, sustainable operations, and choices that respect customers.
- [Writing and Judgment](/reading-paths/#writing-and-judgment) — Making ideas clearer, inspecting evidence, and recognizing patterns.

For the deeper systems theme, explore [Governing Intelligent Systems](/governing-intelligent-systems/).

## Selected Starting Points

- [By Inches](/content/2026/05/by-inches/) — A personal introduction to the way small exceptions change a system’s direction.
- [AI Can Generate Software. Reality Still Gets A Vote.](/content/2026/05/ai-can-generate-software-reality-still-gets-a-vote/) — Why easier building makes practical review more valuable.
- [Why We Don’t Build Custom Operating Systems](/content/2026/07/why-we-dont-build-custom-operating-systems/) — An engineering choice explained through its consequences for customers.

## Recent Writing

This is an evolving collection of essays and field notes, published when there is something useful to add. Dates below are original publication dates; substantive revisions are noted in the articles.

{% for item in collections.vaultContent.slice(0, 3) %}
- [{{ item.data.title or item.fileSlug }}]({{ item.url }}){% if item.data.date %} &mdash; {{ item.data.date | readableDate }}{% endif %}{% if item.data | summary %}  
  {{ item.data | summary }}{% endif %}
{% else %}
No content has been published yet.
{% endfor %}

[Browse the full archive](/content/).
