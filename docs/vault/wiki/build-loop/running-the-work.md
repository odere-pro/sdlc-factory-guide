---
title: Running the Work
page_class: process
source: "[[Source: Part 4 — Run the Work]]"
sources:
  - "[[running-the-work|Part 4: Run the Work]]"
  - "[[checklist|Implementation Checklist]]"
tags: [build-loop, conductor-mode, orchestrator-mode, sandbox, 80-percent-problem, agent-modes]
related:
  - "[[verification|Verification]]"
  - "[[review-and-ship|Review and Ship]]"
  - "[[context-engineering|Context Engineering]]"
parent: "[[build-loop|Build Loop]]"
path: build-loop/
---

# Running the Work

Running the work means choosing the right mode — conductor for real-time steering, orchestrator for async delegation — and matching the agent location to the task, while reserving the last 20% of every feature for human judgment.

## Overview

With a rule file, engineered context, and verification in place, the next question is how to execute. Two decisions govern quality: which mode are you in, and which kind of agent fits the task. Using the wrong mode for the task type is a common source of frustration.

## Key Principles

**Conductor mode** is real-time and hands-on. The engineer watches code appear in the editor, steers with prompts and corrections, and understands every change as it is made. Best for: complex logic, tricky debugging, unfamiliar codebases — anywhere step-by-step understanding matters. The risk: treating everything as conductor work makes the engineer the bottleneck and eliminates the speed-up.

**Orchestrator mode** is asynchronous and high-level. The engineer defines a goal, hands it to an agent, and reviews the outcome rather than the keystrokes. Best for: well-specified work — bug fixes, migrations, test generation, features following an established pattern. The catch: orchestrator mode requires *more* discipline upfront, not less. A precise spec must exist before delegation is possible. The payoff arrives on the second task.

Orchestrator mode rewards different skills than syntax fluency: specification (defining tasks precisely enough an agent can execute without guessing), decomposition (breaking work into agent-sized units), evaluation (judging output quality quickly), and system design (building the constraints and feedback loops that keep agents productive).

**Three agent locations.** Editor agents work in-flow, inline with writing. Terminal agents handle multi-file work where the agent runs tools and reacts to results. Background agents run autonomously in a sandbox for hours and deliver a PR to review. The right starting point is the task, not the tool that claims the most autonomy.

**Sandbox execution.** When the agent executes code — running tests, trying fixes, reading files — it does so inside an isolated sandbox with a defined, limited tool set. This is what makes the autonomous think-act-observe loop safe: the agent can try things and fail without reaching anything it should not touch.

**The 80% problem.** An agent generates roughly 80% of a feature quickly. The remaining 20% — edge cases, error handling, integration points, subtle correctness — needs domain context the model lacks. And this 20% is exactly where production failures live. Early AI errors were obvious syntax mistakes; today's are conceptual: a wrong assumption about business logic, a missed edge case, an architectural choice that quietly accumulates maintenance debt. They are hard to catch because the code looks right and may pass basic tests.

The developers who do well do not try to go faster by accepting everything. They use the agent for the well-specified 80% and apply their own attention to the 20% that needs judgment.

## Examples

A missing-20% example — the agent's output passes the happy-path test but carries implicit business rules no test captures:

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)
```

The missing 20%: Can `percent` exceed 100? Is `price` integer cents or a float? What currency rounding applies? Should a 100% discount be allowed, or does that signal a bug upstream? None of these are visible in the code — they are business rules the engineer holds and the model does not.

## Related Concepts

- [[verification|Verification]] — the spec that makes orchestrator-mode delegation safe; tests give the agent an unambiguous target.
- [[review-and-ship|Review and Ship]] — the step that follows; human review covers the 20% the agent cannot.
- [[context-engineering|Context Engineering]] — skills and dynamic context are the mechanism that loads the right knowledge for the task the agent is executing.
