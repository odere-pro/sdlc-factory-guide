---
title: "Source: Part 5 — Review and Ship"
page_class: process
source: "[[raw/review-and-ship.md]]"
tags: [source, review, shipping, hooks, observability, code-review]
---

# Source: Part 5 — Review and Ship

## Metadata

- **File:** `raw/review-and-ship.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **Series position:** Part 5 of 8

## Summary

Positions the engineer as reviewer-more-than-author when AI writes the majority of code. Argues for agent-first-pass review to clear mechanical issues before human review. Provides specific failure modes to watch in generated code (clever abstractions, hallucinated imports, weak error handling). Covers commit hooks for automated rule enforcement and observability (traces, eval scores, cost, drift) for production visibility. Notes that legacy maintenance work is an underrated use case.

## Key Claims

When agents write 80% of code, the engineer's primary role shifts to reviewer. Agent first-pass clears mechanical noise so human review can focus on design and fit. Review failure modes: clever abstractions that should be simple, hallucinated imports, error handling that covers happy path only. Hooks encode rules the agent or human "should never forget" in deterministic code that runs at lifecycle points. Observability tracks traces, eval results, token cost/latency, and behavioral drift. Legacy code refactors and migrations are high-value, underutilized agent tasks. Covers: Review and Ship, Code Review, Hooks, Observability, Build Loop.
