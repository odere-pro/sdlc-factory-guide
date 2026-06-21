---
id: intro
title: The Agentic Engineering Workflow
description: A practical, eight-part guide to moving from ad-hoc AI prompting to a disciplined workflow you can rely on in production.
sidebar_position: 1
slug: /
keywords: [agentic engineering, AI workflow, software development, SDLC, vibe coding]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'The Agentic Engineering Workflow',
      description: 'A practical, eight-part guide to moving from ad-hoc AI prompting to a disciplined workflow you can rely on in production.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/',
      },
    })}
  </script>
</head>

# The Agentic Engineering Workflow

A practical, eight-part guide to moving from ad-hoc AI prompting to a disciplined workflow you can rely on in production. Each part is self-contained: read it, copy the examples, and set up that piece of your own workflow.

The thread running through all eight: **your real output is no longer code — it's the system that produces code.** The model is one small part of that system. Everything you build around it (rules, context, tests, review, observability) is what determines whether the output is trustworthy.

## How the workflow works

```mermaid
flowchart LR
  subgraph FOUND["Foundation — what the agent knows"]
    direction TB
    P1["1 · Rule file<br/>stack · conventions · hard rules · workflow"]:::node
    P2["2 · Engineer the context<br/>static vs dynamic · skills · retrieval"]:::node
    P1 --> P2
  end
  subgraph LOOP["The build loop"]
    direction TB
    P3["3 · Verification<br/>tests = spec · evals = trajectory"]:::node
    P4["4 · Run the work<br/>conductor / orchestrator · own the last 20%"]:::node
    P5["5 · Review and ship<br/>agent first-pass · hooks · observability"]:::node
    FB["feedback loop<br/>evaluate → diagnose → optimize → verify → monitor"]:::loop
    P3 --> P4 --> P5
    P5 -.-> FB -.-> P3
  end
  subgraph SCALE["Make it economical and scale"]
    direction TB
    P6["6 · Control cost<br/>first-pass success · route by task"]:::node
    P7["7 · Production agents<br/>memory · scoped perms · evals in CI · MCP"]:::node
    P8["8 · Team standard<br/>harness as code · gate on evals · hire for judgment"]:::node
    P6 --> P7 --> P8
  end
  FOUND ==> LOOP ==> SCALE
  classDef node fill:#e8f8f0,stroke:#169873,color:#14241e;
  classDef loop fill:#e7f0fb,stroke:#5aa6f0,color:#14241e;
  style FOUND fill:transparent,stroke:#169873,color:#169873;
  style LOOP fill:transparent,stroke:#169873,color:#169873;
  style SCALE fill:transparent,stroke:#169873,color:#169873;
```

## The series

1. **[Set up the rule file](/rule-file)** — give the agent the project knowledge a new teammate would need.
2. **[Engineer the context](/context-engineering)** — control what the agent sees, and when.
3. **[Build verification](/verification)** — tests and evals as the contract with the AI.
4. **[Run the work](/running-the-work)** — conductor vs orchestrator, and where agents fit in your day.
5. **[Review and ship](/review-and-ship)** — catch the failures that "look right."
6. **[Control cost](/controlling-cost)** — total cost of ownership and model routing.
7. **[Ship production agents](/production-agents)** — from a prototype script to a product with a substrate.
8. **[Make it a team standard](/team-standard)** — version the harness, gate on evals, hire for judgment.

## How to use this

- **Solo developer?** Parts 1–6 are enough to transform your daily workflow. Start with Part 1.
- **Building an AI product?** Add Part 7.
- **Leading a team?** Parts 1–8, with extra weight on 3, 5, and 8.

---

Source: [*The New SDLC With Vibe Coding*](https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding) (Google)
