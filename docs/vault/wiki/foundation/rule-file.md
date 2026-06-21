---
title: "Rule File"
type: concept
aliases: ["rule-file", "Rule File", "CLAUDE.md", "AGENTS.md", "agent rule file"]
parent: "[[foundation|Foundation]]"
path: "foundation"
sources: ["[[rule-file|Part 1: Set Up the Rule File]]"]
related:
  - "[[context-engineering|Context Engineering]]"
  - "[[agentic-engineering-workflow|Agentic Engineering Workflow]]"
tags: ["rule-file", "CLAUDE.md", "agent-configuration", "foundation"]
created: 2026-06-22
updated: 2026-06-22
update_count: 1
status: active
confidence: 1.0
---

# Rule File

> [!summary]
> The rule file (`CLAUDE.md`, `AGENTS.md`, or `GEMINI.md`) is the onboarding document an AI agent reads at the start of every session. It encodes project-specific knowledge — stack, conventions, hard rules, workflow — that the agent would otherwise have to infer incorrectly. A well-maintained rule file is the single highest-leverage investment in an agentic workflow.

## Definition

A rule file is a project-level configuration document that gives an AI coding agent the knowledge a new team member would need to contribute effectively. Unlike a prompt (which addresses one task), a rule file encodes persistent, project-wide operating instructions that every future session inherits.

## Key Principles

### Four Required Parts

1. **Stack and versions** — which language, framework, database, and library versions are in use, so the agent stops guessing which APIs exist
2. **Conventions** — the specific patterns the project uses (folder structure, naming, architectural patterns) — not generic best practices
3. **Hard rules** — absolute prohibitions (no secrets in code, no certain packages, specific linting requirements)
4. **Workflow** — the ordered steps to follow before and after generating code (e.g., write tests first, run linter before declaring done)

### Iterative Growth

The most important rule about the rule file: don't try to write it perfectly up front. Start with ten lines. Let real failures add new rules:

- Agent misbehaves → add one rule to prevent that behavior → it never happens again
- Each rule is cheap to add and pays off on every subsequent task

Over weeks, the file becomes a record of every mistake the agent has ever made — and will never make again.

### Tool Definitions

The rule file is also where the agent learns which tools it can call and when. A one-line description of when to invoke a script or API prevents both ignoring and misuse.

### Architecture Boundary

The rule file makes explicit which decisions belong to the human and which to the agent. Architecture decisions (consistency vs. availability, build vs. buy) require business context the model cannot see — they are recorded in the rule file and implemented by the agent, never the reverse.

## Examples

A minimal rule file structure (Python/FastAPI example from source):

```markdown
## Stack
- Python 3.12, FastAPI, SQLAlchemy 2.0 (async)

## Conventions
- Feature folders under app/features/<name>/, not layered by type.

## Hard rules
- Never add a dependency not already in pyproject.toml. Ask first.
- No print(). Use structlog.

## Workflow
1. Write the test first, then implement until it passes.
2. Run ruff check and pytest before declaring done.
```

## Related Concepts

- [[context-engineering|Context Engineering]] — the rule file is the primary static context; context engineering governs how to keep it high-signal
- [[agentic-engineering-workflow|Agentic Engineering Workflow]] — the rule file is the foundation of the full workflow
