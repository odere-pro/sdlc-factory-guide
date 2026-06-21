---
title: Agentic Workflow Overview
page_class: overview
source: "[[Source: The Agentic Engineering Workflow (intro)]]"
sources:
  - "[[intro|The Agentic Engineering Workflow]]"
tags: [reference, overview, workflow, series-map]
related:
  - "[[foundation|Foundation]]"
  - "[[build-loop|Build Loop]]"
  - "[[scale|Scale]]"
parent: "[[reference|Reference]]"
path: reference/
---

# Agentic Workflow Overview

The agentic engineering workflow is an eight-part, three-phase system for moving from ad-hoc AI prompting to a disciplined, production-ready development process organized around the principle that the engineer's real output is the system that produces code, not code itself.

## Overview

The central thesis: models are one small part of a production system. Everything built around them — rules, context, tests, review, observability — determines whether output is trustworthy. The workflow makes this explicit by dividing eight parts into three sequential phases.

**Phase 1: Foundation — what the agent knows**
- Part 1: [[rule-file|Rule File]] — encode project knowledge in an onboarding document the agent reads on every task.
- Part 2: [[context-engineering|Context Engineering]] — control what the agent sees and when; separate static from dynamic context; build skills for progressive disclosure.

**Phase 2: The Build Loop — execution cycle**
- Part 3: [[verification|Verification]] — tests as deterministic spec; evals for non-deterministic behavior; the five-step quality flywheel.
- Part 4: [[running-the-work|Running the Work]] — conductor vs orchestrator mode; three agent locations; sandbox execution; the 80% problem.
- Part 5: [[review-and-ship|Review and Ship]] — agent first-pass review; generated-code failure modes; hooks for automated enforcement; observability.

**Phase 3: Scale — economics and governance**
- Part 6: [[controlling-cost|Controlling Cost]] — total cost of ownership; first-pass success; model routing; dynamic context as cost lever.
- Part 7: [[production-agents|Production Agents]] — persistent memory; scoped permissions; CI evals; multi-agent coordination via MCP and A2A.
- Part 8: [[team-standard|Team Standard]] — harness as code; eval-gated CI; review checklist for generated code; prototype/production boundary; hiring for judgment.

## Audience routing

- **Solo developer:** Parts 1–6 transform daily workflow. Start with Part 1.
- **AI product builder:** Add Part 7.
- **Team lead:** All eight parts, with extra weight on Parts 3, 5, and 8.

## Related Concepts

- [[foundation|Foundation]] — the prerequisite phase covering rule files and context engineering.
- [[build-loop|Build Loop]] — the execution cycle covering verification, running the work, and review.
- [[scale|Scale]] — the economic and governance phase.
