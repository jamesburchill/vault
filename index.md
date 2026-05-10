---
title: The Vault - James Burchill
description: Writing, notes, references, and source material from James Burchill.
permalink: /
---

<h1 class="visually-hidden">The Vault - James Burchill</h1>

<div class="home-masthead">
  <img src="/assets/theVault.png" alt="The Vault" width="400" height="150">
</div>

<p class="button-row">
  <a class="md-button md-button--primary" href="/content/">Browse content</a>
  <a class="md-button" href="/now/">Now</a>
  <a class="md-button" href="/about/">About</a>
</p>

## Latest

{% for item in collections.vaultContent.slice(0, 3) %}
- [{{ item.data.title or item.fileSlug }}]({{ item.url }}){% if item.data.date %} &mdash; {{ item.data.date | readableDate }}{% endif %}{% if item.data | summary %}  
  {{ item.data | summary }}{% endif %}
{% else %}
No content has been published yet.
{% endfor %}

[Browse the full archive](/content/).
