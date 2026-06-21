---
title: "Part 7: Ship Production Agents"
type: source
source_type: article
source_format: text
author: "Oleksandr Derechei"
publisher: "SDLC Factory Guide"
date_published: 2026-06-18
date_ingested: 2026-06-22
tags: ["production-agents", "MCP", "A2A", "multi-agent", "scale"]
aliases: []
sources: []
created: 2026-06-22
updated: 2026-06-22
status: active
confidence: 1.0
---

# Part 7: Ship Production Agents

## Metadata

- **Source file:** `raw/wired/sdlc-factory-guide/production-agents.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **URL:** https://odere-pro.github.io/sdlc-factory-guide/production-agents

## Summary

Addresses building agents as products (not just tools for building software). The key distinction is script vs. product: a product serving real users needs a substrate — persistent memory, scoped permissions, CI evals, and full-run observability. Multi-agent coordination uses shared state, MCP, and A2A at increasing scales of complexity.

## Key Claims

- The most important early decision: "is this a script or a product?" — conflating them is how prototypes ship by accident.
- Production agents need four things scripts don't: persistent memory, scoped permissions, CI eval coverage, and full-run tracing.
- A skills bundle keeps the prototype-to-production workflow in one place — no separate stack to learn.
- Multi-agent coordination ladder: shared session state (simple) → MCP for tool access → A2A for agent-to-agent delegation.
- The bottleneck in multi-agent systems shifts to specification (what each agent should do) and verification (did it do it).

Covers: Production Agents, Script vs Product, Persistent Memory, Scoped Permissions, MCP, A2A, Multi-Agent
