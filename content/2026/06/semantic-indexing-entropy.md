---
title: "Semantic Indexing's Dirty Little Secret: Entropy"
date: 2026-06-24
slug: semantic-indexing-entropy
summary: "Semantic indexes age as organizational meaning shifts; durable semantic infrastructure needs provenance, review, and rebuild paths, not retrieval alone."
topics:
  - ai
  - semantic-indexing
  - sosi
  - governance
  - because-drift-happens
  - drift
status: published
original_url: ""
featured_image: "/assets/2026/06/semantic-indexing-entropy.png"
canonical_url: ""
---

# Semantic Indexing's Dirty Little Secret: Entropy

![Semantic index and evidence trails breaking apart as organizational meaning drifts](/assets/2026/06/semantic-indexing-entropy.png)

Semantic indexes feel permanent when they are first created.

You gather the documents. You chunk the text. You generate embeddings. You store them in a vector database. You wire up retrieval. Suddenly, the organization can search across material that used to be scattered, buried, or invisible.

That is useful.

It is better than nothing.

But semantic indexing has a dirty little secret.

The moment a semantic index is created, it starts to age.

Not because the technology is bad. Because meaning moves.

Policies change. Teams rename things. Customers use different language. Exceptions become normal. Old decisions are superseded. Commitments stall. Ownership shifts. Tools migrate. People leave. Context that was obvious in January becomes ambiguous in June.

The records may still exist. The embeddings may still search. The answers may still sound confident.

But the meaning has started to drift.

## The Problem Is Not Search

Most semantic indexing projects are framed as retrieval problems.

Can we find the right document?

Can we answer questions from the knowledge base?

Can we reduce the time people spend searching?

Can we add RAG to our existing content?

Those are reasonable goals. They are not the whole problem.

Search assumes the thing being searched still means what we think it means.

Inside organizations, that assumption quietly fails all the time.

A document can be retrievable and still be obsolete. A decision can be preserved and still be superseded. A commitment can be visible and still be abandoned. A policy can be indexed and still be contradicted by later practice.

Standard semantic search helps you find the artefact.

It does not necessarily preserve the organizational meaning of that artefact.

## Semantic Entropy

Semantic entropy is the natural decay of organizational meaning over time.

It happens when records are retained but context is lost.

The email is still there, but nobody remembers whether it was final.

The ticket is still there, but the customer expectation changed.

The meeting note is still there, but the decision was later reversed.

The policy is still there, but the exception became the real process.

The embedding is still there, but the organization has moved on.

This is the central weakness of many semantic indexes: they preserve access better than they preserve understanding.

They make old material easier to retrieve, but they do not automatically tell you whether that material is current, contradicted, weakly supported, superseded, or still trusted.

That is not a small flaw.

It is the long-term failure mode.

## A Static Index in a Moving Organization

A standard semantic index usually captures a representation of meaning at a point in time.

That representation can be powerful. But unless the index has a way to track meaning, metadata, provenance, relationships, contradictions, versions, and rebuild history, it becomes increasingly brittle.

The organization keeps changing.

The index remembers.

That sounds good until the index remembers without knowing what changed.

This is where semantic indexing needs to grow up. Retrieval alone is not enough. The index needs to understand ageing, drift, evidence, and revision as normal conditions.

## SOSI Starts From Drift

The SOSI Framework starts with a different assumption:

Drift is the default.

A semantic system should not pretend drift is an edge case. It should be designed around it.

That means the unit of preservation cannot just be a chunk of text or an embedding. It needs to be a Semantic Object:

Meaning + metadata + provenance.

The point is not merely to store what was said.

The point is to preserve what it meant, where that meaning came from, what evidence supports it, how strong that evidence is, how it relates to other meanings, and how it changes over time.

That changes the role of the index.

A standard semantic index is primarily a retrieval layer.

A SOSI-compliant Business Index is a preservation, audit, calibration, and rebuild layer for organizational understanding.

## The Index Should Improve

A generic semantic index must be maintained. But maintenance is not the same as improvement.

Re-embedding a corpus may refresh the search layer. It does not automatically improve the organization's understanding of its own records.

SOSI treats the index as something that should learn from review.

A confirmed object becomes a positive example.

A rejected object becomes a counterexample.

A split object reveals that the taxonomy was too crude.

A contradiction becomes evidence, not noise.

A rebuild explains whether meaning changed because the source changed, the definition changed, or the extraction logic changed.

This is the compounding part.

The value is not just that the index gets bigger. The value is that reviewed understanding accumulates inside it.

## Designing for Entropy

If semantic entropy is normal, the index has to be designed for it.

That means preserving provenance with every object.

It means recording review state, confidence, and evidence strength.

It means modelling contradiction instead of hiding it.

It means tracking supersession, ownership, and version history.

It means keeping rejected extractions, split objects, and disputed meanings as calibration material.

It means rebuilding explainably, not merely periodically.

The question is not only:

What did the index retrieve?

The better question is:

What does this still mean, how do we know, and what has changed since it was captured?

That is a governance question.

Not a search question.

## The Real Asset

The durable asset is not the vector database.

It is not the embedding model.

It is not the chatbot.

The durable asset is the organization-specific structure of preserved meaning: the objects, evidence standards, relationships, provenance trails, review decisions, calibration history, and rebuild paths.

That is what survives model changes.

That is what makes future retrieval better.

That is what lets an organization ask not only "what did we say?" but "what did we mean, how do we know, and has that meaning changed?"

## The Dirty Secret

Semantic indexing's dirty little secret is entropy.

A semantic index ages because organizations age. Their language, decisions, assumptions, responsibilities, and risks are constantly shifting.

Ignoring that does not stop drift. It only makes drift invisible.

The next generation of semantic infrastructure should not be satisfied with better search over decaying meaning.

It should make meaning durable, reviewable, and improvable.

That is the real promise of SOSI:

A semantic index helps you search what the organization knew.

A Business Index helps the organization preserve, audit, and improve what it means over time.
