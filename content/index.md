---
title: Content
description: Dated writing, notes, references, and source material.
permalink: /content/
---

# Content

Explore essays and field notes by interest or publication date.

## Browse by Interest

- [Building with AI](/reading-paths/#building-with-ai)
- [Architecture and Operations](/reading-paths/#architecture-and-operations)
- [Business and Product](/reading-paths/#business-and-product)
- [Writing and Judgment](/reading-paths/#writing-and-judgment)

Each path offers a few starting points. For a specific subject, [search the Vault](/search/).

## Recent Writing

{% for item in collections.vaultContent.slice(0, 3) %}
- [{{ item.data.title or item.fileSlug }}]({{ item.url }}){% if item.data.date %} — {{ item.data.date | readableDate }}{% endif %}{% if item.data | summary %}  
  {{ item.data | summary }}{% endif %}
{% else %}
No content has been published yet.
{% endfor %}

## Archive

<div class="archive-browser" data-archive-browser><div class="archive-years" aria-label="Years">{% for year in collections.vaultYears %}<button class="archive-year {% if loop.first %}is-current{% endif %}" type="button" data-archive-year="{{ year.year }}"><span>{{ year.title }}</span><small>{{ year.items.length }} item{% if year.items.length != 1 %}s{% endif %}</small></button>{% endfor %}</div><div class="archive-months" aria-label="Months by year">{% for year in collections.vaultYears %}<section class="archive-month-group {% if loop.first %}is-current{% endif %}" data-archive-panel="{{ year.year }}"{% if not loop.first %} hidden{% endif %}><h3><a href="{{ year.url }}">{{ year.title }}</a></h3><ol>{% for month in year.months %}<li><a href="{{ month.url }}">{{ month.title }}</a><span>{{ month.items.length }} item{% if month.items.length != 1 %}s{% endif %}</span></li>{% endfor %}</ol></section>{% endfor %}</div></div>

{% if not collections.vaultYears.length %}
No archives are available yet.
{% endif %}
