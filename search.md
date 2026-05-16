---
title: Search
description: Search the public vault by article title, summary, topics, slug, and publication date.
permalink: /search/
---

# Search

Search the public vault using the generated index. Results are built from article metadata and link back to the canonical published pages.

<div class="search-panel" data-vault-search>
  <form class="search-form" role="search" data-search-form>
    <label for="vault-search-query">Search terms</label>
    <div class="search-control">
      <input id="vault-search-query" type="search" name="q" autocomplete="off" placeholder="Try provenance, markdown, agents..." data-search-input>
      <button type="submit">Search</button>
    </div>
  </form>
  <p class="search-status" data-search-status>Loading search index...</p>
  <ol class="search-results" data-search-results></ol>
</div>

<script src="/assets/search.js" defer></script>
