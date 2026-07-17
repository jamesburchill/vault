---
title: "Why We Favour Standards Over Proprietary Features"
date: 2026-07-16
slug: why-we-favour-standards-over-proprietary-features
summary: "Standards preserve choices, reduce lock-in, and make long-lived software easier to move and maintain."
topics:
  - architecture
  - tooljar
  - inside-the-architecture
  - digital-sovereignty
status: published
original_url: ""
featured_image: "/assets/2026/07/inside-the-architecture.png"
canonical_url: ""
---

# Why We Favour Standards Over Proprietary Features

![A modular architectural system with replaceable upper components above a durable foundation](/assets/2026/07/inside-the-architecture.png)

*Inside the Architecture, part 6 of 7, is a short series about the engineering choices that make software easier to trust. These are not technical deep dives. They are explanations of what we optimize for and why it matters.*

Proprietary features are often attractive for good reasons.

They can be polished, convenient, and deeply integrated. They can solve a difficult problem quickly. Sometimes they are genuinely the best tool available.

The architectural risk appears when a convenience becomes a dependency that cannot be understood, replaced, or moved.

That is why we favour standards.

## Keep the Important Things Portable

Standards give different systems a shared language.

They make it more likely that data can be exported, tools can be replaced, and another qualified operator can understand how the pieces fit together. They create options beyond the original vendor, product, or team.

Those options matter most when circumstances change.

A supplier may alter its pricing. A service may be discontinued. A customer may need a different hosting arrangement. A better component may become available. Regulations or business requirements may shift.

If the system depends on a proprietary feature at every boundary, each change becomes a negotiation with the past.

## This Is Not an Anti-Vendor Rule

We use products and services built by other organizations. Avoiding all proprietary technology would be unrealistic and, in many cases, counterproductive.

The question is where the dependency sits.

A proprietary tool can be useful without becoming the only place where critical knowledge exists. A managed service can save time without owning the only usable copy of the customer’s record. A specialized feature can add value without redefining the whole system around itself.

We favour standard formats, familiar interfaces, and replaceable boundaries around the things that need to last.

## The Trust Benefit

Customers should not be trapped by architectural decisions they never made.

Standards cannot guarantee effortless migration, and they do not make every component interchangeable. They do, however, preserve choices. They reduce the number of doors that can only be opened by one vendor with one key.

That is the deeper reason we favour them.

Standards are not exciting because they are novel. They are valuable because they let a system survive novelty elsewhere.

---

**Previous:** [← Why We Pin Container Images](/content/2026/07/why-we-pin-container-images/)

**Next:** [Why We Don’t Build Custom Operating Systems →](/content/2026/07/why-we-dont-build-custom-operating-systems/)
