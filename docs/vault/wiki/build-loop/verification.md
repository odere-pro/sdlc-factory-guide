---
title: "Verification"
type: concept
aliases: ["verification", "Verification", "tests and evals", "build verification"]
parent: "[[build-loop|Build Loop]]"
path: "build-loop"
sources: ["[[_sources/verification|Part 3: Build Verification]]"]
related:
  - "[[build-loop/running-the-work|Running the Work]]"
  - "[[build-loop/review-and-ship|Review and Ship]]"
tags: ["verification", "testing", "evals", "quality", "build-loop"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Verification

> [!summary]
> Verification is what separates engineering from vibe coding. Two mechanisms work together: tests for deterministic behavior (written before code generation, serving as machine-checkable specs) and evals for non-deterministic agent behavior (output quality + trajectory). These compound into a quality flywheel that improves with each iteration.

## Definition

Verification is the systematic process of confirming that AI-generated code and agent behavior meets a defined quality standard. It is the mechanism that makes AI output trustworthy at production stakes.

> [!important]
> If the answer to "how do your outputs get verified?" is "I run it and it seems to work," that is vibe coding — regardless of how sophisticated the prompts are.

## Tests: The Deterministic Contract

Tests verify the parts of the system where a given input must produce a defined output. In an agentic workflow, tests take on a second job: **they communicate intent to the agent more precisely than prose.**

### Write Tests First

Hand the agent a failing test with "make this pass" and you've provided:
- An unambiguous target
- An automatic signal for when it's done
- The business rules encoded as executable specification

```python
def test_refund_over_threshold_requires_approval():
    charge = make_charge(amount=600_00)
    with pytest.raises(ApprovalRequired):
        refund_service.issue(charge.id, amount=600_00, approved_by=None)
```

The agent now knows the approval threshold rule without any prose explanation.

## Evals: Judging Non-Deterministic Parts

Many aspects of agent behavior cannot be tested deterministically. Evals use labeled datasets, scoring rubrics, and sometimes a model-as-judge to assess:

### Two Flavors of Evals

| Type | What It Measures |
|------|-----------------|
| **Output evaluation** | Does the final artifact meet requirements? (compiles, tests pass, content is accurate) |
| **Trajectory evaluation** | Did the agent take a sensible path? Did it call the right tools in the right order? |

> [!warning]
> Trajectory evaluation is more important than it appears. A fluent output that skipped verification steps is **more dangerous** than an obvious error — it hides the risk. An agent that produces correct code while ignoring tests will eventually produce incorrect code the same way.

### A Concrete Eval Rubric

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]
  tool_path: ["search_docs"]
```

Each case defines: required facts, forbidden content, expected tool path. "Good" is explicitly defined and automatically checked — not eyeballed.

## The Quality Flywheel

The full value of tests and evals emerges when wired into a compounding loop:

1. **Evaluate** against the benchmark suite
2. **Diagnose** by clustering failures into root causes (not fixing one-offs)
3. **Optimize** the prompt, rule, or tool responsible for the failure cluster
4. **Verify** the fix holds against a regression suite
5. **Monitor** production for new failure modes → feed back into step 1

Each turn raises the baseline. This is how an agent improves over time without changing the model.

## Related Concepts

- [[build-loop/running-the-work|Running the Work]] — verification feeds directly into the run loop
- [[build-loop/review-and-ship|Review and Ship]] — observability closes the feedback cycle
