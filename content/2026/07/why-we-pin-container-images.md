---
title: "Why We Pin Container Images"
date: 2026-07-15
slug: why-we-pin-container-images
summary: "Pinned release artefacts make deployments reproducible, reviewable, and easier to recover when something goes wrong."
topics:
  - architecture
  - tooljar
  - inside-the-architecture
  - software-supply-chain
  - because-drift-happens
status: published
original_url: ""
featured_image: "/assets/2026/07/inside-the-architecture.png"
canonical_url: ""
---

# Why We Pin Container Images

![A modular architectural system with replaceable upper components above a durable foundation](/assets/2026/07/inside-the-architecture.png)

*Inside the Architecture, part 5 of 7, is a short series about the engineering choices that make software easier to trust. These are not technical deep dives. They are explanations of what we optimize for and why it matters.*

Software labels can be surprisingly slippery.

A name such as “latest” looks convenient, but it does not identify one permanent thing. What it points to today may not be what it points to tomorrow. Two servers can appear to request the same software and quietly receive different results.

That is not a property we want in a production release.

When we pin a container image, we identify the specific artefact we intend to run. The release becomes a known object rather than a moving instruction.

## Repeatability Before Convenience

Deployments should answer a simple question: what exactly changed?

That is difficult to answer when dependencies can move underneath us. A restart performed on Tuesday should not introduce software that was different from the software started on Monday merely because a label was reused upstream.

Pinning gives us a clearer chain of custody. The artefact that was reviewed is the artefact that can move through our release process. If we need to compare environments or investigate a problem, we have a stable point of reference.

It also makes recovery more honest. “Put the old version back” is only a useful instruction when the old version can be identified precisely.

## Updates Still Happen

Pinning is sometimes mistaken for refusing to update.

It means the opposite.

Updates should be intentional. A new version should enter the system as a visible change that can be reviewed, tested, and promoted. The release should change because we chose to change it, not because a remote label silently moved.

This matters for security patches as much as feature work. Urgent does not have to mean ambiguous. A fast update can still produce a specific, traceable artefact.

## The Trust Benefit

Customers never need to see an image identifier.

What they benefit from is the discipline behind it: fewer unexplained differences, more reproducible deployments, clearer investigations, and a practical path back when a release behaves unexpectedly.

Pinning is a small technical choice with a large operational meaning.

It says that production should run what we intended to release—not whatever happened to be available at the time.

---

**Previous:** [← Why Predictable Recovery Matters More Than Perfect Uptime](/content/2026/07/why-predictable-recovery-matters-more-than-perfect-uptime/)

**Next:** [Why We Favour Standards Over Proprietary Features →](/content/2026/07/why-we-favour-standards-over-proprietary-features/)
