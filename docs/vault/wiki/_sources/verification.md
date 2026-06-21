---
title: "Source: Part 3 — Build Verification"
page_class: concept
source: "raw/verification.md"
tags: [source, verification, testing, evals, quality]
---

# Source: Part 3 — Build Verification

## Metadata

- **File:** `raw/verification.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **Series position:** Part 3 of 8

## Summary

Establishes verification — tests plus evals — as the dividing line between real engineering and vibe coding. Tests are deterministic contracts that also communicate intent to the agent more precisely than prose prompts. Evals judge non-deterministic agent behavior: both the output and the trajectory (how the agent got there). Describes the five-step quality flywheel: evaluate, diagnose, optimize, verify, monitor.

## Key Claims

Verification is the discipline that makes AI output trustworthy at production stakes. Tests serve dual purpose: runtime check and machine-checkable specification for the agent. Write tests before generating code — a failing test is an unambiguous target. Evals cover output evaluation (does the artifact meet the bar?) and trajectory evaluation (did the agent take a sensible path?). Trajectory matters: a fluent output that skipped verification steps is more dangerous than an obvious error. Rubric-based evals define "good" explicitly and check it automatically. Quality flywheel: evaluate → diagnose → optimize → verify → monitor. Covers: Verification, Testing, Evals, Build Loop, Quality.
