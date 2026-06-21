---
id: production-agents
title: "Part 7 — Ship Production Agents"
description: From prototype script to production agent — persistent memory, scoped permissions, eval coverage, and multi-agent coordination.
sidebar_position: 9
keywords: [production agents, MCP, A2A, agent deployment, multi-agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 7 — Ship Production Agents',
      description: 'From prototype script to production agent — persistent memory, scoped permissions, eval coverage, and multi-agent coordination.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/production-agents',
      },
    })}
  </script>
</head>

# Part 7 — Ship production agents

Everything so far has been about using agents to build software. This part is about when the thing you're building *is* an agent — a customer support bot, a research assistant, an internal monitoring tool. These aren't scripts you run once; they're products that serve real users, and they need more underneath them.

## First, decide what you're actually building

The single most useful question before you start:

- **Is this a script?** A one-off automation, a personal tool, a prototype. The agent is the destination. A regular coding agent in your terminal is enough.
- **Is this a product?** Something real users depend on. The agent is now the product, and it needs a substrate beneath it: its own tools, memory, evaluation, and deployment infrastructure.

Conflating the two is how prototypes ship by accident. Be explicit about which one you're building before you write anything.

## What a production agent needs that a script doesn't

When real users depend on the agent, four things stop being optional:

- **Persistent memory** across sessions, so the agent doesn't start from zero every time.
- **Scoped permissions** on every tool and data source, so the agent can only reach what it should.
- **Eval coverage** running in CI, so regressions are caught before they ship (this is Part 3, applied to the agent itself).
- **Observability** that traces what the agent actually did, so production behavior is auditable (this is Part 5, applied to the agent itself).

For a one-off script none of this is worth the effort. For a product, building it *after* launch instead of before is how you end up with an unmaintainable, untrustworthy system.

## Keep one workflow from prototype to production

The shift that makes this practical: the same terminal-based workflow that produces a prototype now reaches all the way to a deployed product. You don't learn a separate stack to go to production. You describe what you want, and a skills bundle (the kind from Part 2) gives your existing coding agent the full lifecycle — scaffold, write, evaluate, deploy, wire up observability — without a new SDK.

The loop, end to end, looks like a conversation:

```
# one-time setup of the skills bundle, then, in your coding agent:
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

Behind that, the agent scaffolds the project from a template, writes the code, generates an eval set, runs it, deploys, and reports back. For people who prefer to drive directly, the same steps are available as plain CLI commands. The result: the prototype that ran on your laptop yesterday becomes the production agent serving users today, without a rewrite.

## Going multi-agent

When one agent isn't enough, coordination happens through three mechanisms, used at different scales:

- **Shared session state** — for simple cases where agents just need to see the same context.
- **MCP (Model Context Protocol)** — the standard way agents access tools and external services.
- **A2A (Agent2Agent)** — for one agent delegating work to another.

These compose into whatever pattern fits: a planner handing subtasks to specialists, parallel workers on different parts of a job, a reviewer agent checking a builder agent. The bottleneck moves from writing the implementation to specifying what each agent should do and verifying it did it — the same theme as the rest of this guide, one level up.

## Set up your own workflow

- [ ] For your next agent, write one sentence: "this is a script" or "this is a product." Let that decide how much substrate you build.
- [ ] If it's a product, add the four essentials: persistent memory, scoped permissions, CI evals, run tracing.
- [ ] Use a skills bundle so build → evaluate → deploy → observe stays in one workflow.
- [ ] If you need multiple agents, start with shared state; reach for MCP and A2A only when the coordination actually requires them.
