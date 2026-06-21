---
title: "Part 4: Run the Work"
type: source
source_type: article
source_format: text
author: "Oleksandr Derechei"
publisher: "SDLC Factory Guide"
date_published: 2026-06-18
date_ingested: 2026-06-22
tags: ["running-the-work", "conductor", "orchestrator", "agent-modes", "build-loop"]
aliases: []
sources: []
created: 2026-06-22
updated: 2026-06-22
status: active
confidence: 1.0
---

# Part 4: Run the Work

## Metadata

- **Source file:** `raw/wired/sdlc-factory-guide/running-the-work.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **URL:** https://odere-pro.github.io/sdlc-factory-guide/running-the-work

## Summary

Describes the two operating modes (conductor and orchestrator) and three agent locations (editor, terminal, background) that govern how developers interact with agents daily. Also covers the 80% problem: agents produce most of a feature quickly, but the remaining 20% — edge cases, business rules, integration points — requires human judgment and is where production failures live.

## Key Claims

- Conductor mode: real-time, hands-on in the editor; best for complex logic, debugging, unfamiliar code.
- Orchestrator mode: async, delegate-and-review; best for well-specified work like bug fixes, migrations, test generation.
- Orchestrator mode demands specification, decomposition, evaluation, and system design skills — not just syntax fluency.
- Three agent locations: editor (inline/in-flow), terminal (multi-file run-and-react), background (paragraph-spec walk-away).
- Code execution should happen inside a sandbox with scoped tool access.
- The 80% problem: agents generate the happy path quickly; the remaining 20% contains the business rules and edge cases that cause production failures.

Covers: Conductor Mode, Orchestrator Mode, Agent Locations, 80% Problem, Sandbox Execution
