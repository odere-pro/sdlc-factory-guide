---
id: running-the-work
title: "Part 4: Run the Work"
description: Conductor vs orchestrator modes and where agents fit — editor, terminal, and background — plus the 80% problem.
sidebar_position: 6
keywords: [agent modes, conductor, orchestrator, sandbox, code generation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 4: Run the Work',
      description: 'Conductor vs orchestrator modes and where agents fit — editor, terminal, and background — plus the 80% problem.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/running-the-work',
      },
    })}
  </script>
</head>

# Part 4: Run the work

You've got a rule file, engineered context, and verification in place. Now you actually do the work. The two questions that decide how well it goes: which *mode* are you in, and which *kind* of agent fits the task.

## Two modes: conductor and orchestrator

Most developers move between two modes throughout the day. They demand different skills, and using the wrong one for the task is a common source of frustration.

**Conductor mode** is real-time, hands-on. You're in the editor, watching code appear, steering with prompts and corrections, keeping fine-grained control. You understand every change as it's made.

- Best for: complex logic, tricky debugging, unfamiliar codebases — anywhere you need to understand each step.
- The risk: if you direct every keystroke, *you* become the bottleneck and the speed-up evaporates.

**Orchestrator mode** is asynchronous and higher-level. You define a goal, hand it to an agent, and review the outcome — not the keystrokes. Agents may run in the background, in parallel, on different parts of the codebase.

- Best for: well-specified work — bug fixes, migrations, test generation, features that follow an established pattern.
- The catch: it needs *more* discipline up front, not less. You have to write a precise spec before you can delegate. The payoff arrives on the second task, not the first.

Orchestrator mode rewards a different skill set than syntax fluency:

- **Specification** — define the task precisely enough that an agent can execute without guessing.
- **Decomposition** — break big work into agent-sized units.
- **Evaluation** — judge output quality quickly.
- **System design** — build the constraints and feedback loops that keep agents productive.

## Three places agents fit in your day

Cutting the same picture a different way, agents show up in three locations. Most people use all three.

- **In the editor** — inline completion and in-place chat, with whole-codebase awareness. This is where you stay in flow. (Copilot, Cursor, Windsurf, JetBrains AI.)
- **In the terminal** — you launch the agent, hand it a goal in plain language, and let it work across files, running tools and tests and reacting to results. This is where serious hands-on work happens. (Claude Code, Codex CLI, and similar.)
- **In the background** — the agent runs autonomously in a sandbox, sometimes for hours, and hands back a pull request to review later. (Jules, Copilot agent mode, Cursor background agents.)

The mapping is intuitive once you see it: editor agents fit *while you're writing*; terminal agents fit *multi-file exploration and run-and-react*; background agents fit *anything you can describe in a paragraph and walk away from*. The right starting point is the task, not whichever tool claims the most autonomy.

## Run inside a sandbox

When the agent executes code — running tests, trying a fix, reading files — it should do so inside an isolated sandbox with a defined, limited set of tools and access. This is what makes the autonomous "think → act → observe" loop safe: the agent can try things and fail without touching anything it shouldn't.

## The 80% problem (where it goes wrong)

An agent will generate roughly 80% of a feature fast. The remaining 20% — edge cases, error handling, integration points, subtle correctness — needs deep context the model usually lacks. And this is exactly where production failures live.

The danger has shifted. Early AI errors were obvious syntax mistakes. Today's errors are *conceptual*: a wrong assumption about business logic, a missed edge case, an architectural choice that quietly piles up maintenance debt. They're hard to catch precisely because **the code looks right and may even pass basic tests.**

Concretely:

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)
```

The missing 20% is everything the agent didn't know to ask: Can `percent` exceed 100? Is `price` an integer cents value or a float? What currency rounding applies? Should a 100% discount be allowed at all, or does that signal a bug upstream? None of these are visible in the code — they're business rules you hold and the model doesn't.

The developers who do well don't try to go faster by accepting everything. They use the agent for the well-specified 80% and spend their own attention on the 20% that needs judgment.

## Set up your own workflow

- [ ] Before a task, consciously pick conductor or orchestrator — and notice when you're conducting work you should have delegated.
- [ ] Match the agent location to the task: editor for in-flow, terminal for multi-file, background for walk-away.
- [ ] Make sure code execution happens in a sandbox with scoped access.
- [ ] For every feature, write down the 20% — the edge cases and business rules — and review those lines yourself, even if tests pass.
