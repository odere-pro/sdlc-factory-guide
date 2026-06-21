---
title: "Team Standard"
type: concept
aliases: ["team-standard", "Team Standard", "harness as code", "engineering culture"]
parent: "[[scale|Scale]]"
path: "scale"
sources: ["[[team-standard|Part 8: Make It a Team Standard]]"]
related:
  - "[[controlling-cost|Controlling Cost]]"
  - "[[production-agents|Production Agents]]"
tags: ["team-standard", "engineering-culture", "eval-gates", "hiring", "scale"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Team Standard

> [!summary]
> Making agentic engineering a team standard requires treating the harness as shared infrastructure — versioned, reviewed in PRs, and owned. The key failure mode at team scale is harness drift. Four practices prevent it: harness-as-code, eval gates (not demos), reshaped code review, and hiring for judgment (specification, evaluation, architecture) rather than implementation speed.

## Definition

Team Standard is the practice of converting an individual agentic workflow into a durable, shared engineering standard — consistent across team members, gated on measurable quality, and improving over time rather than rotting.

## The Core Principle

> [!important]
> AI amplifies the engineering culture it lands in. A team with strong tests, clear standards, and healthy review gets dramatically more out of these tools. A team without those gets faster at producing problems.

The goal of standardizing is to make the good culture the path of least resistance.

## Four Practices

### 1. Treat the Harness as Code

Rule files, system prompts, eval suites, and skill libraries are shared infrastructure:

- **Version them** with the project
- **Review them in PRs** like any other change
- **Assign named owners** so they're maintained deliberately, not rotting

Without this, every developer's agent behaves differently and results are irreproducible.

### 2. Gate on the Eval, Not the Demo

A working demo proves an agent can succeed once. A passing eval suite proves it succeeds reliably.

**Eval rubric dimensions to score:**
- Task success
- Tool-use quality
- Trajectory compliance
- Hallucination rate
- Response quality

A CI gate makes it real:

```yaml
agent-evals:
  run: eval-suite --rubric rubric.yaml --min-score 0.9
  on: [pull_request]
  required: true
```

### 3. Re-Shape Code Review for Generated Code

Generated code needs the same scrutiny as human code, or more — and reviewers need to know its specific failure modes:
- Hallucinated dependencies
- Thin error handling
- Correctness gaps that look fine at a glance

Tune the review checklist to generated-code failure modes, not the old human-code checklist.

### 4. Draw the Prototype/Production Boundary Explicitly

Teams that leave this blurry produce prototypes that ship by accident. Define:

| Dimension | Define Which Are... |
|-----------|---------------------|
| **Repos** | Production vs. sandbox |
| **Branches** | Require full discipline |
| **Environments** | Agent output can reach |

## Hiring and Promotion for Judgment

As implementation gets cheaper, the bottleneck moves to specification, evaluation, and architectural judgment. The most valuable engineers are those who can direct agents well — not those who type the most code.

Reflect this in hiring: weight specification skill, evaluation rigor, and system design over raw implementation speed. Add a specification-and-evaluation exercise to the hiring loop.

The strongest setups are **hybrid by design**: humans set direction, agents implement, clear handoff protocols govern the boundary.

## Build the Harness Once, Refine Many Times

Reusable prompts, skill libraries, tool connections, and eval harnesses compound across projects. Treat the harness as infrastructure: documented, maintained, deliberately improved — not rebuilt from scratch by each developer.

## Related Concepts

- [[controlling-cost|Controlling Cost]] — the harness standard includes cost discipline
- [[production-agents|Production Agents]] — production agents need the eval and harness practices this page describes
