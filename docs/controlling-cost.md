---
id: controlling-cost
title: "Part 6 — Control Cost"
description: Total cost of ownership in AI workflows — first-pass success, model routing by task, and dynamic context as cost control.
sidebar_position: 8
keywords: [cost control, token economy, model routing, TCO, AI cost]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 6 — Control Cost',
      description: 'Total cost of ownership in AI workflows — first-pass success, model routing by task, and dynamic context as cost control.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/controlling-cost',
      },
    })}
  </script>
</head>

# Part 6 — Control cost

The usual question about AI development is "how fast can we ship?" The better question is "what does this cost to own?" Velocity hides the real economics. The honest metric is total cost of ownership, and in an AI workflow that's dominated by one thing: the token economy.

## The hidden debt of going fast

Ad-hoc prompting looks almost free — a subscription and some casual prompts, near-zero upfront cost. The bill arrives later, and it compounds:

- **Token burn.** Dumping huge unstructured files into the context window and asking the model to fix its own unverified mistakes creates an expensive retry loop with a low first-pass success rate. Every failed attempt is tokens spent for nothing.
- **Maintenance tax.** Unstructured generated code lacks consistency. Six months on, an engineer spends days reverse-engineering "spaghetti" nobody designed.
- **Security remediation.** Without an evaluation harness, fast code generation becomes fast vulnerability generation. Fixing a flaw in production costs far more than catching it at design time.

The structured approach inverts this: you invest upfront in schemas, tests, and context, and the marginal cost of shipping and maintaining each feature drops sharply. Higher cost to build, much lower cost to own.

## Lever one: first-pass success

The cheapest token is the one you don't spend on a retry. A dense, high-signal rule file (Part 1) and well-managed context (Part 2) raise the agent's first-pass success rate, which directly cuts the trial-and-error loops that burn money. Context engineering isn't only a quality practice — it's a cost-control practice. The same tight `CLAUDE.md` that improves output also reduces spend.

Passing an entire 100,000-token repository into every prompt is financially unviable at scale. Retrieve what's relevant; pay for what you use.

## Lever two: route by task

In an ad-hoc workflow, you use one big frontier model for everything — paying premium prices to fix a typo or generate a boilerplate test. A designed workflow routes by task complexity:

- **Architecture, hard design** → Frontier model — needs maximum reasoning
- **Initial complex implementation** → Frontier model — high-stakes, ambiguous
- **Test generation** → Small / cheap model — deterministic, well-specified
- **Code review (first pass)** → Small / cheap model — pattern matching
- **CI / monitoring checks** → Small / cheap model — repetitive, narrow

A simple routing config makes this concrete:

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

Orchestrating a multi-model mix lets you hold output quality where it matters while driving down the cost of the deterministic majority of the work.

## Lever three: dynamic context and skills

Tie this back to Part 2. Loading everything statically means paying for it on every call. Pushing task-specific knowledge into skills that load on demand — and reaching tools through on-demand calls rather than baking everything into the prompt — keeps the per-request payload small. At scale, the difference between "everything always loaded" and "only what's needed" is the difference between a viable cost structure and an unviable one.

## A worked intuition

Suppose first-pass success goes from 40% to 80% after you invest in the rule file and a couple of skills. Tasks that used to need ~2.5 attempts now need ~1.25. That's half the tokens for the same output — before you've routed a single task to a cheaper model. Stack routing on top (cheap models handling test-gen and review, which might be half your calls) and the OpEx curve bends hard.

## Set up your own workflow

- [ ] Stop measuring only speed; start tracking token spend per shipped feature.
- [ ] Tighten your rule file specifically to raise first-pass success and kill retry loops.
- [ ] Set up model routing: cheap models for test-gen, review, and CI; frontier for architecture and hard implementation.
- [ ] Move task-specific context into on-demand skills so you're not paying for it every call.
- [ ] Compare cost-per-feature before and after — the upfront investment should show up as a lower ongoing bill.
