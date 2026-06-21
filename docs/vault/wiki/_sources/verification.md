---
title: "Part 3: Build Verification"
type: source
source_type: article
source_format: text
author: "Oleksandr Derechei"
publisher: "SDLC Factory Guide"
date_published: 2026-06-18
date_ingested: 2026-06-22
tags: ["verification", "testing", "evals", "quality", "build-loop"]
aliases: []
sources: []
created: 2026-06-22
updated: 2026-06-22
status: active
confidence: 1.0
---

# Part 3: Build Verification

## Metadata

- **Source file:** `raw/wired/sdlc-factory-guide/verification.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **URL:** https://odere-pro.github.io/sdlc-factory-guide/verification

## Summary

Verification is the discipline that separates real engineering from "vibe coding." Two mechanisms work together: tests for deterministic behavior (written before code generation) and evals for non-deterministic agent behavior (trajectory + output). Together they form a quality flywheel that compounds over time.

## Key Claims

- Without systematic verification, AI output is gambling regardless of prompt sophistication.
- Tests serve a dual role: verifying behavior AND communicating precise intent to the agent — a failing test is an unambiguous spec.
- Evals come in two flavors: output evaluation (did it produce the right artifact?) and trajectory evaluation (did it follow the right path?).
- Trajectory evaluation is especially important: a fluent output that skipped verification steps is more dangerous than an obvious error.
- The quality flywheel: evaluate → diagnose (cluster failures) → optimize (prompt/rule/tool) → verify fix → monitor production.
- Evals require a rubric to measure anything — define what constitutes "good" explicitly.

Covers: Verification, Tests, Evals, Quality Flywheel, Trajectory Evaluation, Output Evaluation
