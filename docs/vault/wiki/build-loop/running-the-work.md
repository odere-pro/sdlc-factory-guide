---
title: "Running the Work"
type: concept
aliases: ["running-the-work", "Running the Work", "conductor orchestrator", "agent modes"]
parent: "[[build-loop|Build Loop]]"
path: "build-loop"
sources: ["[[_sources/running-the-work|Part 4: Run the Work]]"]
related:
  - "[[build-loop/verification|Verification]]"
  - "[[build-loop/review-and-ship|Review and Ship]]"
tags: ["running-the-work", "conductor", "orchestrator", "agent-modes", "build-loop"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Running the Work

> [!summary]
> Running the Work covers two decisions that determine how well agentic coding goes: which mode (conductor vs. orchestrator) and which agent location (editor, terminal, background). The central warning is the 80% problem — agents generate the bulk of a feature quickly, but the remaining 20% containing edge cases, business rules, and integration points is exactly where production failures live and must be owned by the developer.

## Definition

Running the Work is the practice of matching the operating mode and agent location to each task — choosing between hands-on real-time control and async delegation, and between editor, terminal, and background agents.

## Two Operating Modes

### Conductor Mode

Real-time, hands-on. The developer stays in the editor, watches code appear, steers with prompts and corrections, and understands each change as it's made.

| Aspect | Detail |
|--------|--------|
| **Best for** | Complex logic, tricky debugging, unfamiliar codebases |
| **Risk** | If you direct every keystroke, *you* become the bottleneck and speed gains disappear |

### Orchestrator Mode

Asynchronous, higher-level. Define a goal, delegate to an agent, review the outcome.

| Aspect | Detail |
|--------|--------|
| **Best for** | Well-specified work: bug fixes, migrations, test generation, pattern-following features |
| **Requires** | A precise spec before delegation; the payoff comes on the second task, not the first |

**Skills orchestrator mode demands (not syntax fluency):**
- Specification — define precisely enough that an agent can execute without guessing
- Decomposition — break big work into agent-sized units
- Evaluation — judge output quality quickly
- System design — build constraints and feedback loops that keep agents productive

## Three Agent Locations

| Location | Where | Best For |
|----------|-------|----------|
| **Editor** | Inline completion + in-place chat (Copilot, Cursor, Windsurf) | In-flow writing, staying in the zone |
| **Terminal** | Launch agent with a goal in plain language (Claude Code, Codex CLI) | Multi-file work, run-and-react |
| **Background** | Autonomous sandbox → PR for review (Jules, Copilot agent mode) | Paragraph-spec tasks you can walk away from |

The right starting point is always **the task**, not whichever tool claims the most autonomy.

## Sandbox Execution

When the agent executes code — running tests, trying a fix, reading files — it should do so inside an isolated sandbox with a defined, limited set of tools and access. This makes the "think → act → observe" loop safe: the agent can try things and fail without touching anything it shouldn't.

## The 80% Problem

> [!warning]
> This is the primary risk of agentic development.

Agents generate roughly 80% of a feature quickly. The remaining 20% — edge cases, error handling, integration points, subtle correctness — needs deep context the model usually lacks. And this is exactly where production failures live.

Early AI errors were obvious syntax mistakes. Today's errors are **conceptual**: wrong assumptions about business logic, missed edge cases, architectural choices that quietly accumulate maintenance debt. They are hard to catch because **the code looks right and may even pass basic tests**.

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)

# The missing 20%: Can percent exceed 100? Is price integer cents or float?
# What currency rounding applies? Should 100% discount be allowed?
```

The developers who do well use agents for the well-specified 80% and spend their own attention on the 20% that needs judgment.

## Related Concepts

- [[build-loop/verification|Verification]] — tests define the spec that makes delegation safe
- [[build-loop/review-and-ship|Review and Ship]] — the review step that catches what the 80% missed
