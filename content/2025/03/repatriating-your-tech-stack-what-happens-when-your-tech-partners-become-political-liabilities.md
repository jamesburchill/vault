---
title: "Build a Tech Stack That Can Survive Vendor and Jurisdiction Risk"
date: 2025-03-25
slug: repatriating-your-tech-stack-what-happens-when-your-tech-partners-become-political-liabilities
summary: "A practical framework for data residency, vendor concentration, sanctions, contractual access, portability, and tested exit plans without treating nationality as a proxy for trust."
topics:
  - strategy
  - programming
  - tech-stack
  - resilience
status: published
original_url: "https://vault.jamesburchill.com/strategy/repatriating-your-tech-stack-what-happens-when-your-tech-partners-become-political-liabilities/"
wordpress_id: 530
featured_image: "/assets/2025/03/repatriating-your-tech-stack-what-happens-when-your-tech-partners-become-political-liabilities-7a2fa96a-d89a-4628-8997-604fac9a616d.png"
---

# Build a Tech Stack That Can Survive Vendor and Jurisdiction Risk

![A resilient technology stack across vendors and jurisdictions](/assets/2025/03/repatriating-your-tech-stack-what-happens-when-your-tech-partners-become-political-liabilities-7a2fa96a-d89a-4628-8997-604fac9a616d.png)

> **Context note — July 15, 2026:** This article evaluates technology risk through specific services, contracts, jurisdictions, and operating models—not nationality alone. The practical question is whether a dependency creates risks you can understand and exit.

Geopolitics can change whether a vendor is available, lawful, supportable, or commercially sensible. So can an acquisition, price increase, outage, licence change, insolvency, or product shutdown.

The response is not to make every tool domestic. It is to design for **portability and jurisdictional resilience**.

## Map the dependencies that can stop the work

For each critical service, record:

- what data it stores or can access;
- the legal entities and jurisdictions involved;
- where primary data, replicas, logs, and backups reside;
- who can compel or authorize access;
- the contract, licence, sanctions, and export-control constraints;
- upstream services it depends on;
- how identities and encryption keys are controlled; and
- how the data and function can be moved elsewhere.

The same discipline applies whether a provider is Canadian, American, European, Asian, open source, or internal.

## Test the exit, not the brochure

A vendor is not portable because it has an export button. A credible exit plan answers:

1. Can we export complete data in a documented format?
2. Can another system interpret it without losing relationships, permissions, or history?
3. How long would migration take under pressure?
4. Which credentials, DNS records, certificates, queues, and integrations must change?
5. Can we keep operating during the transition?
6. Have we restored a backup or run a migration rehearsal recently?

If those answers are unknown, the organization has a dependency, not a plan.

## Reduce concentration without multiplying chaos

Using five vendors instead of one does not automatically create resilience. It can create five control planes, five identity models, and five failure modes.

Diversify where the impact justifies it:

- keep recoverable copies of critical data outside the primary service;
- separate domain, DNS, source, and deployment control where practical;
- avoid proprietary formats for the system of record;
- use modular interfaces around replaceable services;
- maintain least-privilege access and key ownership; and
- define the trigger that would start a migration.

## People are not jurisdictions

An international developer or support team is not a political liability by location alone. Evaluate access, contractual accountability, security controls, continuity, communication, and the sensitivity of the work. The risk belongs to the operating arrangement, not to a person's passport or language.

## The durable rule

Own the source of truth. Know who can reach it. Keep an independent recovery path. Test the ability to leave before events force the decision.

That is not isolation. It is the freedom to keep operating when a vendor, government, market, or relationship changes.
