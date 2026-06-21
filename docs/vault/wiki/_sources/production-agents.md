---
title: "Source: Part 7 — Ship Production Agents"
page_class: concept
source: "raw/production-agents.md"
tags: [source, production-agents, MCP, A2A, deployment, multi-agent]
---

# Source: Part 7 — Ship Production Agents

## Metadata

- **File:** `raw/production-agents.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **Series position:** Part 7 of 8

## Summary

Distinguishes between agents as scripts (one-off automation) and agents as products (serving real users). Defines the four non-negotiable substrate elements for production agents: persistent memory, scoped permissions, CI eval coverage, and full-run observability. Shows how a skills bundle keeps the prototype-to-production path in one workflow without a stack rewrite. Covers multi-agent coordination via shared state, MCP, and A2A.

## Key Claims

The most useful pre-build question: is this a script or a product? Conflating them causes prototypes to ship by accident. Production agents require four extras scripts do not: persistent memory, scoped permissions on every tool, eval coverage in CI, and run tracing. Skills bundles let existing coding agents handle the full lifecycle: scaffold, write, evaluate, deploy, observe. Multi-agent coordination: shared session state for simple cases, MCP for tool/service access, A2A for agent-to-agent delegation. The bottleneck in multi-agent systems is specification and verification, not implementation. Covers: Production Agents, MCP, A2A, Persistent Memory, Scale.
