---
title: "Semantic Objects Come Before Semantic Indexes"
date: 2026-06-26
slug: semantic-objects-come-before-semantic-indexes
summary: "A semantic index is only as good as the object model underneath it: meaning, metadata, provenance, and classification define what the index can preserve and improve."
topics:
  - ai
  - semantic-indexing
  - semantic-objects
  - sosi
  - business-index
  - governance
  - because-drift-happens
status: published
original_url: ""
featured_image: "/assets/2026/06/semantic-objects-come-before-semantic-indexes.png"
canonical_url: ""
---

# Semantic Objects Come Before Semantic Indexes

![A structured semantic object map with evidence trails, metadata fields, and provenance lines forming a business index](/assets/2026/06/semantic-objects-come-before-semantic-indexes.png)

A semantic index is not designed by choosing an embedding model.

That is usually where the conversation starts, because embeddings are visible. They are concrete. They give people a tool to buy, a database to provision, and a demo to wire together.

But the deeper design decision comes earlier.

What is the index actually indexing?

If the answer is "documents," the index will inherit the shape of the document store. If the answer is "chunks," the index will inherit the assumptions of the chunking strategy. If the answer is "whatever the model can retrieve," the index will drift toward a search interface with better language matching.

That can be useful.

It is not enough.

For a Business Index, the primary unit should be the semantic object: the smallest self-contained unit of meaning that has independent business value.

That definition matters because it moves the design away from text retrieval and toward meaning preservation.

## Documents Are Containers

Documents are important, but they are containers.

A proposal can contain a claim, three assumptions, two unresolved questions, a pricing principle, an implementation plan, a risk, and a decision that was never written as a decision.

An email thread can contain a commitment, a contradiction, a change in ownership, a customer signal, and a policy exception.

A meeting note can contain a useful observation, a weak hypothesis, a deferred action, and the early version of a framework.

If the index treats the document as the main object, those meanings remain bundled together. They can be found, but they are not cleanly reusable. They are hard to review independently. They cannot be classified precisely. Their provenance gets flattened into "this came from that file."

If the index treats arbitrary chunks as the main object, the problem changes shape but does not go away. Now the meaning is constrained by token windows, headings, paragraph breaks, and splitter behaviour. A chunk may contain multiple meanings. One meaning may span multiple chunks. Evidence can be nearby but not actually supporting. A relationship can be implied but never made explicit.

The document still matters.

The chunk still matters.

But neither should be confused with the thing the business actually wants to preserve.

The semantic object is the reusable unit.

## Classification Is Design

Once you define semantic objects, the next question is family.

What kind of meaning is this?

The reference taxonomy I have been using starts with practical families: principles, frameworks, decisions, observations, problems, solutions, stories, analogies, definitions, claims, evidence, questions, actions, and relationships.

That list is not decorative metadata. It is index design.

A principle does not behave like an action.

A decision does not behave like an observation.

Evidence does not behave like a claim.

A question does not have the same lifecycle as a policy.

A relationship is not just another note; it is what lets the index say that one object supports, contradicts, depends on, supersedes, or evolves from another.

The family tells the system what kind of object it is handling. That affects extraction, validation, review, retrieval, ageing, and display.

For example:

- A **decision** needs rationale, trade-offs, date, owner, alternatives considered, and supersession history.
- A **claim** needs support, confidence, scope, and the possibility of being refuted.
- A **question** needs status, owner, next review, and links to evidence or answers.
- A **problem** needs affected context, severity, symptoms, and related solutions.
- A **solution** needs the problem it answers, implementation state, constraints, and known risks.
- **Evidence** needs source, freshness, strength, and what it actually supports.
- A **relationship** needs type, direction, and enough explanation that the connection can be audited later.

Without object families, the index is forced to treat meaning as a uniform substance. Everything becomes a passage, a vector, or a search result.

But business meaning is not uniform.

The index should know the difference.

## Metadata Is Not Clerical

Metadata is often treated as administrative residue: title, author, date, file path, maybe a tag or two.

That is too small a view.

For semantic objects, metadata is part of the meaning boundary.

It answers questions like:

- What family is this object?
- What business area does it apply to?
- Is it current, stale, disputed, draft, approved, or superseded?
- Who or what created it?
- Who reviewed it?
- What source system did it come from?
- What confidence or evidence strength does it carry?
- What time period does it describe?
- What other objects does it depend on, support, contradict, or replace?

That information changes what the index can safely do.

An approved principle should not be handled like an unreviewed observation. A superseded decision should not be treated like current policy. A weak claim should not be presented with the same weight as a claim backed by direct evidence. A customer story should not be mistaken for a metric.

Metadata gives the index a control surface.

It lets retrieval become selective instead of merely similar. It lets review queues become meaningful. It lets dashboards distinguish current knowledge from archival knowledge. It lets rebuilds explain what changed.

Without metadata, a semantic index can find things.

With metadata, it can start to govern meaning.

## Provenance Keeps Meaning Honest

Provenance is the other half of the design.

Every semantic object should be able to answer: where did this come from?

Not vaguely. Not "from the knowledge base." Not "from the CRM." Not "from a bunch of documents."

Specifically.

Which source? Which passage? Which email? Which record? Which meeting note? Which version? Which extraction run? Which reviewer? Which interpretation?

Provenance matters because semantic objects are not raw facts. They are interpreted units of meaning. The moment the system extracts a claim, summarizes a decision, or classifies an observation, it has made a judgement.

That judgement may be useful.

It still needs a trail.

The trail lets a person inspect the source, challenge the object, split it, merge it, downgrade it, supersede it, or confirm it. It also lets the system explain whether a later change came from the source material, the extraction rules, the classification model, or a human review.

That is what keeps a Business Index from becoming a confident pile of detached assertions.

Provenance ties meaning back to evidence.

## The Index Is Shaped By Its Objects

This is why semantic object design comes before semantic index design.

The object model determines what the index can know.

If the object model includes only text and embeddings, the index can mostly retrieve similar text.

If the object model includes family, metadata, provenance, evidence, relationships, review state, and version history, the index can preserve organizational meaning with more discipline.

It can answer better questions:

- What do we currently believe?
- What evidence supports that belief?
- Which decisions are still active?
- Which assumptions are unresolved?
- Which problems have proposed solutions?
- Which claims are weakly supported?
- Which policies are contradicted by later practice?
- Which objects changed after the last rebuild?
- Which meanings are stable, and which are drifting?

Those are not just search questions.

They are business questions.

## SOSI And The Business Index

This is the practical point behind a SOSI-compliant Business Index.

SOSI is not just "semantic search with better prompts." It starts from a stronger unit of preservation:

Semantic Object = Meaning + Metadata + Provenance.

The meaning gives the object its business value.

The metadata gives it structure, scope, lifecycle, and reviewability.

The provenance gives it evidence, accountability, and a path back to source.

Classification then turns the object from an isolated note into part of a useful index. A principle can be reused. A framework can organize other objects. A decision can be audited. A problem can be connected to solutions. A claim can be tested against evidence. A question can stay open without being lost. A relationship can make contradiction visible instead of burying it in retrieval noise.

That is the difference between indexing text and indexing meaning.

## Start With The Families

The practical starting move is simple:

Define the semantic object families before building the index.

Decide which families matter first. Define what each family means. Decide the required metadata for each one. Define the allowed relationship types. Set review states. Preserve provenance by default. Keep the source document, but do not let the document become the only unit of meaning.

The future families will depend on the business. A Business Index may eventually need people, organizations, products, capabilities, process steps, risks, opportunities, metrics, policies, events, patterns, anti-patterns, lessons learned, constraints, and assumptions.

But those should be added deliberately.

Every new family changes what the index can express.

That is power, but it is also responsibility. A sloppy family model creates a sloppy semantic index. A disciplined family model creates an index that can be reviewed, trusted, rebuilt, and improved.

## The Real Design Question

The real design question is not:

Can we embed this corpus?

The better question is:

What are the reusable units of meaning inside this corpus, and how should they behave over time?

That is where semantic indexing becomes semantic infrastructure.

Not because the vector database is clever.

Because the business finally has a durable way to preserve what it means, where that meaning came from, how it is classified, what evidence supports it, and how it relates to everything else the organization knows.

Index meaning rather than text.

Documents are containers.

Semantic objects are the material the Business Index is built from.
