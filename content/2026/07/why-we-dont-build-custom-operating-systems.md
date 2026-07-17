---
title: "Why We Don’t Build Custom Operating Systems"
date: 2026-07-17
slug: why-we-dont-build-custom-operating-systems
summary: "Custom operating systems create obligations most software customers should never have to inherit."
topics:
  - architecture
  - tooljar
  - inside-the-architecture
  - operational-resilience
status: published
original_url: ""
featured_image: "/assets/2026/07/inside-the-architecture.png"
canonical_url: ""
---

# Why We Don’t Build Custom Operating Systems

![A modular architectural system with replaceable upper components above a durable foundation](/assets/2026/07/inside-the-architecture.png)

*Inside the Architecture, part 7 of 7, is a short series about the engineering choices that make software easier to trust. These are not technical deep dives. They are explanations of what we optimize for and why it matters.*

There is a certain romance to building everything yourself.

A custom operating system sounds like maximum control. Every component can be tuned. Every decision can be made internally. Nothing has to be accepted simply because someone else chose it.

But control and responsibility arrive together.

The moment we build a custom operating system, we also inherit the job of maintaining it. Security patches, hardware compatibility, performance problems, monitoring, recovery tools, and years of edge cases all become our problem. That is a large and permanent obligation for something the customer never asked us to invent.

Tooljar is business software. Its value is in helping people organize work, preserve knowledge, and keep operations moving. A custom operating system would not make those outcomes meaningfully better. It would create another critical layer that only we could understand and repair.

That is the wrong kind of uniqueness.

## Own What Makes the Product Better

Good architecture is partly about deciding where *not* to be clever.

We prefer widely supported operating environments with familiar tools, known recovery paths, and skills that are available beyond our own team. That gives us a stable foundation while keeping our engineering attention on the parts of Tooljar that actually matter to customers.

This does not mean accepting every default without question. Standard systems still need to be configured carefully, maintained consistently, and treated as replaceable infrastructure. The difference is that we begin with a foundation that has already been tested by a much larger community.

## The Trust Benefit

Customers should not need to depend on our ability to maintain an unnecessary invention forever.

They should be able to trust that the system rests on understandable foundations, that another qualified operator could work with it, and that recovery does not require knowledge held by one person.

The best engineering decision is not always the most technically ambitious one.

Sometimes it is choosing not to create a problem that never needed to exist.

---

**Previous:** [← Why We Favour Standards Over Proprietary Features](/content/2026/07/why-we-favour-standards-over-proprietary-features/)

**Start the series:** [Why Deployment Should Be Boring](/content/2026/07/why-deployment-should-be-boring/)
