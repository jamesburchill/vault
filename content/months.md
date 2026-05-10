---
pagination:
  data: collections.vaultMonths
  size: 1
  alias: month
permalink: "/content/{{ month.year }}/{{ month.month }}/"
eleventyComputed:
  title: "{{ month.title }}"
  description: "Public vault content published in {{ month.title }}."
---

# {{ month.title }}

{% for item in month.items %}
- [{{ item.data.title or item.fileSlug }}]({{ item.url }}){% if item.data.date %} — {{ item.data.date | readableDate }}{% endif %}{% if item.data | summary %}  
  {{ item.data | summary }}{% endif %}
{% endfor %}
