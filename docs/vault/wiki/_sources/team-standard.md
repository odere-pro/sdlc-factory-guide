---
title: "Source: Part 8 — Make It a Team Standard"
page_class: process
source: "[[raw/team-standard.md]]"
tags: [source, team-standard, harness, eval-gates, hiring, engineering-culture]
---

# Source: Part 8 — Make It a Team Standard

## Metadata

- **File:** `raw/team-standard.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **Series position:** Part 8 of 8

## Summary

Addresses the team-level failure mode of harness drift — individual rule files diverging, agent behavior becoming irreproducible. Argues that the harness (rule files, system prompts, eval suites, skill libraries) must be versioned, reviewed in PRs, and assigned owners. Establishes eval-gated CI as the standard for shipping agents, defines the prototype-production boundary, and reframes hiring to weight specification and evaluation over implementation speed.

## Key Claims

AI amplifies the engineering culture it lands in — strong tests and standards produce dramatically better outcomes. Harness drift is the team-level failure mode: rule files diverge, behavior becomes irreproducible. Treat rule files, system prompts, evals, and skills as shared infrastructure: version, PR-review, and assign owners. Gate on passing eval suites (rubric with task success, tool-use quality, trajectory compliance, hallucination rate, response quality), not demos. Demo proves an agent can succeed once; eval suite proves it succeeds reliably. CI gate example: YAML blocking merge on eval regression below 0.9. Re-train reviewers for generated-code failure modes — old human-code checklist is insufficient. Draw the prototype/production boundary explicitly: repos, branches, environments. Build the shared harness once, compound it across projects. Hire and promote for specification, evaluation, and system design over raw implementation speed. Covers: Team Standard, Eval Gates, Harness as Code, Hiring for Judgment, Scale.
