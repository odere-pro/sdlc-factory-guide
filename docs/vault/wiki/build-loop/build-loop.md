---
title: "Build Loop"
type: index
aliases: ["build-loop", "Build Loop", "The Build Loop", "build cycle"]
parent: "[[index|Wiki Index]]"
path: "build-loop"
children:
  - "[[build-loop/verification|Verification]]"
  - "[[build-loop/running-the-work|Running the Work]]"
  - "[[build-loop/review-and-ship|Review and Ship]]"
child_indexes: []
tags: ["build-loop", "agentic-engineering"]
created: 2026-06-22
updated: 2026-06-22
---

# Build Loop

> [!summary]
> The Build Loop is Phase 2 of the agentic engineering workflow — the iterative cycle of specifying (via tests), generating (with agents), and validating work before it ships. Three practices form the loop: Verification (tests + evals), Running the Work (mode and location selection), and Review and Ship (review, hooks, observability). A feedback cycle runs from shipping back into verification.

The Build Loop is where the actual coding work happens. It is not a linear pipeline but a cycle: verification informs generation, generation produces artifacts, review catches failures, and monitoring feeds root causes back into verification improvements.

## Pages in This Topic

- [[build-loop/verification|Verification]] — tests as the deterministic contract; evals for non-deterministic trajectory
- [[build-loop/running-the-work|Running the Work]] — conductor vs. orchestrator modes; agent locations; the 80% problem
- [[build-loop/review-and-ship|Review and Ship]] — agent first-pass review, commit hooks, observability, legacy wins

## The Feedback Loop

The build loop includes an explicit quality flywheel:

1. Evaluate against benchmark suite
2. Diagnose failures by root-cause cluster
3. Optimize the prompt, rule, or tool at fault
4. Verify the fix with a regression suite
5. Monitor production for new failure modes → back to step 1

Each turn of this loop raises the baseline for the next.
