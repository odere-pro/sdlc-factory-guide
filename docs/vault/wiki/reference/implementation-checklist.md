---
title: Implementation Checklist
page_class: reference
source: "[[Source: Implementation Checklist]]"
sources:
  - "[[checklist|Implementation Checklist]]"
tags: [reference, checklist, implementation, setup]
related:
  - "[[agentic-workflow-overview|Agentic Workflow Overview]]"
  - "[[rule-file|Rule File]]"
  - "[[context-engineering|Context Engineering]]"
  - "[[verification|Verification]]"
  - "[[running-the-work|Running the Work]]"
  - "[[review-and-ship|Review and Ship]]"
  - "[[controlling-cost|Controlling Cost]]"
  - "[[production-agents|Production Agents]]"
  - "[[team-standard|Team Standard]]"
parent: "[[reference|Reference]]"
path: reference/
---

# Implementation Checklist

A flat, actionable task list for setting up the full agentic engineering workflow — eight sections, one per part of the guide, each with checkbox items to work through sequentially.

## Overview

This checklist is the companion to the eight-part series. Each section mirrors one guide part and can be used independently or in sequence. It is the fastest path from reading the guide to having each practice in place.

## Part 1: Set Up the Rule File

- [ ] Create `CLAUDE.md` / `AGENTS.md` in the repo root. Start with 10 lines.
- [ ] Cover four things: stack and versions, conventions, hard rules, workflow.
- [ ] Add a new rule every time the agent does something you do not want repeated.
- [ ] List tools the agent may call and when to use each.
- [ ] Make architecture decisions yourself; let the agent implement them.

## Part 2: Engineer the Context

- [ ] Decide what is static (always loaded) vs dynamic (loaded on demand).
- [ ] Keep static context short and high-signal. Cut anything the agent does not need every call.
- [ ] Move repeatable know-how into skills that load only when the task matches.
- [ ] Never paste a whole repo into the prompt. Retrieve what is relevant.

## Part 3: Build Verification

- [ ] Write tests before generating the feature. Tests are the spec.
- [ ] Write evals for non-deterministic parts: path taken, tools chosen, output quality.
- [ ] Check both the result (compiles, tests pass) and the trajectory (how it got there).
- [ ] Set up the quality flywheel: evaluate → diagnose → optimize → verify → monitor.

## Part 4: Run the Work

- [ ] Pick a mode per task: conductor (real-time, in-IDE) or orchestrator (async, delegate and review).
- [ ] Pick the agent location per task: editor, terminal, or background.
- [ ] Run code generation inside a sandbox with only approved tools.
- [ ] Handle the last 20% yourself: edge cases, error handling, integration points, business logic.

## Part 5: Review and Ship

- [ ] Use the agent as a first-pass reviewer (bugs, style, security, performance).
- [ ] Review every line that ships: skeptical of clever code, confirm imports are real, check error handling.
- [ ] Add hooks at commit/edit points (start with the secret-blocker).
- [ ] Turn on observability: traces, eval results, token/latency/cost, drift.
- [ ] Point the agent at legacy work you have been avoiding.

## Part 6: Control Cost

- [ ] Measure total cost of ownership, not just speed.
- [ ] Raise first-pass success with a tight rule file to avoid retry loops.
- [ ] Route models by task: frontier for architecture and hard implementation; cheap for test gen, review, CI.
- [ ] Use dynamic context and skills so you only pay for tokens you need.

## Part 7: Ship Production Agents

- [ ] Decide what you are building: script (agent is the endpoint) or product (real users depend on it).
- [ ] For products, add: persistent memory, scoped permissions, eval coverage in CI, full-run tracing.
- [ ] Use a skills bundle so your existing coding agent handles build → evaluate → deploy → observe.
- [ ] For multi-agent setups: shared state first, MCP for tools, A2A for delegation.

## Part 8: Make It a Team Standard

- [ ] Version rule files, prompts, eval suites, and skills. Review in PRs. Assign owners.
- [ ] Gate shipping on a passing eval suite with a clear rubric, not a working demo.
- [ ] Train reviewers on how generated code fails.
- [ ] Make the prototype-vs-production boundary explicit: repos, branches, environments.
- [ ] Build the shared harness once and keep refining it.
- [ ] Hire and promote for judgment: specification, evaluation, architecture.

## Related Concepts

- [[agentic-workflow-overview|Agentic Workflow Overview]] — the narrative guide this checklist accompanies.
- [[rule-file|Rule File]] — Part 1 detail.
- [[context-engineering|Context Engineering]] — Part 2 detail.
- [[verification|Verification]] — Part 3 detail.
- [[running-the-work|Running the Work]] — Part 4 detail.
- [[review-and-ship|Review and Ship]] — Part 5 detail.
- [[controlling-cost|Controlling Cost]] — Part 6 detail.
- [[production-agents|Production Agents]] — Part 7 detail.
- [[team-standard|Team Standard]] — Part 8 detail.
