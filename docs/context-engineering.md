---
id: context-engineering
title: "Part 2 — Engineer the Context"
description: Control what the agent sees and when — static vs dynamic context, skills for progressive disclosure, and cost-aware design.
sidebar_position: 4
keywords: [context engineering, dynamic context, skills, tokens, prompt design]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 2 — Engineer the Context',
      description: 'Control what the agent sees and when — static vs dynamic context, skills for progressive disclosure, and cost-aware design.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/context-engineering',
      },
    })}
  </script>
</head>

# Part 2 — Engineer the context

Context engineering is the skill that separates fast AI output from *useful* AI output. The rule file from Part 1 is one piece of it. This part is about the bigger discipline: deciding what the agent sees, and when.

The mental shift is away from "how do I phrase this to trick the model into good code?" and toward "what would a new teammate need to know to contribute well, and how do I hand it to them efficiently?"

## The two buckets: static and dynamic

Every piece of context falls into one of two buckets, and choosing the bucket is a real engineering decision with a real cost.

**Static context** is always loaded, on every single request:

- System instructions
- Rule files (`CLAUDE.md` and friends)
- Global memory and persona

It's reliable — the agent never forgets it — but expensive, because you pay for every token of it on every call, whether or not the current task needs it.

**Dynamic context** is loaded only when needed:

- Skills triggered by the task at hand
- Tool results pulled during execution
- Documents retrieved from a search index
- The recent slice of conversation history

It's efficient — you pay only when the information is actually relevant.

The trap at both extremes: too much static context wastes money and *dilutes the signal* (the important rules drown in noise), while too little means the agent forgets things it needed. Treat the static/dynamic line like any other architectural decision — reviewed and versioned, not accidental.

## A quick cost intuition

Say your rule file is 2,000 tokens and you make 50 requests in a session. That's 100,000 tokens of rule file alone, paid 50 times over. If half of that file is reference material only relevant to one task, you're burning money on 49 requests that didn't need it. Move that half into a skill that loads on demand and the cost disappears for the other 49.

This is why "keep static context dense and high-signal" is not a style preference — it's a line item.

## Skills: the pattern for dynamic context

The most effective way to manage the dynamic bucket is a **skill**: a self-contained package of procedural knowledge the agent loads only when a task matches it.

Skills work through *progressive disclosure* — three layers, loaded lazily:

1. At startup, the agent sees only lightweight metadata (a name and a one-line description).
2. When a task matches, it loads the full instructions.
3. Only if it needs the depth does it pull in heavy reference material.

The result: a lightweight generalist agent can carry dozens of specialist capabilities while paying the token cost for only the one it's actively using.

A minimal skill looks like this:

```markdown
---
name: stripe-refunds
description: How to issue and reconcile refunds through our billing layer. Use when a task involves refunds, chargebacks, or payment reversals.
---

# Issuing a refund

1. Look up the charge via `billing.get_charge(charge_id)`.
2. Refunds over $500 require an `approved_by` field — never auto-approve.
3. Call `billing.refund(charge_id, amount, approved_by)`.
4. Write a `RefundRecord` to the ledger in the same transaction.
5. Emit a `refund.issued` event.

See `reference/refund-edge-cases.md` for partial refunds and currency conversion.
```

The agent only reads this when a task actually mentions refunds. The rest of the time it costs nothing but the one-line description.

## The six kinds of context to manage

When you're deciding what to provide, think across six categories. Most workflows under-invest in the middle four.

- **Instructions** — the agent's role, goals, and boundaries (your rule file).
- **Knowledge** — docs, architecture diagrams, domain data.
- **Memory** — what just happened (session), and what the project is (long-term).
- **Examples** — reference patterns *from your own codebase*, not generic ones off the internet.
- **Tools** — precise definitions of the APIs and scripts the agent can call.
- **Guardrails** — hard constraints and safety rules.

The "examples" one is worth calling out: a single example pulled from your real code teaches the agent your style faster than three paragraphs of description.

## Don't paste the whole repo

A common failure is dumping an entire 100,000-token repository into the prompt "so it has everything." This is both expensive and counterproductive — the relevant signal gets buried. Retrieve the few files that matter for the current task instead, and let the agent ask for more. Whole-codebase awareness is the tool's job (indexing, retrieval), not something you do by hand every prompt.

## Set up your own workflow

- [ ] List everything currently in your static context. For each item, ask: does *every* task need this?
- [ ] Move task-specific material out of the rule file and into skills.
- [ ] Write your first skill for a recurring specialized task (a refund flow, a migration pattern, a report format).
- [ ] Add a few real examples from your codebase to the rule file or a skill.
- [ ] Stop pasting whole files; let retrieval surface what's relevant.
