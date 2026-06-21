---
title: "Source: Part 2 — Engineer the Context"
page_class: concept
source: "[[raw/context-engineering.md]]"
tags: [source, context-engineering, skills, dynamic-context, tokens]
---

# Source: Part 2 — Engineer the Context

## Metadata

- **File:** `raw/context-engineering.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **Series position:** Part 2 of 8

## Summary

Defines context engineering as the discipline of deciding what the agent sees and when. Introduces the static/dynamic context taxonomy, the skills pattern for progressive disclosure, and six categories of context (instructions, knowledge, memory, examples, tools, guardrails). Argues that managing context is simultaneously a quality and a cost-control practice.

## Key Claims

Static context (system instructions, rule files, global memory) is always loaded — reliable but expensive. Dynamic context (skills, tool results, retrieval, recent history) loads on demand — efficient. Skills enable progressive disclosure: metadata first, full instructions on match, heavy reference only on demand. A 2,000-token rule file times 50 requests = 100,000 tokens — moving unused half to skills eliminates that cost on 49 requests. Never dump the whole repository into the prompt; use retrieval. Six context categories: instructions, knowledge, memory, examples, tools, guardrails. Covers: Context Engineering, Skills, Static Context, Dynamic Context, Controlling Cost.
