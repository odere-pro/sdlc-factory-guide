---
date: 2026-06-21
pipeline: ingest
sources: 10
status: approved
---

# Pipeline Plan — 2026-06-21

## Sources

10 raw sources from `docs/vault/raw/`:
- intro.md — 8-part workflow overview, audience guide
- checklist.md — master implementation checklist across all 8 parts
- rule-file.md — Part 1: CLAUDE.md / AGENTS.md setup
- context-engineering.md — Part 2: static vs dynamic context, skills
- verification.md — Part 3: tests + evals + quality flywheel
- running-the-work.md — Part 4: conductor/orchestrator modes, 80% problem
- review-and-ship.md — Part 5: first-pass review, hooks, observability
- controlling-cost.md — Part 6: token economy, model routing, TCO
- production-agents.md — Part 7: persistent memory, scoped permissions, MCP/A2A
- team-standard.md — Part 8: harness as code, eval gates, hiring for judgment

## Proposed Topic Tree

```
wiki/
├── index.md                        (overview — vault MOC)
├── log.md                          (already exists)
│
├── foundation/                     (what the agent knows before it works)
│   ├── foundation.md               (index)
│   ├── rule-file.md                (process)
│   └── context-engineering.md      (concept)
│
├── build-loop/                     (the execution cycle)
│   ├── build-loop.md               (index)
│   ├── verification.md             (concept)
│   ├── running-the-work.md         (process)
│   └── review-and-ship.md          (process)
│
├── scale/                          (economics and deployment)
│   ├── scale.md                    (index)
│   ├── controlling-cost.md         (concept)
│   ├── production-agents.md        (concept)
│   └── team-standard.md            (process)
│
├── reference/                      (cross-cutting utilities)
│   ├── reference.md                (index)
│   ├── agentic-workflow-overview.md (overview — from intro.md)
│   └── implementation-checklist.md (reference — from checklist.md)
│
└── _sources/                       (source summaries)
    ├── intro.md
    ├── checklist.md
    ├── rule-file.md
    ├── context-engineering.md
    ├── verification.md
    ├── running-the-work.md
    ├── review-and-ship.md
    ├── controlling-cost.md
    ├── production-agents.md
    └── team-standard.md
```

## Folder sizes

- foundation: 2 pages + 1 index = 3 total (under 12)
- build-loop: 3 pages + 1 index = 4 total (under 12)
- scale: 3 pages + 1 index = 4 total (under 12)
- reference: 2 pages + 1 index = 3 total (under 12)

All folders are well within the 12-page target.

## Graph color groups

- foundation: green (establishment)
- build-loop: blue (execution)
- scale: orange (economics)
- reference: grey (meta/reference)

## Open decisions

None — sources map cleanly to the proposed tree.

## Status

APPROVED (user confirmed ingest via direct prompt).
