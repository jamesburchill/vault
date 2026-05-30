---
title: The Vault - James Burchill
description: Field notes on governing intelligent systems, operational coherence, AI drift, provenance, and control surfaces.
permalink: /
---

<div class="home-masthead">
  <img src="/assets/theVault.png" alt="The Vault" width="400" height="150">
</div>

# Field Notes on Governing Intelligent Systems

Because drift happens, intelligent systems need operational coherence, explicit control surfaces, provenance, and practical governance.

This is the public field-notes layer behind my work on systems that must stay coherent under change.

<p class="button-row">
  <a class="md-button md-button--primary" href="/governing-intelligent-systems/">Start here</a>
  <a class="md-button" href="https://becausedrifthappens.com/">Because Drift Happens™</a>
  <a class="md-button" href="/content/">Browse all content</a>
</p>

## Start Here

- [Governing Intelligent Systems](/governing-intelligent-systems/)  
  The category I am building around: how intelligent systems stay coherent, accountable, and governable under change.

- [Because Drift Happens™](https://becausedrifthappens.com/)  
  The core thesis: drift is the default condition of all systems.

- [Runtime Isolation Is Not Governance](/content/2026/05/runtime-isolation-is-not-governance/)  
  AI agent runtimes solve the execution problem, but serious autonomous systems also need governance, authorisation, escalation, and provenance.

- [AI Can Generate Software. Reality Still Gets A Vote.](/content/2026/05/ai-can-generate-software-reality-still-gets-a-vote/)  
  AI-assisted software has lowered the barrier to building, but real systems still need structured review, operational judgement, and respect for consequence.

- [By Inches](/content/2026/05/by-inches/)  
  A practical reflection on how systems drift through small, repeated deviations.

## Latest

{% for item in collections.vaultContent.slice(0, 3) %}
- [{{ item.data.title or item.fileSlug }}]({{ item.url }}){% if item.data.date %} &mdash; {{ item.data.date | readableDate }}{% endif %}{% if item.data | summary %}  
  {{ item.data | summary }}{% endif %}
{% else %}
No content has been published yet.
{% endfor %}

[Browse the full archive](/content/).
