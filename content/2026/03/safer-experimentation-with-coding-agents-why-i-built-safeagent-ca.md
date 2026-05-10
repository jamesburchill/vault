---
title: "Safer Experimentation With Coding Agents: Why I Built SafeAgent.ca"
date: 2026-03-23
slug: safer-experimentation-with-coding-agents-why-i-built-safeagent-ca
summary: "Coding agents are getting more capable, and more people want to try them on real repositories. The problem is simple: curiosity moves faster than caution. A lot of early experimentation happens in the worst possible way. Someone points an agent at a working copy, gives it network access, and hopes for the best. That may"
topics:
  - tech-with-a-twist
status: published
original_url: "https://vault.jamesburchill.com/tech-with-a-twist/safer-experimentation-with-coding-agents-why-i-built-safeagent-ca/"
wordpress_id: 1016
featured_image: "/assets/2026/03/safer-experimentation-with-coding-agents-why-i-built-safeagent-ca-adultic-ai.png"

---

# Safer Experimentation With Coding Agents: Why I Built SafeAgent.ca

![Safer Experimentation With Coding Agents: Why I Built SafeAgent.ca](/assets/2026/03/safer-experimentation-with-coding-agents-why-i-built-safeagent-ca-adultic-ai.png)


Coding agents are getting more capable, and more people want to try them on real repositories. The problem is simple: curiosity moves faster than caution.

A lot of early experimentation happens in the worst possible way. Someone points an agent at a working copy, gives it network access, and hopes for the best. That may be fine for a demo. It is a poor way to learn safely.

I built SafeAgent to offer a better starting point.

SafeAgent is a small reference scaffold for running an OpenClaw-style coding agent inside a disposable sandbox with constrained networking, simple policy checks, approval gates for riskier commands, and audit logging. It is not a magic shield. It is not a high-assurance security boundary. It is a practical way to reduce blast radius while learning and experimenting.

The project is live at [https://safeagent.ca](https://safeagent.ca), which currently redirects to the GitHub repository.

### Why I built it

I kept seeing the same tension in conversations about coding agents:

*   People want to experiment.
*   People are rightly worried about damage.
*   Most of the advice is either too casual or too complex.

“Just run it and see what happens” is reckless.

“Build a full production isolation system first” is unrealistic.

I wanted something in the middle: a starter that is honest about its limits, but still genuinely useful.

### What SafeAgent does

SafeAgent separates the control plane from the job sandbox and runs one sandbox per job. The sandbox uses a non-root user, a read-only root filesystem, a writable workspace, dropped Linux capabilities, and no Docker socket. The control plane applies a policy, supports approval for higher-risk commands, and writes audit logs so it is easy to inspect what happened.

I also made the default posture conservative.

The default policy is inspect-only. It allows commands like ls, find, cat, grep, git status, and git diff, but it does not automatically allow repo-defined execution such as tests or builds. There is a separate opt-in execution policy if someone deliberately wants to allow commands like pytest or make test.

That matters, because the biggest risk for most newcomers is not a dramatic container escape. It is ordinary damage: an agent deleting files, executing repo-defined code too casually, or reaching out over the network when it should not.

### What it does not do

I think projects like this need to be very explicit about limits.

SafeAgent does not provide high-assurance containment. It does not make a determined rogue agent safe. It does not replace careful firewalling, secret handling, or stronger isolation like microVMs when the threat model demands them.

What it does do is make experimentation meaningfully safer than running an agent directly on a host or a valuable working copy.

That is an important difference.

### Why I think this is worth sharing

I think there is real value in tools that help people raise their safety baseline without pretending to solve everything.

If someone is new to coding agents and wants to experiment without handing an autonomous tool unrestricted access to their machine, SafeAgent is useful. It gives them a smaller, more understandable environment. It encourages deliberate choices. It makes risky behaviour more visible.

It is also intentionally small enough to read end to end. I wanted the code to be understandable, not just deployable.

### What I hope people do with it

I hope people use it in three ways:

*   as a safer starting point for experimentation
*   as a reference for designing better agent sandboxes
*   as a prompt to think more seriously about operational boundaries before connecting powerful agents to real environments

If that sounds useful, take a look at [https://safeagent.ca](https://safeagent.ca).

I’d be interested in hearing how other people are thinking about safe experimentation, especially where the line should be between “good enough for learning” and “strong enough for real containment.”
