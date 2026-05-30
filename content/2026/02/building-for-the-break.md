---
title: "Building for the Break: Why many of today’s public MCP servers are an accident waiting to happen"
date: 2026-02-07
slug: building-for-the-break
summary: "Why public MCP servers and agent-facing tools need governance before the first preventable failure."
topics:
  - strategy
  - governing-intelligent-systems
  - autonomous-agents
  - ai-governance
  - mcp
status: published
original_url: "https://vault.jamesburchill.com/strategy/building-for-the-break/"
wordpress_id: 1002
featured_image: "/assets/2026/02/building-for-the-break-building-for-the-break.png"

---

# Building for the Break: Why many of today’s public MCP servers are an accident waiting to happen

![Building for the Break: Why many of today’s public MCP servers are an accident waiting to happen](/assets/2026/02/building-for-the-break-building-for-the-break.png)


Every technology wave produces its share of impressive demos.

We are now seeing that pattern repeat with Model Context Protocol (MCP) servers.

Public MCP endpoints are appearing everywhere. Companies are rushing to expose tools, wire up APIs, and signal that they are ready for an agent-driven future.

On the surface, this looks like progress.

Underneath, it often looks like something else entirely.

Not incompetence.

Not recklessness.

Something far more predictable.

We are watching capability scale faster than control.

History suggests that is rarely a stable configuration.

* * *

## **The Demo Phase Always Comes First**

When a new infrastructure primitive emerges, the first wave optimises for visibility.

“Look what it can do.”

Not:

“Look how safely it operates.”

We saw this with early cloud deployments.

With unsecured storage buckets.

With open Kubernetes dashboards.

With internet-exposed databases.

The pattern is so consistent it is practically mechanical:

**new capability -> rapid exposure -> first serious incident -> governance layer**

MCP is unlikely to be the exception.

This is not criticism. It is lifecycle.

Exploration must happen before discipline can form.

But exploration should not be mistaken for operational readiness.

* * *

## **The Dangerous Misunderstanding**

Many organisations appear to believe that exposing tools to an agent is primarily an integration exercise.

It is not.

It is an authority decision.

The moment a model can call a tool that mutates durable state, you have answered a very serious architectural question:

**Who is allowed to cause reality to change?**

If the answer is unclear, the system is already drifting.

Notice what makes this subtle.

Most public MCP servers are technically well-built.

The risk is rarely code quality.

The risk is misplaced authority.

* * *

## **Capability Is Not the Same as Control**

Engineers are naturally drawn toward what connects. Integration is visible, demoable, and socially legible.

Control systems are none of those things.

They are quiet.

Mostly invisible.

Often uncelebrated.

Until the day they are desperately needed.

A public MCP that exposes broad actuator surfaces without strong constraints is not a sign of modern architecture.

It is a sign that the system is still in its discovery phase.

There is nothing inherently wrong with that — provided we recognise it for what it is.

Problems begin when demo surfaces are mistaken for production posture.

* * *

## **The Real Risk Is Not Nondeterminism**

It is tempting to blame probabilistic models.

That is only part of the story.

The deeper issue is consequence.

Systems fail when three conditions combine:

*   large action surface
*   weak policy boundary
*   durable state change

Notice that none of these require a model to be “wrong.”

Even perfectly reasonable decisions can produce unacceptable outcomes when constraints are loose.

This is not an AI problem.

It is a control-plane problem.

* * *

## **Public vs Private Is the Wrong First Question**

The more useful question is simpler:

**What is the blast radius of a single incorrect call?**

If the answer includes financial movement, customer impact, legal exposure, infrastructure mutation, or permission changes, then the tool is authority-bearing.

Authority-bearing operations rarely belong on unconstrained public surfaces.

Over time, the industry will likely separate MCP deployments into two broad categories:

**Capability MCP** — expands what models can understand.

**Authority MCP** — allows models to change durable reality.

The former can often be public.

The latter almost always demands governance.

The vocabulary has not stabilised yet, but the architectural divide is already emerging. \[Inference\]

* * *

## **The Trap of Technological Signalling**

There is understandable market pressure to appear current.

A public MCP server is easy to point at.

It signals momentum.

It reassures investors.

It attracts developers.

But connectivity alone is not maturity.

In fact, seasoned operators tend to study the opposite question:

**What constrains this system?**

Constraint is what keeps complex environments standing at 2:13am.

Not capability.

Never capability.

* * *

## **What Mature Architectures Eventually Discover**

Every serious system converges on some variation of the same execution chain:

**intent -> authorization -> policy -> execution -> verification**

When this order reverses — when execution outruns authorization — instability follows.

Not always immediately.

But reliably enough that history keeps repeating the lesson.

The interesting shift now underway is that many organisations are granting agents actuator access before installing durable authority layers above them.

That is backwards.

Actuators should inherit permission.

They should not originate it.

* * *

## **Building For the Break**

Resilient systems are not designed around ideal behaviour.

They are designed around eventual failure.

The question architects quietly ask is not:

“What can this system do?”

It is:

“What happens when it does the wrong thing at scale?”

If the answer is unclear, more integration is not the next step.

More constraint is.

This does not mean public MCP is inherently unsafe.

Far from it.

Read-heavy tools, discovery surfaces, simulation environments, and advisory capabilities can often be exposed safely.

Mistakes in those domains are usually reversible.

Reversibility is one of the most underrated properties in system design.

Where organisations should slow down is anywhere a model can directly mutate durable state without an explicit authority boundary.

That is where accidents tend to incubate.

* * *

## **The Quiet Layer That Is Coming**

Technology cycles are remarkably consistent about one thing:

Governance arrives shortly after the first meaningful incidents.

When agents begin influencing revenue, infrastructure, compliance posture, or customer experience, leadership will ask predictable questions:

*   Who approved this action?
*   Why was it allowed?
*   Can we replay it?
*   Can we prove it was correct?

Systems that cannot answer these questions rarely survive unchanged.

A new architectural layer is already forming across forward-looking environments — a layer where organisational intent is authenticated, scoped, logged, evaluated against policy, and only then allowed to execute.

Call it a control plane.

Call it a command fabric.

Call it machine governance.

The name matters less than the function.

Authority must live somewhere durable.

* * *

## **A Final Calibration**

The presence of public MCP servers should not alarm us.

It should orient us.

It tells us where the industry is in the maturity curve:

Still exploring.

Still learning.

Still optimising for possibility.

The next phase will optimise for survivability.

It always does.

The organisations that endure are rarely the ones that connected everything first.

They are the ones that decided — deliberately — what should never have been connected without constraint.

Because in complex systems, the real work is not enabling action.

It is governing consequence.

StayFrosty!
