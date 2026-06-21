---
title: "Production Agents"
type: concept
aliases: ["production-agents", "Production Agents", "shipping agents", "agent deployment"]
parent: "[[scale|Scale]]"
path: "scale"
sources: ["[[production-agents|Part 7: Ship Production Agents]]"]
related:
  - "[[controlling-cost|Controlling Cost]]"
  - "[[team-standard|Team Standard]]"
tags: ["production-agents", "MCP", "A2A", "multi-agent", "scale"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Production Agents

> [!summary]
> Production Agents addresses building agents as products that serve real users — distinct from using agents to build software. The key decision is script vs. product: a product needs a substrate (persistent memory, scoped permissions, CI evals, full-run tracing). Multi-agent coordination scales through shared state → MCP → A2A.

## Definition

Production Agents is the practice of shipping agents as products with real users, as opposed to using agents as developer tools. The distinction determines how much infrastructure must be built beneath the agent.

## The Most Important Question

Before writing anything: **Is this a script or a product?**

| Type | Description | Infrastructure |
|------|-------------|----------------|
| **Script** | One-off automation, personal tool, prototype — the agent is the destination | A coding agent in your terminal is enough |
| **Product** | Something real users depend on — the agent is the product | Needs substrate: tools, memory, eval, deployment |

> [!warning]
> Conflating the two is how prototypes ship by accident. Be explicit about which one you're building before writing anything.

## What a Production Agent Needs That a Script Doesn't

When real users depend on the agent, four requirements stop being optional:

| Requirement | Why It Matters |
|-------------|----------------|
| **Persistent memory** | Agent doesn't start from zero every session — state carries over |
| **Scoped permissions** | Each tool and data source has the minimum access it needs |
| **Eval coverage in CI** | Regressions are caught before they ship (same as Part 3, applied to the agent itself) |
| **Full-run tracing** | Production behavior is auditable (same as Part 5, applied to the agent itself) |

Building these *after* launch creates an unmaintainable, untrustworthy system.

## Keeping One Workflow From Prototype to Production

The same terminal-based workflow that builds a prototype reaches all the way to production. A **skills bundle** gives the existing coding agent the full lifecycle without a new SDK:

```text
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

Behind that conversation: scaffold from template → write code → generate evals → run evals → deploy → report. The prototype that ran on a laptop becomes the production agent serving users without a rewrite.

## Going Multi-Agent

When one agent isn't enough, coordination uses three mechanisms at increasing scales:

| Mechanism | Use When |
|-----------|----------|
| **Shared session state** | Simple cases where agents need the same context |
| **MCP (Model Context Protocol)** | Standard way agents access tools and external services |
| **A2A (Agent2Agent)** | One agent delegating work to another agent |

Common patterns: planner → specialists, parallel workers on different parts of a job, reviewer agent checking a builder agent.

> [!note]
> The bottleneck in multi-agent systems shifts from writing implementation to specifying what each agent should do and verifying it did it — the same theme as the rest of the guide, one level up.

## Related Concepts

- [[controlling-cost|Controlling Cost]] — production substrate has cost implications; skills bundles manage it
- [[team-standard|Team Standard]] — production agents need the eval gates and harness practices from Part 8
