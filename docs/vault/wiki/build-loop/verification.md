---
title: Verification
page_class: concept
source: "[[Source: Part 3 — Build Verification]]"
sources:
  - "[[verification|Part 3: Build Verification]]"
  - "[[checklist|Implementation Checklist]]"
tags: [build-loop, verification, testing, evals, quality-flywheel]
related:
  - "[[running-the-work|Running the Work]]"
  - "[[review-and-ship|Review and Ship]]"
  - "[[team-standard|Team Standard]]"
parent: "[[build-loop|Build Loop]]"
path: build-loop/
---

# Verification

Verification is the combination of tests (for deterministic behavior) and evals (for non-deterministic agent behavior) that makes AI output trustworthy at production stakes.

## Definition

The dividing line between real engineering and vibe coding is how outputs get verified. Tests cover what is deterministic — a given input must produce a given output. Evals cover what is not deterministic — did the agent take a sensible path, pick the right tools, and produce output that is genuinely good rather than merely syntactically valid.

## Key Principles

**Write tests before generating code.** A test is a specification a machine can check. Hand the agent a failing test and "make this pass" and you have given it an unambiguous target with a built-in way to know when it is done. Prose prompts describing the same requirement are less precise and produce noisier output.

**Two kinds of evals: output and trajectory.** Output evaluation judges the final artifact — does the code compile, do the tests pass, is the summary accurate? Trajectory evaluation judges how the agent got there — did it call the right tools in a reasonable order, or did it flail and stumble into a passing result? Trajectory matters more than it appears: a fluent output that skipped its own verification steps is more dangerous than an obvious error because it hides the risk.

**Define rubrics explicitly.** Evals without a rubric measure nothing. A rubric specifies what the output must contain, what it must avoid, and what tool path the agent should have followed. A model judge can then grade the softer "is this answer clear and correct" dimension automatically.

**The quality flywheel.** Tests and evals reach their full value when wired into a loop:
1. Evaluate against a benchmark suite.
2. Diagnose failures by clustering them into root causes — fix the cause, not individual cases.
3. Optimize the prompt, rule, or tool responsible for the cluster.
4. Verify the fix with a regression suite.
5. Monitor production traffic for new failure modes and feed them back to step 1.

Each turn of the loop starts from a higher baseline. This is how an agent gets reliably better over time without any change to the underlying model.

## Examples

A rubric-based eval set for a docs-answering agent:

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]
  tool_path: ["search_docs"]

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

Each run checks: required facts mentioned, forbidden content absent, expected tool path followed. "Good" is now defined explicitly rather than eyeballed.

## Related Concepts

- [[running-the-work|Running the Work]] — verification provides the spec that makes orchestrator-mode delegation safe.
- [[review-and-ship|Review and Ship]] — human review is the final gate after verification; observability ties eval results into production monitoring.
- [[team-standard|Team Standard]] — eval suites gated in CI and scored against explicit rubrics are the team-standard form of this discipline.
