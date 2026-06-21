---
title: "Agentic Engineering Workflow"
type: concept
aliases: ["agentic-engineering-workflow", "Agentic Engineering Workflow", "The Workflow"]
parent: "[[foundation|Foundation]]"
path: "foundation"
sources: ["[[intro|The Agentic Engineering Workflow]]"]
related:
  - "[[rule-file|Rule File]]"
  - "[[context-engineering|Context Engineering]]"
tags: ["agentic-engineering", "workflow", "overview"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Agentic Engineering Workflow

> [!summary]
> A disciplined eight-part system for moving from ad-hoc AI prompting to production-grade software delivery. The workflow's central thesis: the developer's real output is no longer code — it is the system that produces code. Three phases — Foundation, Build Loop, Scale — progress from establishing agent knowledge to iterating on quality to making the practice economical and durable.

## Definition

The Agentic Engineering Workflow is a structured approach to software development using AI coding agents, replacing improvised prompting with a repeatable, observable, cost-managed system. It treats the model as one component of a larger infrastructure.

## The Three Phases

### Phase 1 — Foundation: What the Agent Knows

- **[[rule-file|Rule File]]** (Part 1) — encode project knowledge (stack, conventions, hard rules, workflow) so the agent never has to infer them
- **[[context-engineering|Context Engineering]]** (Part 2) — architect what the agent sees on each call: static vs. dynamic, skills for progressive disclosure

### Phase 2 — The Build Loop

- **Verification** (Part 3) — write tests first; add evals for non-deterministic behavior; wire a quality flywheel
- **Running the Work** (Part 4) — choose conductor or orchestrator mode; match agent location to task; own the last 20%
- **Review and Ship** (Part 5) — agent first-pass review; hooks for hard rules; observability for audit

The build loop includes a feedback cycle: evaluate → diagnose → optimize → verify → monitor → back to evaluate.

### Phase 3 — Scale: Economics and Durability

- **Controlling Cost** (Part 6) — total cost of ownership; first-pass success; model routing by task
- **Production Agents** (Part 7) — persistent memory, scoped permissions, CI evals, multi-agent coordination
- **Team Standard** (Part 8) — harness as code, eval gates, review reshaping, hiring for judgment

## Key Principles

- **The output is the system, not the code.** Code is the artifact; the surrounding infrastructure (rules, context, tests, review, observability) determines whether that artifact is trustworthy.
- **Verification is non-negotiable.** "It runs and seems to work" is vibe coding. Tests and evals make output trustworthy.
- **The workflow applies at multiple scales.** Solo devs need Parts 1–6; product builders add Part 7; team leads use all eight.

## Related Concepts

- [[rule-file|Rule File]] — the primary foundation input
- [[context-engineering|Context Engineering]] — the second foundation input
