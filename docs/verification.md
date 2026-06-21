---
id: verification
title: "Part 3 — Build Verification"
description: Tests as the deterministic contract and evals for non-deterministic behavior — the quality flywheel that compounds.
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 3 — Build Verification',
      description: 'Tests as the deterministic contract and evals for non-deterministic behavior — the quality flywheel that compounds.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/verification',
      },
    })}
  </script>
</head>

# Part 3 — Build verification

Here's the line that decides whether you're doing real engineering or just gambling: **how do your outputs get verified?** If the answer is "I run it and it seems to work," you're vibe coding, no matter how sophisticated your prompts are. Verification is the discipline that makes AI output trustworthy at production stakes.

Two mechanisms work together. Tests cover what's deterministic. Evals cover what isn't.

## Tests: the deterministic contract

Tests verify the parts of your system where a given input must produce a given output. They're the same tests you'd write anyway — but in an AI workflow they take on a second job: **they communicate intent to the agent more precisely than any prompt.**

A test is a specification a machine can check. Hand the agent a failing test and "make this pass," and you've given it an unambiguous target plus an automatic way to know when it's done. So write them *first*:

```python
def test_refund_over_threshold_requires_approval():
    charge = make_charge(amount=600_00)
    with pytest.raises(ApprovalRequired):
        refund_service.issue(charge.id, amount=600_00, approved_by=None)

def test_refund_writes_ledger_entry():
    charge = make_charge(amount=50_00)
    refund_service.issue(charge.id, amount=50_00, approved_by="alice")
    assert ledger.last_entry().type == "refund"
```

The agent now knows the threshold rule and the ledger requirement without you explaining them in prose. The test *is* the explanation.

## Evals: judging the non-deterministic parts

Tests can't cover everything, because a lot of agent behavior isn't deterministic. Did the agent take a sensible path to the answer? Did it pick the right tools? Is the final output actually good, not just syntactically valid? That's what **evals** measure.

Evals are checked with labelled datasets, scoring rubrics, and sometimes a model acting as a judge. There are two flavors, and you need both:

- **Output evaluation** — judges the final artifact. Does the code compile? Do the tests pass? Is the summary accurate?
- **Trajectory evaluation** — judges *how it got there*. Did the agent call the right tools in a reasonable order, or did it flail and stumble into a passing result?

Trajectory matters more than it looks. A fluent output that skipped its verification steps is *more* dangerous than one with an obvious error, because it hides the risk. An agent that happened to produce correct code while ignoring the test suite will eventually produce incorrect code the same way.

## A concrete eval rubric

For an agent that answers questions from your docs, an eval set is a list of cases plus a rubric:

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

Each run scores: did it mention the required facts, avoid the forbidden ones, and follow the expected tool path? A model judge can grade the softer "is this answer clear and correct" dimension against a rubric you write. The point is that "good" is now defined explicitly and checked automatically — not eyeballed.

## The quality flywheel

Tests and evals reach their full value when you wire them into a loop that compounds:

1. **Evaluate** against your benchmark suite.
2. **Diagnose** failures by clustering them into root causes (not fixing one-offs).
3. **Optimize** the prompt, rule, or tool that caused the cluster.
4. **Verify** the fix against a regression suite so it stays fixed.
5. **Monitor** production traffic for new failure modes, and feed them back into step 1.

Each turn of this loop makes the next one start from a higher baseline. This is how an agent gets reliably better over time without changing the model underneath it.

## Set up your own workflow

- [ ] For your next feature, write the tests before you let the agent generate code.
- [ ] Build a small eval set — even ten cases — for one agent behavior you care about.
- [ ] For each eval case, define both what the output must contain and what tool path you expect.
- [ ] Add a regression suite that re-runs every fix.
- [ ] Pick one production failure this week, find its root-cause cluster, and fix the cause not the symptom.
