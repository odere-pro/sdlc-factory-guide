---
id: checklist
title: Implementation Checklist
description: Complete actionable checklist for setting up an agentic engineering workflow — from rule files to team standards.
sidebar_position: 2
keywords: [checklist, implementation, setup, agentic engineering, AI development]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Implementation Checklist',
      description: 'Complete actionable checklist for setting up an agentic engineering workflow — from rule files to team standards.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/checklist',
      },
    })}
  </script>
</head>

# Agentic Engineering — Implementation Checklist

## Contents

1. [Set up the rule file](#1-set-up-the-rule-file)
2. [Engineer the context](#2-engineer-the-context)
3. [Build verification](#3-build-verification)
4. [Run the work](#4-run-the-work)
5. [Review and ship](#5-review-and-ship)
6. [Control cost](#6-control-cost)
7. [Ship production agents](#7-ship-production-agents)
8. [Make it a team standard](#8-make-it-a-team-standard)

---

## 1. Set up the rule file

- [ ] Create a `CLAUDE.md` / `AGENTS.md` in the repo root. Start with 10 lines.
- [ ] Cover four things:
  - [ ] Stack and versions
  - [ ] Conventions (folder structure, naming, patterns you actually use)
  - [ ] Hard rules the agent must never break (forbidden packages, secrets handling, layering)
  - [ ] Workflow to follow before generating code
- [ ] Add a new rule every time the agent does something you don't want repeated.
- [ ] List the tools the agent may call and when to use each (APIs, scripts, DB schemas).
- [ ] Make architecture decisions yourself; let the agent implement them, not choose them.

## 2. Engineer the context

- [ ] Decide what is **static** (always loaded) vs **dynamic** (loaded on demand):
  - [ ] Static: rule files, system instructions, global memory
  - [ ] Dynamic: skills, tool results, retrieved docs, recent history
- [ ] Keep static context short and high-signal. Cut anything the agent doesn't need every call.
- [ ] Move repeatable know-how into skills that load only when the task matches.
- [ ] Never paste a whole repo into the prompt. Retrieve what's relevant.

## 3. Build verification

- [ ] Write tests before generating the feature. Tests are the spec.
- [ ] Write evals for the non-deterministic parts:
  - [ ] Did the agent take a sensible path?
  - [ ] Did it pick the right tools?
  - [ ] Does the output meet the quality bar?
- [ ] Check both the result (compiles, tests pass) and the trajectory (how it got there).
- [ ] Set up the feedback loop:
  - [ ] Run against a benchmark suite
  - [ ] Cluster failures by root cause
  - [ ] Fix the prompt or tool that caused them
  - [ ] Re-run a regression suite
  - [ ] Monitor production for new failures

## 4. Run the work

- [ ] Pick a mode per task:
  - [ ] **Conductor** (real-time, in-IDE) for complex logic, debugging, unfamiliar code
  - [ ] **Orchestrator** (async, delegate and review) for bug fixes, migrations, test generation
- [ ] Pick the agent location per task:
  - [ ] Editor agent — in-flow edits and suggestions
  - [ ] Terminal agent — multi-file work, run-and-react
  - [ ] Background agent — paragraph-spec tasks you can walk away from
- [ ] Run code generation inside a sandbox, using only approved tools.
- [ ] Handle the last 20% yourself: edge cases, error handling, integration points, business logic. The code that "looks right" is where the bugs hide.

## 5. Review and ship

- [ ] Use the agent as a first-pass reviewer (bugs, style, security, performance).
- [ ] Review every line that ships:
  - [ ] Be skeptical of clever code
  - [ ] Confirm imported packages are real
  - [ ] Check error handling for realistic failures
- [ ] Add hooks at commit/edit points (e.g. block commits with hard-coded secrets).
- [ ] Turn on observability: traces, eval results, token/latency/cost, drift.
- [ ] Point the agent at legacy work you've been avoiding: refactors, migrations, deprecated APIs.

## 6. Control cost

- [ ] Measure total cost of ownership, not just speed.
- [ ] Raise first-pass success with a tight rule file to avoid retry loops.
- [ ] Route models by task:
  - [ ] Frontier models for architecture and hard implementation
  - [ ] Cheap models for test generation, review, CI monitoring
- [ ] Use dynamic context and skills so you only pay for tokens you need.

## 7. Ship production agents

- [ ] Decide what you're building:
  - [ ] A script — the agent is the endpoint
  - [ ] A product for real users — the agent needs a substrate
- [ ] For products, add: persistent memory, scoped permissions, eval coverage in CI, full-run tracing.
- [ ] Use a skills bundle so your existing coding agent handles build → evaluate → deploy → observe.
- [ ] For multi-agent setups, coordinate via shared state, MCP for tools, A2A for delegation.

## 8. Make it a team standard

- [ ] Version rule files, prompts, eval suites, and skills. Review them in PRs. Assign owners.
- [ ] Gate shipping on a passing eval suite with a clear rubric, not a working demo.
- [ ] Train reviewers on how generated code fails.
- [ ] Make the prototype-vs-production boundary explicit (which repos, branches, environments).
- [ ] Build the harness once and keep refining it.
- [ ] Hire and promote for judgment: specification, evaluation, architecture.

---

### Reference

Based on [*The New SDLC With Vibe Coding*](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding) (Google).
