---
title: Build Loop
type: index
page_class: overview
source: "[[raw/intro.md]]"
sources:
  - "[[intro|Agentic Engineering Workflow Overview]]"
tags: [build-loop, index, topic]
parent: "[[index|Wiki Index]]"
path: build-loop/
children:
  - "[[Verification]]"
  - "[[Running the Work]]"
  - "[[Review and Ship]]"
---

# Build Loop

The build loop is the execution cycle at the center of the agentic engineering workflow — the repeating sequence of verification, running the work, and review and ship that produces trustworthy output from an AI-assisted development process.

## Pages

- [[verification|Verification]] — tests as the deterministic contract and evals for non-deterministic agent behavior.
- [[running-the-work|Running the Work]] — conductor vs orchestrator modes, agent locations, sandbox execution, and the 80% problem.
- [[review-and-ship|Review and Ship]] — agent first-pass review, generated-code failure modes, hooks, and observability.

## Relationship to the rest of the workflow

The build loop depends on [[foundation|Foundation]] — a rule file and engineered context are prerequisites for productive agent execution. The loop feeds into [[scale|Scale]] — cost control depends on first-pass success rate, which the loop governs, and the team-standard discipline wraps the loop in shared governance. The feedback connection is explicit: eval results from [[verification|Verification]] drive observability in [[review-and-ship|Review and Ship]], and production failures cycle back into the eval benchmark.
