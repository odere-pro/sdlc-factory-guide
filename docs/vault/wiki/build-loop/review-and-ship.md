---
title: "Review and Ship"
type: concept
aliases: ["review-and-ship", "Review and Ship", "code review", "shipping"]
parent: "[[build-loop|Build Loop]]"
path: "build-loop"
sources: ["[[_sources/review-and-ship|Part 5: Review and Ship]]"]
related:
  - "[[build-loop/verification|Verification]]"
  - "[[build-loop/running-the-work|Running the Work]]"
tags: ["review", "shipping", "hooks", "observability", "build-loop"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Review and Ship

> [!summary]
> When agents write 80% of code, the developer role shifts from author to reviewer. Three reinforcing practices govern the review and shipping phase: using the agent as a mechanical first-pass reviewer, encoding hard rules as hooks that run deterministically at lifecycle points, and standing up observability to audit and improve agent behavior over time.

## Definition

Review and Ship is the phase in the build loop where generated code is validated, hard rules are enforced mechanically, and the pipeline is made observable. It closes the feedback loop back into verification.

## Let the Agent Take the First Pass

The agent is well-suited for mechanical review:
- Catching likely bugs
- Flagging style violations
- Identifying security smells
- Spotting performance issues

This clears the noise so the human reviewer can focus on what needs a human: design fitness, maintainability, architectural direction.

> [!important]
> The split matters: first-pass review is mechanical and can be delegated. Final judgment about design is not.

## Review Generated Code With the Right Suspicion

> [!warning]
> Trusting code because it runs is exactly the wrong reflex for generated code.

Review every line going to production, aimed at generated code's specific failure modes:

| Failure Mode | What to Look For |
|-------------|-----------------|
| **Clever abstractions** | Slick solutions where a boring one was correct — flag these |
| **Hallucinated imports** | Plausible-sounding packages that don't exist, or malicious squats |
| **Weak error handling** | Happy path covered well; failure paths poorly — check timeouts, empty inputs, missing rows |

The cost of skipping this: code no one understands becomes debugging cost no one can afford. Fast generation savings evaporate on the first three-day reverse-engineering session.

## Hooks: Encode Rules Deterministically

Some rules are too important to rely on review for. **Hooks** are deterministic code that runs at fixed lifecycle points (before a tool call, after a file edit, before a commit) and blocks bad actions automatically.

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit — block hard-coded secrets
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'"'"'][^"'"'"']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

Unlike a rule in a file, a hook cannot be talked past.

## Observability

You can't manage what you can't see. Track:

- **Traces** — full sequence of steps and tool calls per run
- **Eval results** over time — quality regressions surface early
- **Token cost and latency** — quietly expensive workflows become visible
- **Drift** — behavior shifting over time without an obvious cause

Without observability, a misbehaving agent is a black box and the only debugging tool is guessing.

## The Legacy Win

> [!note]
> An underrated application of a capable agentic workflow.

Legacy code that was "too risky to touch" because only its original authors understood it is exactly where agents earn their keep. They can:
- Read the code and infer patterns
- Find the relevant files across a large codebase
- Make changes that respect what's there

Framework migrations, deprecated-API updates, and test suite modernization — work that nobody wanted to spend a quarter on — become scoped, well-specified background tasks with reviewable PRs at the end.

## Related Concepts

- [[build-loop/verification|Verification]] — observability feeds back into the quality flywheel
- [[build-loop/running-the-work|Running the Work]] — the review step follows the run step and catches the 20% the agent missed
