---
title: Foundation
type: index
page_class: overview
source: "[[raw/intro.md]]"
sources:
  - "[[intro|Agentic Engineering Workflow Overview]]"
tags: [foundation, index, topic]
parent: "[[index|Wiki Index]]"
path: foundation/
children:
  - "[[Rule File]]"
  - "[[Context Engineering]]"
---

# Foundation

The foundation phase establishes what the agent knows before any task begins. It covers the two inputs the agent reads on every request: a rule file that encodes project knowledge, and a context-engineering strategy that controls what else it sees and when.

## Pages

- [[rule-file|Rule File]] — the onboarding document encoding stack, conventions, hard rules, and workflow.
- [[context-engineering|Context Engineering]] — the discipline of deciding what the agent sees on every request versus on demand.

## Relationship to the rest of the workflow

Foundation is the prerequisite phase. Without a rule file the agent infers — and infers wrong. Without context engineering the rule file grows without bound and dilutes its own signal. The [[build-loop|Build Loop]] and [[scale|Scale]] phases both depend on foundation quality: a tight rule file is the primary lever for first-pass success rate, which cascades into cost, quality, and team reproducibility.
