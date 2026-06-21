---
title: Production Agents
page_class: concept
source: "[[raw/production-agents.md]]"
sources:
  - "[[production-agents|Part 7: Ship Production Agents]]"
  - "[[checklist|Implementation Checklist]]"
tags: [scale, production-agents, MCP, A2A, persistent-memory, scoped-permissions, multi-agent]
related:
  - "[[verification|Verification]]"
  - "[[context-engineering|Context Engineering]]"
  - "[[team-standard|Team Standard]]"
parent: "[[scale|Scale]]"
path: scale/
---

# Production Agents

A production agent is an AI agent serving real users as a product — requiring persistent memory, scoped permissions, CI eval coverage, and full-run observability that one-off script agents do not need.

## Definition

When the thing being built *is* an agent — a customer support bot, a research assistant, an internal monitoring tool — the engineering requirements shift. These are not scripts run once; they are products that serve real users and need a substrate beneath them.

## Key Principles

**The first question: script or product?** Before writing anything, answer one sentence: "this is a script" or "this is a product." Conflating them is how prototypes ship by accident.

- A **script** is a one-off automation, a personal tool, a prototype. The agent is the destination. Standard coding-agent tools are enough.
- A **product** serves real users. The agent now needs its own tools, memory, evaluation, and deployment infrastructure.

**The four extras that become non-negotiable.** For a product, four capabilities stop being optional:

1. **Persistent memory** across sessions — the agent does not start from zero every time.
2. **Scoped permissions** on every tool and data source — the agent reaches only what it should.
3. **Eval coverage in CI** — regressions are caught before they ship (see [[verification|Verification]]).
4. **Full-run observability** — production behavior is auditable (see [[review-and-ship|Review and Ship]]).

For a script none of this is worth the effort. For a product, building it after launch instead of before is how you create an unmaintainable, untrustworthy system.

**One workflow from prototype to production.** The same terminal-based workflow that produces a prototype can reach all the way to a deployed product. A skills bundle (see [[context-engineering|Context Engineering]]) gives the existing coding agent the full lifecycle: scaffold, write, evaluate, deploy, wire up observability — without a separate SDK or stack.

**Multi-agent coordination.** When one agent is not enough, three coordination mechanisms compose at different scales:

- **Shared session state** — for simple cases where agents need to see the same context.
- **MCP (Model Context Protocol)** — the standard way agents access tools and external services.
- **A2A (Agent2Agent)** — for one agent delegating work to another.

These compose into whatever pattern fits: a planner handing subtasks to specialists, parallel workers on different parts of a job, a reviewer agent checking a builder agent. The bottleneck in multi-agent systems moves from implementation to specification and verification — the same theme as the rest of the workflow, one level up.

## Examples

The end-to-end production workflow can look like a single conversation:

```text
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

Behind that, the agent scaffolds from a template, writes code, generates an eval set, runs it, deploys, and reports back.

## Related Concepts

- [[verification|Verification]] — eval coverage in CI is one of the four required substrate elements.
- [[context-engineering|Context Engineering]] — skills bundles are what keep the prototype-to-production path in a single workflow.
- [[team-standard|Team Standard]] — the prototype/production boundary (repos, branches, environments) must be explicitly drawn at the team level.
