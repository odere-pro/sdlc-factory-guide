---
title: "Source: Part 1 — Set Up the Rule File"
page_class: process
source: "[[raw/rule-file.md]]"
tags: [source, rule-file, CLAUDE-md, agent-config]
---

# Source: Part 1 — Set Up the Rule File

## Metadata

- **File:** `raw/rule-file.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **Series position:** Part 1 of 8

## Summary

Explains why a rule file (CLAUDE.md, AGENTS.md, GEMINI.md) is the highest-leverage investment in an agentic workflow. Argues that output quality depends more on project knowledge than prompt phrasing. Provides a full worked example for a Python/FastAPI/SQLAlchemy project. Covers a four-part structure (stack, conventions, hard rules, workflow), a grow-by-correction approach, tool declarations, and the principle that the engineer makes architecture decisions while the agent implements them.

## Key Claims

A rule file is an onboarding document for a model that cannot ask questions. Output quality depends on project knowledge, not prompt phrasing. Four-part structure: stack and versions, conventions, hard rules, workflow. Grow by adding one rule per observed misbehavior. Hard rules must be absolute — never soft suggestions. Tool declarations belong in the rule file too. Architecture must be authored by the engineer; the agent implements, not chooses. Covers: Rule File, Context Engineering, Foundation.
