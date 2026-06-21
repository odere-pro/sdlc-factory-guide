---
title: "Part 2: Engineer the Context"
type: source
source_type: article
source_format: text
author: "Oleksandr Derechei"
publisher: "SDLC Factory Guide"
date_published: 2026-06-18
date_ingested: 2026-06-22
tags: ["context-engineering", "skills", "dynamic-context", "tokens"]
aliases: []
sources: []
created: 2026-06-22
updated: 2026-06-22
status: active
confidence: 1.0
---

# Part 2: Engineer the Context

## Metadata

- **Source file:** `raw/wired/sdlc-factory-guide/context-engineering.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **URL:** https://odere-pro.github.io/sdlc-factory-guide/context-engineering

## Summary

Context engineering is the discipline of deciding what information an agent sees, and when. The article separates context into static (always loaded, expensive) and dynamic (loaded on demand, efficient) buckets and introduces "skills" as the primary pattern for dynamic context via progressive disclosure.

## Key Claims

- Static context is always loaded (system instructions, rule files, global memory); dynamic context is loaded only when needed (skills, tool results, retrieved docs, recent history).
- Excess static context both wastes money and dilutes the signal — important rules drown in noise.
- Skills use progressive disclosure: at startup only metadata is loaded; full instructions load when a task matches; heavy reference loads only if needed.
- Six categories of context to manage: Instructions, Knowledge, Memory, Examples, Tools, Guardrails.
- Real codebase examples teach the agent style faster than generic prose descriptions.
- Pasting an entire repository into a prompt is both expensive and counterproductive — retrieval should surface what's relevant.

Covers: Context Engineering, Static Context, Dynamic Context, Skills, Progressive Disclosure, Token Economy
