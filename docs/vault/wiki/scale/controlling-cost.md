---
title: "Controlling Cost"
type: concept
aliases: ["controlling-cost", "Controlling Cost", "TCO", "token economy", "cost control"]
parent: "[[scale|Scale]]"
path: "scale"
sources: ["[[controlling-cost|Part 6: Control Cost]]"]
related:
  - "[[production-agents|Production Agents]]"
  - "[[team-standard|Team Standard]]"
tags: ["cost-control", "token-economy", "model-routing", "tco", "scale"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Controlling Cost

> [!summary]
> The honest metric in AI development is total cost of ownership (TCO), dominated by the token economy. Three levers control it: raising first-pass success (fewer retry loops = fewer wasted tokens), routing tasks to appropriately-priced models, and using dynamic context/skills to avoid paying for unused context on every call. The structured approach has higher upfront investment but sharply lower marginal cost per feature.

## Definition

Controlling Cost is the practice of measuring and managing total cost of ownership in an AI development workflow — moving beyond raw velocity to track the full economics including token burn, maintenance tax, and security remediation costs.

## The Hidden Debt of Ad-Hoc Prompting

Ad-hoc prompting looks almost free. The bill arrives later and compounds:

| Debt Type | Mechanism |
|-----------|-----------|
| **Token burn** | Dumping unstructured files into context + asking the model to fix unverified mistakes creates expensive retry loops |
| **Maintenance tax** | Inconsistent generated code means engineers spend days reverse-engineering "spaghetti" nobody designed |
| **Security remediation** | Without eval harnesses, fast code generation becomes fast vulnerability generation — fixing in production costs far more than at design time |

The structured approach inverts this: higher upfront cost, sharply lower marginal cost per feature.

## Three Cost Levers

### Lever 1: First-Pass Success

The cheapest token is the one not spent on a retry. A tight rule file and well-managed context (from the Foundation phase) raise first-pass success directly.

> [!note]
> Context engineering is not only a quality practice — it is a cost-control practice. The same tight rule file that improves output also reduces spend.

Going from 40% to 80% first-pass success roughly **halves token spend** before any model routing is applied.

### Lever 2: Route by Task

Using one big frontier model for everything pays premium prices to fix typos and generate boilerplate. A designed workflow routes by task complexity:

| Task Type | Model |
|-----------|-------|
| Architecture, hard design | Frontier — needs maximum reasoning |
| Complex initial implementation | Frontier — high-stakes, ambiguous |
| Test generation | Small/cheap — deterministic, well-specified |
| Code review (first pass) | Small/cheap — pattern matching |
| CI / monitoring checks | Small/cheap — repetitive, narrow |

A simple routing config:

```yaml
routing:
  default: small-fast
  rules:
    - match: ["architecture", "design", "migration plan"]
      model: frontier
    - match: ["write tests", "lint", "review diff", "ci check"]
      model: small-fast
```

Stack routing on top of first-pass improvement and the OpEx curve bends hard.

### Lever 3: Dynamic Context and Skills

Loading everything statically means paying for it on every call. Pushing task-specific knowledge into on-demand skills keeps the per-request payload small.

At scale, the difference between "everything always loaded" and "only what's needed" is the difference between a viable cost structure and an unviable one.

## The Measurement Practice

Stop measuring only speed. Track:
- Token spend per shipped feature
- First-pass success rate
- Cost distribution by model tier

Compare before and after the investment in rule files, routing, and skills — the upfront investment should show up as a lower ongoing bill.

## Related Concepts

- [[production-agents|Production Agents]] — production substrate adds cost but skills bundles control it
- [[team-standard|Team Standard]] — the eval gate and harness-as-code practices reinforce cost discipline
