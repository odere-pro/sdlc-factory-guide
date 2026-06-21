---
title: "Part 6: Control Cost"
type: source
source_type: article
source_format: text
author: "Oleksandr Derechei"
publisher: "SDLC Factory Guide"
date_published: 2026-06-18
date_ingested: 2026-06-22
tags: ["cost-control", "token-economy", "model-routing", "tco", "scale"]
aliases: []
sources: []
created: 2026-06-22
updated: 2026-06-22
status: active
confidence: 1.0
---

# Part 6: Control Cost

## Metadata

- **Source file:** `raw/wired/sdlc-factory-guide/controlling-cost.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **URL:** https://odere-pro.github.io/sdlc-factory-guide/controlling-cost

## Summary

The honest metric in AI development is total cost of ownership (TCO), dominated by token economy. Three levers control it: raising first-pass success rate (fewer retries), routing tasks to appropriately-priced models, and using dynamic context (skills) to avoid paying for unused context on every call.

## Key Claims

- Ad-hoc prompting looks free but carries hidden debt: token burn from retry loops, maintenance tax from inconsistent generated code, and security remediation costs.
- The structured approach inverts this: higher upfront investment, much lower marginal cost per feature.
- Lever 1 (first-pass success): a tight rule file and managed context reduce retry loops — context engineering is also a cost-control practice.
- Lever 2 (model routing): use frontier models for architecture and hard implementation; cheap models for test generation, code review, and CI checks.
- Lever 3 (dynamic context/skills): loading everything statically is financially unviable at scale; on-demand skills keep per-request payload small.
- Going from 40% to 80% first-pass success roughly halves token spend before any model routing is applied.

Covers: TCO, Token Economy, Model Routing, First-Pass Success, Dynamic Context, Cost Control
