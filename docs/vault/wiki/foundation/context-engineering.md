---
title: "Context Engineering"
type: concept
aliases: ["context-engineering", "Context Engineering", "context management"]
parent: "[[foundation|Foundation]]"
path: "foundation"
sources: ["[[context-engineering|Part 2: Engineer the Context]]"]
related:
  - "[[rule-file|Rule File]]"
  - "[[agentic-engineering-workflow|Agentic Engineering Workflow]]"
depends_on:
  - "[[rule-file|Rule File]]"
tags: ["context-engineering", "skills", "dynamic-context", "tokens", "foundation"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Context Engineering

> [!summary]
> Context engineering is the discipline of deciding what an AI agent sees, and when. It separates context into static (always loaded, costs tokens on every call) and dynamic (loaded on demand, efficient) buckets. The primary pattern for dynamic context is the "skill" — a self-contained knowledge package that loads via progressive disclosure only when a task matches. Getting context right improves both quality and cost simultaneously.

## Definition

Context engineering is the practice of architecting the information an AI agent receives across each request. It is distinct from prompt engineering (phrasing a single request) — it is about designing the information architecture of an entire workflow.

## The Two Buckets

### Static Context

Always loaded, on every request:

- System instructions
- Rule files (`CLAUDE.md` and equivalents)
- Global memory and persona

**Trade-off:** reliable (agent never forgets it), but expensive — every token is paid for on every call, whether or not the current task needs it. Too much static context also dilutes signal: important rules drown in noise.

### Dynamic Context

Loaded only when needed:

- Skills triggered by the current task
- Tool results retrieved during execution
- Documents surfaced by a search index
- The recent slice of conversation history

**Trade-off:** efficient (pay only when relevant), but requires deliberate design to ensure the right context loads at the right time.

> [!important]
> The static/dynamic split is an architectural decision that should be reviewed and versioned, not left to accumulate by accident.

## Skills: The Pattern for Dynamic Context

A **skill** is a self-contained package of procedural knowledge that loads via progressive disclosure:

1. **At startup** — only lightweight metadata (name + one-line description) is visible
2. **When a task matches** — the full instructions load
3. **Only if deeper detail is needed** — heavy reference material pulls in

A generalist agent can carry dozens of specialist capabilities while paying the token cost for only the one currently active.

**Minimal skill structure:**

```markdown
---
name: stripe-refunds
description: How to issue refunds. Use when a task involves refunds or chargebacks.
---

# Issuing a refund
1. Look up the charge via billing.get_charge(charge_id).
2. Refunds over $500 require an approved_by field.
...
```

## The Six Context Categories

Most workflows under-invest in the middle four:

| Category | Content | Common Gap |
|----------|---------|------------|
| **Instructions** | Role, goals, boundaries (the rule file) | Over-invested |
| **Knowledge** | Docs, architecture diagrams, domain data | Often missing |
| **Memory** | Session history + long-term project memory | Often missing |
| **Examples** | Real patterns from your own codebase | Often missing |
| **Tools** | Precise API/script definitions | Often missing |
| **Guardrails** | Hard constraints and safety rules | Often thin |

> [!note] On Examples
> A single example pulled from your actual codebase teaches the agent your style faster than three paragraphs of description.

## Cost Dimension

Context engineering is not only a quality practice — it is a cost-control practice. A 2,000-token rule file paid 50 times per session is 100,000 tokens. Moving half of it into on-demand skills costs nearly nothing for the 49 requests that don't need it.

This is why "keep static context dense and high-signal" is a financial constraint, not a style preference.

## What Not To Do

Avoid pasting an entire repository into the prompt. Whole-codebase awareness is the tool's job (indexing, retrieval), not something you do by hand on every prompt. The relevant signal gets buried and the cost is unsustainable.

## Related Concepts

- [[rule-file|Rule File]] — the primary component of static context that context engineering optimizes
- [[agentic-engineering-workflow|Agentic Engineering Workflow]] — context engineering is Part 2 of the full workflow
