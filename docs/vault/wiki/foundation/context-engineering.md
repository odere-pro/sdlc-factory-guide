---
title: Context Engineering
page_class: concept
source: "[[raw/context-engineering.md]]"
sources:
  - "[[context-engineering|Part 2: Engineer the Context]]"
  - "[[controlling-cost|Part 6: Control Cost]]"
tags: [foundation, context-engineering, skills, dynamic-context, static-context, tokens]
related:
  - "[[rule-file|Rule File]]"
  - "[[controlling-cost|Controlling Cost]]"
  - "[[production-agents|Production Agents]]"
parent: "[[foundation|Foundation]]"
path: foundation/
---

# Context Engineering

Context engineering is the discipline of deciding what an AI agent sees and when — selecting which information to load on every request versus which to retrieve only when a task matches.

## Definition

The mental shift context engineering requires is away from "how do I phrase this to trick the model into good code?" and toward "what would a new teammate need to know to contribute well, and how do I hand it to them efficiently?" Every piece of context falls into one of two buckets, and choosing the bucket is a real engineering decision with a real cost.

## Key Principles

**Static versus dynamic context.** Static context is always loaded — system instructions, rule files, global memory. It is reliable but expensive: you pay for every token on every call regardless of whether the current task needs it. Dynamic context loads only when needed — skills triggered by the task, tool results, retrieved documents, recent history. It is efficient: you pay only when the information is relevant.

**The dilution trap.** Too much static context both wastes money and dilutes signal — important rules drown in noise. Too little means the agent forgets things it needed. Treat the static/dynamic split like any other architectural decision: reviewed, versioned, and deliberate.

**Cost is a design input.** A 2,000-token rule file times 50 requests is 100,000 tokens of rule-file content alone. If half that content is only needed for one task type, moving it to a skill eliminates the cost on the other 49 requests. Dense, high-signal static context is not a style preference — it is a line item.

**Never paste the whole repository.** Dumping a 100,000-token codebase into the prompt buries the relevant signal. Use retrieval to surface the few files that matter for the current task, and let the agent request more if it needs it.

**Six categories of context.** When designing what to provide, think across: Instructions (role, goals, boundaries), Knowledge (docs, architecture, domain data), Memory (session and long-term), Examples (real patterns from your codebase), Tools (precise API and script definitions), and Guardrails (hard constraints and safety rules). Most workflows under-invest in examples and tools.

## Examples

The skills pattern is the most effective way to manage dynamic context. A skill is a self-contained package of procedural knowledge that loads only when a task matches:

```markdown
---
name: stripe-refunds
description: How to issue and reconcile refunds through our billing layer. Use when a task involves refunds, chargebacks, or payment reversals.
---

# Issuing a refund

1. Look up the charge via `billing.get_charge(charge_id)`.
2. Refunds over $500 require an `approved_by` field — never auto-approve.
3. Call `billing.refund(charge_id, amount, approved_by)`.
```

Progressive disclosure — three layers, loaded lazily: metadata at startup, full instructions on match, heavy reference only if needed — lets a lightweight agent carry dozens of specialist capabilities while paying the token cost for only the one it is actively using.

## Related Concepts

- [[rule-file|Rule File]] — the static-context anchor; the rule file is one input to context engineering.
- [[controlling-cost|Controlling Cost]] — dynamic context and skills are one of the three primary cost-control levers.
- [[production-agents|Production Agents]] — production agents apply the same context-management discipline to the agents themselves.
