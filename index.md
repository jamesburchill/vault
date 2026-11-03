---
title: The Vault -- Essays and Field Notes by James Burchill
description: Essays, field notes and practical guides by James Burchill, founder of Driftinel, systems architect, CTO and bestselling author.
permalink: /
---

<div class="home-masthead">
  <img src="/assets/theVault.png" alt="The Vault" width="400" height="150">
</div>

# Business, Technology and Better Judgement

Essays, field notes and practical guides on how businesses and technology work, where assumptions break down, and how to make better decisions.

I’m James Burchill, founder of [Driftinel](https://driftinel.com/), systems architect, CTO and bestselling author. I write from experience building companies, leading engineering teams, developing software and turning complex problems into working solutions.

<p class="button-row">
  <a class="md-button md-button--primary" href="/reading-paths/">Find a reading path</a>
  <a class="md-button" href="/content/">Browse the writing</a>
  <a class="md-button" href="/about/">About the Vault</a>
</p>

## Start with Your Interest

- [Building with AI](/reading-paths/#building-with-ai) -- From a working prototype to systems with clear boundaries and human control.
- [Architecture and Operations](/reading-paths/#architecture-and-operations) -- Decisions that make software easier to maintain, recover, and trust.
- [Business and Product](/reading-paths/#business-and-product) -- Useful products, sustainable operations, and choices that respect customers.
- [Writing and Judgement](/reading-paths/#writing-and-judgment) -- Making ideas clearer, inspecting evidence, and recognizing patterns.

For the deeper systems theme, explore [Governing Intelligent Systems](/governing-intelligent-systems/).

## Selected Starting Points

- [By Inches](/content/2026/05/by-inches/) -- A personal introduction to the way small exceptions change a system’s direction.
- [AI Can Generate Software. Reality Still Gets A Vote.](/content/2026/05/ai-can-generate-software-reality-still-gets-a-vote/) -- Why easier building makes practical review more valuable.
- [Why We Don’t Build Custom Operating Systems](/content/2026/07/why-we-dont-build-custom-operating-systems/) -- An engineering choice explained through its consequences for customers.

## Recent Writing

This is an evolving collection of essays and field notes, published when there is something useful to add. Dates below are original publication dates; substantive revisions are noted in the articles.

{% for item in collections.vaultContent.slice(0, 3) %}
- [{{ item.data.title or item.fileSlug }}]({{ item.url }}){% if item.data.date %} -- {{ item.data.date | readableDate }}{% endif %}{% if item.data | summary %}<br>
  {{ item.data | summary }}{% endif %}
{% else %}
No content has been published yet.
{% endfor %}

[Browse all writing](/content/), or explore [Books & Resources](/books-resources/) for a free illustrated book, learning materials and practical tools.

## The Deeper Framework

The Vault is the broader collection of my writing. [Because Drift Happens](https://becausedrifthappens.com/) explores drift and governance; [Governing Intelligent Systems](/governing-intelligent-systems/) is its technical reading guide within the Vault. [Driftinel](https://driftinel.com/) is my independent software project, a managed service in development to help businesses spot missed commitments and emerging problems.

{% include "follow.njk" %}
