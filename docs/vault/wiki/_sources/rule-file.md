---
title: "Part 1: Set Up the Rule File"
type: source
source_type: article
source_format: text
author: "Oleksandr Derechei"
publisher: "SDLC Factory Guide"
date_published: 2026-06-18
date_ingested: 2026-06-22
tags: ["rule-file", "CLAUDE.md", "agent-configuration", "foundation"]
aliases: []
sources: []
created: 2026-06-22
updated: 2026-06-22
status: active
confidence: 1.0
---

# Part 1: Set Up the Rule File

## Metadata

- **Source file:** `raw/wired/sdlc-factory-guide/rule-file.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **URL:** https://odere-pro.github.io/sdlc-factory-guide/rule-file

## Summary

Describes the rule file (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`) as the single highest-leverage investment in an agentic workflow. It is an onboarding document for the agent — encoding the project's stack, conventions, hard rules, and workflow so the agent never has to infer them from scratch.

## Key Claims

- Output quality depends more on what the agent knows about the project than on prompt phrasing.
- A rule file has four required parts: stack and versions, conventions, hard rules, and workflow.
- The file should be grown iteratively by adding one rule each time the agent misbehaves — not written perfectly up front.
- The rule file is also where tool definitions live: which APIs and scripts the agent can call, and when.
- Architecture decisions belong to the human; the agent implements them. The rule file makes that boundary explicit.
- Commit the rule file to version control so every session and every team member shares it.

Covers: Rule File, CLAUDE.md, Agent Configuration, Foundation
