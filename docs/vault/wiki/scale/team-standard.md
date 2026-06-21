---
title: Team Standard
page_class: process
source: "[[Source: Part 8 — Make It a Team Standard]]"
sources:
  - "[[team-standard|Part 8: Make It a Team Standard]]"
  - "[[checklist|Implementation Checklist]]"
tags: [scale, team-standard, harness, eval-gates, hiring, engineering-culture, CI]
related:
  - "[[verification|Verification]]"
  - "[[review-and-ship|Review and Ship]]"
  - "[[production-agents|Production Agents]]"
  - "[[controlling-cost|Controlling Cost]]"
parent: "[[scale|Scale]]"
path: scale/
---

# Team Standard

A team standard for agentic engineering means treating the shared harness — rule files, system prompts, eval suites, skill libraries — as versioned infrastructure with named owners, gating shipping on passing eval suites rather than working demos, and hiring for specification and evaluation judgment over raw implementation speed.

## Overview

Everything in the Foundation and Build Loop phases works for one developer. The moment a team is involved, a new failure mode appears: harness drift. One person's rule file says one thing, another's says something else, agent behavior becomes irreproducible across the team, and the discipline quietly erodes. The team standard is what prevents this.

The underlying principle: AI amplifies the engineering culture it lands in. A team with strong tests, clear standards, and healthy review gets dramatically more from these tools. A team without those gets faster at producing problems.

## Key Principles

**Treat the harness as code.** Rule files, system prompts, eval suites, and skill libraries are not personal config — they are shared infrastructure. Version them with the project. Review them in pull requests. Assign named owners so they are maintained on purpose rather than rotting. Without this, every developer's agent behaves slightly differently and nobody can reproduce anyone else's results.

**Gate on the eval, not the demo.** A working demo proves an agent can succeed once. A passing eval suite proves it succeeds reliably. These are not the same, and shipping on the strength of a demo is how unreliable agents reach production. Make eval coverage a precondition for shipping, gated in CI with an explicit rubric that scores task success, tool-use quality, trajectory compliance, hallucination rate, and response quality.

**CI gate pattern:**

```yaml
agent-evals:
  run: eval-suite --rubric rubric.yaml --min-score 0.9
  on: [pull_request]
  required: true
```

**Reshape code review for generated code.** Generated code needs the same scrutiny as human code — or more — and reviewers need to know its specific failure modes (see [[review-and-ship|Review and Ship]]). The old human-code review checklist is not sufficient. Train reviewers and tune the checklist to generated-code failure patterns: hallucinated dependencies, thin error handling, correctness gaps that look fine at a glance.

**Draw the prototype/production boundary explicitly.** Fast exploration and disciplined production work are both valid, but only when everyone knows which is which. Specify which repos are production versus sandbox, which branches require the full discipline, which environments an agent's output can reach. Teams that leave this blurry produce prototypes that ship by accident.

**Build the harness once, compound it.** Reusable prompts, skill libraries, tool connections, and eval harnesses compound across projects. The teams that get the most from AI development build the shared harness once and keep improving it, rather than each person rebuilding their own from scratch.

**Hire and promote for judgment.** As implementation gets cheaper, the bottleneck moves to specification, evaluation, and architectural judgment. The most valuable engineers are those who can direct agents well. Reflect this in hiring: weight specification skill, evaluation rigor, and system design over raw implementation speed. In the strongest hybrid setups, humans set direction, agents implement, and clear handoff protocols govern the boundary.

## Related Concepts

- [[verification|Verification]] — the eval rubric and CI gate are the team-standard form of the verification discipline.
- [[review-and-ship|Review and Ship]] — shared review checklists for generated code are part of the team standard.
- [[production-agents|Production Agents]] — the prototype/production boundary the team standard draws is the same distinction production-agents makes explicit.
- [[controlling-cost|Controlling Cost]] — model routing config and cost measurement become team infrastructure when standardized.
