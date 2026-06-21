---
title: "Implementation Checklist"
type: concept
aliases: ["implementation-checklist", "Implementation Checklist", "agentic engineering checklist"]
parent: "[[reference|Reference]]"
path: "reference"
sources: ["[[checklist|Agentic Engineering — Implementation Checklist]]"]
related: []
tags: ["checklist", "implementation", "reference", "agentic-engineering"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Implementation Checklist

> [!summary]
> A single actionable checklist condensing the entire eight-part agentic engineering guide. Organized into eight sections matching the guide parts. Use this as a quick-reference implementation roadmap, from setting up the rule file on day one through team standardization. Each section corresponds to a major wiki topic area.

## 1. Set Up the Rule File

- [ ] Create a `CLAUDE.md` / `AGENTS.md` in the repo root — start with 10 lines
- [ ] Cover four things: stack/versions, conventions, hard rules, workflow
- [ ] Add a new rule every time the agent does something you don't want repeated
- [ ] List the tools the agent may call and when to use each
- [ ] Make architecture decisions yourself; let the agent implement them

## 2. Engineer the Context

- [ ] Decide what is **static** (always loaded) vs **dynamic** (on demand): static = rule files, system instructions, global memory; dynamic = skills, tool results, retrieved docs, recent history
- [ ] Keep static context short and high-signal — cut anything not needed every call
- [ ] Move repeatable know-how into skills that load only when the task matches
- [ ] Never paste a whole repo into the prompt — retrieve what's relevant

## 3. Build Verification

- [ ] Write tests before generating the feature — tests are the spec
- [ ] Write evals for the non-deterministic parts: did the agent take a sensible path? did it pick the right tools? does the output meet the quality bar?
- [ ] Check both the result (compiles, tests pass) and the trajectory (how it got there)
- [ ] Set up the feedback loop: evaluate → cluster failures → fix prompt/tool → re-run regression → monitor production

## 4. Run the Work

- [ ] Pick a mode per task: **Conductor** (real-time, in-IDE) for complex logic/debugging; **Orchestrator** (async, delegate-and-review) for bug fixes, migrations, test generation
- [ ] Pick the agent location per task: editor (in-flow), terminal (multi-file), background (walk-away)
- [ ] Run code generation inside a sandbox using only approved tools
- [ ] Handle the last 20% yourself: edge cases, error handling, integration points, business logic

## 5. Review and Ship

- [ ] Use the agent as a first-pass reviewer (bugs, style, security, performance)
- [ ] Review every line that ships — be skeptical of clever code, confirm imports are real, check error handling for realistic failures
- [ ] Add hooks at commit/edit points (e.g., block commits with hard-coded secrets)
- [ ] Turn on observability: traces, eval results, token/latency/cost, drift
- [ ] Point the agent at legacy work being avoided: refactors, migrations, deprecated APIs

## 6. Control Cost

- [ ] Measure total cost of ownership, not just speed
- [ ] Raise first-pass success with a tight rule file to avoid retry loops
- [ ] Route models by task: frontier for architecture and hard implementation; cheap models for test generation, review, CI monitoring
- [ ] Use dynamic context and skills so you only pay for tokens you need

## 7. Ship Production Agents

- [ ] Decide what you're building: a script (agent is endpoint) or a product (agent needs substrate)
- [ ] For products, add: persistent memory, scoped permissions, eval coverage in CI, full-run tracing
- [ ] Use a skills bundle so your existing coding agent handles build → evaluate → deploy → observe
- [ ] For multi-agent setups: coordinate via shared state, MCP for tools, A2A for delegation

## 8. Make It a Team Standard

- [ ] Version rule files, prompts, eval suites, and skills — review in PRs — assign owners
- [ ] Gate shipping on a passing eval suite with a clear rubric, not a working demo
- [ ] Train reviewers on how generated code fails
- [ ] Make the prototype-vs-production boundary explicit: repos, branches, environments
- [ ] Build the harness once and keep refining it
- [ ] Hire and promote for judgment: specification, evaluation, architecture

---

> [!note] Source
> Based on [*The New SDLC With Vibe Coding*](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding) (Google), as distilled in the SDLC Factory Guide.
