---
pagination:
  data: collections.vaultYears
  size: 1
  alias: year
permalink: "/content/{{ year.year }}/"
eleventyComputed:
  title: "{{ year.title }}"
  description: "Public vault content published in {{ year.title }}."
---

# {{ year.title }}

{% for month in year.months %}
## [{{ month.title }}]({{ month.url }})

{% for item in month.items %}
- [{{ item.data.title or item.fileSlug }}]({{ item.url }}){% if item.data.date %} — {{ item.data.date | readableDate }}{% endif %}{% if item.data | summary %}  
  {{ item.data | summary }}{% endif %}
{% endfor %}

{% endfor %}
