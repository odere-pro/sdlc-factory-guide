---
title: "Source: Part 4 — Run the Work"
page_class: process
source: "[[raw/running-the-work.md]]"
tags: [source, running-the-work, conductor, orchestrator, sandbox, 80-percent-problem]
---

# Source: Part 4 — Run the Work

## Metadata

- **File:** `raw/running-the-work.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **Series position:** Part 4 of 8

## Summary

Covers two operating modes (conductor for real-time control, orchestrator for async delegation) and three agent locations (editor, terminal, background). Defines the 80% problem: agents generate the easy majority quickly but lack the domain knowledge to handle edge cases, error handling, and business logic — exactly where production failures live. Emphasizes that all code execution should occur inside a sandbox.

## Key Claims

Conductor mode: real-time, fine-grained, in-editor. Orchestrator mode: async, high-level delegation, requires precise upfront specification. Orchestrator mode rewards specification, decomposition, evaluation, and system design — not syntax fluency. Three agent locations: editor (in-flow), terminal (multi-file run-and-react), background (walk-away tasks). Agents generate ~80% fast; the last 20% (edge cases, error handling, business logic) needs human attention. Generated code can look correct and pass basic tests while being conceptually wrong. Sandbox execution is mandatory for safe autonomous loops. Covers: Running the Work, Conductor Mode, Orchestrator Mode, Build Loop, 80 Percent Problem.
