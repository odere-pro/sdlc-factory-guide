---
title: Controlling Cost
page_class: concept
source: "[[Source: Part 6 — Control Cost]]"
sources:
  - "[[controlling-cost|Part 6: Control Cost]]"
  - "[[context-engineering|Part 2: Engineer the Context]]"
  - "[[checklist|Implementation Checklist]]"
tags: [scale, cost, token-economy, model-routing, TCO, first-pass-success]
related:
  - "[[context-engineering|Context Engineering]]"
  - "[[rule-file|Rule File]]"
  - "[[team-standard|Team Standard]]"
parent: "[[scale|Scale]]"
path: scale/
---

# Controlling Cost

Controlling cost in an AI engineering workflow means measuring total cost of ownership — not shipping speed — and applying three levers: first-pass success rate, model routing by task complexity, and dynamic context to minimize per-request token spend.

## Definition

The usual question about AI development is how fast you can ship. The better question is what it costs to own. Velocity hides the real economics. The honest metric is total cost of ownership, and in an AI workflow it is dominated by the token economy.

## Key Principles

**The hidden debt of going fast.** Ad-hoc prompting looks almost free. The bill arrives later and compounds: token burn from unstructured prompts generating expensive retry loops; maintenance tax from inconsistent generated code requiring reverse-engineering six months on; and security remediation when fast generation becomes fast vulnerability generation. The structured approach inverts this — higher upfront investment in schemas, tests, and context, sharply lower marginal cost per feature.

**Lever one: first-pass success.** The cheapest token is one not spent on a retry. A dense, high-signal rule file (see [[rule-file|Rule File]]) and well-managed context (see [[context-engineering|Context Engineering]]) raise the agent's first-pass success rate, cutting the trial-and-error loops that burn money. Context engineering is both a quality practice and a cost-control practice.

**Lever two: model routing.** In an ad-hoc workflow, one big frontier model handles everything — paying premium prices to fix a typo or generate boilerplate. A designed workflow routes by task complexity:

| Task type | Model |
|---|---|
| Architecture, hard design | Frontier — maximum reasoning needed |
| Complex initial implementation | Frontier — high-stakes, ambiguous |
| Test generation | Cheap / small — deterministic, well-specified |
| First-pass code review | Cheap / small — pattern matching |
| CI / monitoring checks | Cheap / small — repetitive, narrow |

**Lever three: dynamic context and skills.** Loading everything statically means paying for it on every call. Pushing task-specific knowledge into on-demand skills keeps the per-request payload small. At scale, the difference between "everything always loaded" and "only what's needed" is the difference between a viable cost structure and an unviable one.

**The levers compound.** If first-pass success goes from 40% to 80% after rule-file investment, each task that previously needed ~2.5 attempts now needs ~1.25 — roughly half the tokens for the same output. Apply model routing on top (cheap models for test generation and review, which may be half of all calls) and the cost curve bends hard.

## Examples

A minimal routing configuration:

```yaml
routing:
  default: small-fast
  rules:
    - match: ["architecture", "design", "migration plan"]
      model: frontier
    - match: ["write tests", "lint", "review diff", "ci check"]
      model: small-fast
    - match: ["implement feature"]
      model: frontier
```

## Related Concepts

- [[context-engineering|Context Engineering]] — skills and dynamic context are the third cost lever; static vs dynamic context determines per-request cost.
- [[rule-file|Rule File]] — a tight rule file is the primary first-pass success lever.
- [[team-standard|Team Standard]] — cost measurement and model routing become team infrastructure once standardized.
