---
title: "The Hidden Tax of Agentic Systems: The Token Economics of MCP"
date: 2026-02-11
slug: agentic-token-economics
summary: "There is a quiet cost building inside many modern AI architectures. It does not show up in demo environments. It does not appear in proof-of-concepts. It rarely gets mentioned in architecture diagrams. But in production, it becomes unavoidable. I am talking about token overhead – specifically, the growing operational cost of providing Large Language Models"
topics:
  - strategy
status: published
original_url: "https://vault.jamesburchill.com/strategy/agentic-token-economics/"
wordpress_id: 1008
featured_image: "/assets/2026/02/agentic-token-economics-agentic-token-tax.png"

---

# The Hidden Tax of Agentic Systems: The Token Economics of MCP

![The Hidden Tax of Agentic Systems: The Token Economics of MCP](/assets/2026/02/agentic-token-economics-agentic-token-tax.png)


There is a quiet cost building inside many modern AI architectures.

It does not show up in demo environments.

It does not appear in proof-of-concepts.

It rarely gets mentioned in architecture diagrams.

But in production, it becomes unavoidable.

I am talking about **token overhead** – specifically, the growing operational cost of providing Large Language Models with the capability context required to safely interact with real systems.

And nowhere is this more visible than in Model Context Protocol (MCP) deployments.

Most teams are currently celebrating the power MCP unlocks. Fewer are asking the harder question:

**What is the steady-state cost of keeping that intelligence operational?**

Because once agents move from novelty to infrastructure, token economics stops being an implementation detail and becomes a governance concern.

* * *

## **MCP Changes the Cost Shape of Software**

Traditional software has predictable scaling curves:

*   compute
*   storage
*   bandwidth

Agentic systems introduce a fourth curve:

**context.**

Before an agent can act safely, it must understand the surface area it is allowed to touch. That means supplying the model with:

*   capability catalogues
*   parameter schemas
*   usage constraints
*   governance hints
*   sometimes even example calls

Many implementations simply serialize their entire tool catalogue into the prompt.

It works.

Until it doesn’t.

A moderately sized enterprise MCP surface can easily exceed several thousand tokens **before a single unit of reasoning occurs.**

You are paying for awareness.

Not action.

* * *

## **The New Fixed Cost in Every Request**

Architecturally, this is significant.

We are accustomed to thinking about inference cost as proportional to task complexity. But MCP introduces a **fixed token tax** that applies even to trivial queries.

A user asks:

> “Show me my open jobs.”

Behind the scenes, the model may receive definitions for:

*   jobs
*   users
*   notes
*   attachments
*   audit logs
*   permissions
*   reporting
*   scheduling

The majority of that context is irrelevant to the request.

Yet it still consumes budget.

Over thousands or millions of calls, this becomes real money.

More importantly, it becomes architectural friction.

Large contexts:

*   slow responses
*   increase latency
*   reduce reasoning headroom
*   raise failure probability
*   inflate operational cost

This is not a model problem.

It is a systems design problem.

* * *

## **Capability Inflation Is the New Surface Creep**

Software teams already understand scope creep.

Agent platforms introduce a cousin:

**capability inflation.**

Once a tool exists, it is tempting to expose it.

Once exposed, it is tempting to describe it richly.

Soon the model is carrying a technical manual just to answer basic questions.

This is the agentic equivalent of shipping a mobile app with the entire backend embedded inside it.

MCP does not cause this problem.

But it makes poor boundary discipline expensive very quickly.

Good architects will begin treating capability exposure the same way they treat public APIs:

**minimal, intentional, governed.**

* * *

## **Context Is Now Infrastructure**

Here is the mental shift many teams have not yet made:

> Context is no longer prompt decoration.

> Context is operational infrastructure.

Every token you send is:

*   latency
*   compute
*   carbon
*   cost

And unlike storage, you pay for it repeatedly.

Which means context must be engineered.

Not accumulated.

* * *

## **The Emerging Design Response: Progressive Disclosure**

The most resilient MCP architectures are already converging on a simple principle:

**Do not tell the model everything.**

**Tell it how to discover what it needs.**

Instead of shipping a full catalogue, expose a thin index:

*   capability name
*   one-line intent
*   tags

Then provide introspection tools such as:

*   search\_capabilities
*   describe\_capability

The model loads detail only when required.

This shifts the system from **context preload** to **context retrieval.**

The difference is profound.

You stop paying for knowledge the agent never uses.

* * *

## **Separate Selection From Execution**

Another stabilizing pattern is the explicit split between:

**Router pass**

Small context. Identify intent.

**Execution pass**

Load only the schema required for the chosen capability.

This mirrors a principle long understood in distributed systems:

> Do not move large payloads until you know you need them.

Reasoning space is preserved.

Token burn drops.

Determinism improves.

Most importantly, the architecture scales.

* * *

## **The Governance Angle Few Are Discussing**

Token discipline is not just about cost control.

It is about safety.

Overloaded contexts increase ambiguity.

Ambiguity increases probabilistic behaviour.

Probabilistic behaviour is precisely what governance layers are meant to constrain.

When everything is visible, the model has more ways to be creatively wrong.

Bounded capability surfaces are not merely efficient.

They are safer.

Architectural adulthood in agent systems will be defined less by autonomy and more by **intentional constraint.**

* * *

## **Expect a Shift From “Can We?” to “Should We Expose This?”**

Right now, the industry is still in its expansion phase.

Capabilities are being published enthusiastically.

Over time, mature teams will reverse the question.

Not:

> Can the agent access this?

But:

> Is the token cost and behavioural risk justified?

That is a very different design posture.

And it is coming sooner than many expect.

* * *

## **MCP Is Not Expensive. Undisciplined Surfaces Are.**

It is important to be precise here.

MCP itself is not the problem.

In fact, it is one of the cleanest governance patterns to emerge in the agent era.

The risk lies in treating the capability catalogue like a documentation dump rather than a controlled boundary.

Architectures that practice:

*   progressive disclosure
*   schema minimization
*   capability governance
*   deterministic routing

will scale gracefully.

Those that do not will discover that the most expensive part of their AI stack is not reasoning.

It is awareness.

* * *

## **The Quiet Divide That Is Coming**

Over the next few years, I suspect we will see two classes of organizations emerge.

**Agent Enthusiasts**

Impressive demos. Expanding tool surfaces. Rising inference bills.

**Agent Architects**

Deliberate exposure. Tight boundaries. Predictable economics.

Both will build intelligent systems.

Only one group will build sustainable ones.

* * *

## **Final Thought**

The early era of cloud taught us that elasticity without discipline leads to runaway spend.

Agent platforms are about to teach the same lesson again.

When designing MCP surfaces, remember:

You are not just designing what the agent can do.

You are designing what it must carry with it every time it thinks.

And in agentic systems, unnecessary weight compounds quickly.

StayFrosty!

~ James
