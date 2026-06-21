---
title: Review and Ship
page_class: process
source: "[[raw/review-and-ship.md]]"
sources:
  - "[[review-and-ship|Part 5: Review and Ship]]"
  - "[[checklist|Implementation Checklist]]"
tags: [build-loop, code-review, hooks, observability, shipping, generated-code]
related:
  - "[[verification|Verification]]"
  - "[[running-the-work|Running the Work]]"
  - "[[team-standard|Team Standard]]"
parent: "[[build-loop|Build Loop]]"
path: build-loop/
---

# Review and Ship

Review and ship is the phase where the engineer shifts from author to reviewer — using the agent for a mechanical first pass, applying specific suspicion to generated code failure modes, encoding critical rules as commit hooks, and standing up observability before production traffic starts.

## Overview

When an agent writes 80% of the code, the engineer's role becomes primarily judgmental. The work shifts from typing to judging, and the judging must be sharper than before because generated code fails in quieter ways than human code. The reflex to trust code because it runs is exactly the wrong reflex for AI-generated output.

## Key Principles

**Agent first-pass review.** Use the agent as a first-pass reviewer before a human looks at anything. It catches the mechanical layer efficiently: likely bugs, style violations, security smells, performance issues. This clears noise so the human reviewer spends attention on what actually needs a human — design, maintainability, whether the change fits the system's direction. First-pass review is mechanical and can be delegated. Final design judgment is not.

**Review failure modes for generated code.** Apply suspicion at the specific points where AI output fails, not at the generic places human code fails:
- *Clever abstractions.* Generated code sometimes reaches for a slick abstraction where a boring one was correct. Clever is a flag.
- *Hallucinated imports.* Models generate plausible-sounding package names. An import that looks right can be a package that does not exist — or a malicious squat on a name the model commonly invents.
- *Thin error handling.* Generated code covers the happy path well and failure paths poorly. Ask what happens when the network call times out, the input is empty, the row is missing.

**Hooks.** Some rules are too important to rely on review for. Encode them as hooks — deterministic code that runs at fixed lifecycle points (before a tool call, after a file edit, before a commit) and blocks bad actions automatically. Unlike a rule in a file, a hook cannot be argued past. A pre-commit secret-blocker is the canonical starting point.

**Observability.** You cannot manage what you cannot see. As agents take on more work, track: traces of each run (the full sequence of steps and tool calls), eval results over time (quality regressions surface early), token cost and latency (a workflow that quietly got expensive shows up), and drift (behavior shifting without an obvious cause). Without observability a misbehaving agent is a black box.

**Legacy maintenance.** The same capable review-and-ship workflow can be pointed at work that has been deferred for years. Legacy code that was too risky to touch — only its original authors understood it — is high-value agent work: read the code, infer patterns, find relevant files, make changes that respect what is there. Framework migrations, deprecated-API updates, and old test-suite modernization become well-specified background tasks with reviewable PRs at the end.

## Examples

A minimal pre-commit hook blocking hard-coded secrets:

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'"'"'"][^"'"'"']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

## Related Concepts

- [[verification|Verification]] — eval results feed directly into the observability loop; the quality flywheel connects them.
- [[running-the-work|Running the Work]] — review handles the 20% the agent could not; observability covers what happens after.
- [[team-standard|Team Standard]] — shared review checklists for generated-code failure modes are the team-standard form of this discipline.
