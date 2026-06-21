---
id: review-and-ship
title: "Part 5 — Review and Ship"
description: Agent as first-pass reviewer, review checklist for generated code, commit hooks, and observability for AI workflows.
sidebar_position: 7
keywords: [code review, shipping, observability, hooks, generated code]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 5 — Review and Ship',
      description: 'Agent as first-pass reviewer, review checklist for generated code, commit hooks, and observability for AI workflows.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/review-and-ship',
      },
    })}
  </script>
</head>

# Part 5 — Review and ship

When an agent writes 80% of your code, you become a reviewer more than an author. The work shifts from typing to judging — and the judging has to be sharper than it was, because generated code fails in quieter ways than human code.

## Let the agent take the first pass

Use the agent as a first-pass reviewer before a human looks at anything. It's good at the mechanical layer: catching likely bugs, style violations, security smells, and performance issues. This clears the noise so the human reviewer can spend attention on what actually needs a human — design, maintainability, whether this change fits the system's direction.

The split is the point. First-pass review is mechanical and can be delegated. Final judgment about design is not.

## Review every line that ships — with the right suspicion

The reflex to trust code because it runs is exactly the wrong reflex for generated code. Review every line that's going to production, and aim your suspicion at the specific ways AI output fails:

- **Be skeptical of clever code.** Generated solutions sometimes reach for a slick abstraction where a boring one was correct. Clever is a flag, not a compliment.
- **Confirm imports are real.** Models hallucinate plausible-sounding packages. An import that looks right can be a package that doesn't exist — or worse, a malicious squat on the name a model commonly invents.
- **Check error handling against realistic failures.** Generated code tends to cover the happy path well and the failure paths poorly. Ask what happens when the network call times out, the input is empty, the row is missing.

The cost of skipping this is concrete: code your team doesn't understand becomes debugging cost your team can't afford. The savings from fast generation evaporate the first time someone spends three days reverse-engineering a clever block nobody reviewed.

## Hooks: make the machine enforce the rules it forgets

Some rules are too important to rely on review for. Encode them as **hooks** — deterministic code that runs at fixed points in the lifecycle (before a tool call, after a file edit, before a commit) and blocks bad actions automatically.

A pre-commit hook that refuses to commit a hard-coded secret:

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'\''"][^"'\'']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

Hooks are where you put the things an agent (or a human) "should never forget but often does." Unlike a rule in a file, a hook can't be talked past.

## Observability: see what the agent actually did

You can't manage what you can't see. As agents take on more work, stand up observability so you can answer "what did it do, and why?" Track:

- **Traces** of each run — the full sequence of steps and tool calls.
- **Eval results** over time, so quality regressions surface early.
- **Token cost and latency**, so a workflow that quietly got expensive shows up.
- **Drift** — behavior shifting over time without an obvious cause.

Without this, a misbehaving agent is a black box and your only debugging tool is guessing.

## The underrated win: maintenance

Point your now-capable workflow at the work you've been avoiding. Legacy code that was "too risky to touch" because only its original authors understood it is exactly where an agent earns its keep: it can read the code, infer the patterns, find the relevant files, and make changes that respect what's there.

This unlocks work that previously never happened because it was too tedious and risky: framework migrations, deprecated-API updates, modernizing old test suites. A migration that no one wanted to spend a quarter on becomes a well-specified background task with a reviewable PR at the end.

## Set up your own workflow

- [ ] Add a first-pass review step (agent reviews the diff) before human review.
- [ ] Write a review checklist for generated code: clever abstractions, hallucinated imports, weak error handling.
- [ ] Add at least one hook — start with the secret-blocker above.
- [ ] Turn on tracing for agent runs and watch token cost and eval scores over time.
- [ ] Pick one "too risky to touch" piece of legacy code and give it to the agent as a scoped, reviewable task.
