---
title: "Part 5: Review and Ship"
type: source
source_type: article
source_format: text
author: "Oleksandr Derechei"
publisher: "SDLC Factory Guide"
date_published: 2026-06-18
date_ingested: 2026-06-22
tags: ["review", "shipping", "hooks", "observability", "build-loop"]
aliases: []
sources: []
created: 2026-06-22
updated: 2026-06-22
status: active
confidence: 1.0
---

# Part 5: Review and Ship

## Metadata

- **Source file:** `raw/wired/sdlc-factory-guide/review-and-ship.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **URL:** https://odere-pro.github.io/sdlc-factory-guide/review-and-ship

## Summary

When agents write 80% of code, the developer role shifts from author to reviewer. This article covers three reinforcing practices: using the agent as a first-pass mechanical reviewer, encoding hard rules as hooks that run automatically at lifecycle points, and standing up observability to audit agent behavior over time.

## Key Claims

- The agent is well-suited as a first-pass reviewer for mechanical concerns (bugs, style, security smells, performance issues), freeing humans for design-level judgment.
- Generated code must be reviewed with specific suspicion: clever abstractions (flag them), hallucinated imports (verify they exist), and weak error handling (check failure paths).
- Hooks encode rules the agent "should never forget but often does" — they run deterministically at lifecycle points (pre-commit, post-edit) and cannot be talked past.
- Observability tracks traces, eval scores, token cost/latency, and behavioral drift over time.
- Legacy code is an underrated win: agents can read, infer patterns, and modernize code that was "too risky to touch" — turning multi-quarter migrations into scoped reviewable PRs.

Covers: Code Review, Commit Hooks, Observability, Generated Code Review, Legacy Migration
