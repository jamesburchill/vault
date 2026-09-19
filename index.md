---
title: The Vault - James Burchill
description: Business, technology, and practical ideas from James Burchill, Business Systems Architect, CTO, and bestselling author.
permalink: /
---

<div class="home-masthead">
  <img src="/assets/theVault.png" alt="The Vault" width="400" height="150">
</div>

# Business, Technology & Practical Ideas

The Vault is my online content library: practical knowledge, essays, field notes, and resources across business and technology.

I’m James Burchill—a Business Systems Architect, CTO, and bestselling author. My work crosses engineering, business, marketing, communications, and teaching. Here I share ideas drawn from client work, independent product development, and a career spent turning complex problems into working solutions.

[Because Drift Happens™](https://becausedrifthappens.com/) is a recurring theme: how businesses and their systems move away from their original intent, and how we recognize and respond. It informs my broader systems work and [Driftinel](https://jamesburchill.com/driftinel/), the drift detection system I’m developing.

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
