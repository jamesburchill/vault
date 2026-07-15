---
title: "Model Collapse: What Synthetic Training Data Can—and Cannot—Tell Us"
date: 2024-11-05
slug: ai-inbreeding-a-growing-concern-and-a-path-to-detecting-ai-created-content
summary: "A corrected look at model collapse, recursive synthetic training data, and why prose style is not reliable proof of AI authorship."
topics:
  - tech-with-a-twist
  - ai
  - programming
status: published
original_url: "https://vault.jamesburchill.com/tech-with-a-twist/ai-inbreeding-a-growing-concern-and-a-path-to-detecting-ai-created-content/"
wordpress_id: 319
featured_image: "/assets/2024/11/ai-inbreeding-a-growing-concern-and-a-path-to-detecting-ai-created-content-ai-inbreeding.jpg"
---

# Model Collapse: What Synthetic Training Data Can—and Cannot—Tell Us

![Model collapse and recursive synthetic training data](/assets/2024/11/ai-inbreeding-a-growing-concern-and-a-path-to-detecting-ai-created-content-ai-inbreeding.jpg)

> **Corrected July 15, 2026:** I originally called this problem “AI inbreeding” and suggested that stylistic clues could reliably identify AI-written text. The established research term is **model collapse**, and writing style alone is not dependable proof of authorship.

Generative models can degrade when each new generation is trained indiscriminately on outputs from earlier generations. Research published in *Nature* describes this as model collapse: the learned distribution loses information about the original data, including uncommon but important patterns.

That finding is real. The slogan “AI trained on AI becomes worse” is still too broad.

## The training conditions matter

Model collapse is not evidence that every use of synthetic data is harmful. Results depend on how synthetic examples are generated, selected, labelled, mixed with original data, and used during training. Research has also shown that retaining or accumulating real data can materially change the outcome.

The operational lesson is not “ban synthetic data.” It is:

- preserve trustworthy source data;
- record where training examples came from;
- measure performance across common and rare cases;
- test for distribution loss rather than assuming it; and
- avoid recursive pipelines whose inputs cannot be traced.

That is a provenance and evaluation problem, not a purity test.

## Model collapse is not an AI detector

Repetitive phrasing, a flat tone, simplistic explanations, factual errors, and formulaic structure can appear in machine-generated writing. They also appear in human writing. Editing, translation, accessibility needs, templates, and second-language composition make stylistic judgements even less reliable.

Detectors can perform usefully in a defined evaluation against known models and known data. Their performance can fall when the generator, prompt, domain, or editing process changes. NIST's adversarial evaluations have shown both sides of this: some detectors work in constrained settings, while some generators fool every submitted detector.

So a detector score should be treated as a signal for further review—not a verdict about a person.

## What to verify instead

When authorship or integrity matters, stronger evidence includes:

- source files and revision history;
- signed publication records;
- citations and reproducible supporting material;
- disclosure of material AI assistance; and
- direct confirmation from the responsible person or organization.

None is a universal truth machine. Together they are more defensible than diagnosing authorship from vibes.

The larger point survives the correction: recursively generated information can damage a system when provenance, evaluation, and original evidence disappear. The answer is not confident detection. It is better evidence.

Sources: [AI models collapse when trained on recursively generated data](https://www.nature.com/articles/s41586-024-07566-y), [Is Model Collapse Inevitable?](https://arxiv.org/abs/2404.01413), and [NIST's 2024 text-generation and detection evaluation](https://www.nist.gov/publications/2024-nist-genai-pilot-study-text-text-evaluation-overview-and-results).
