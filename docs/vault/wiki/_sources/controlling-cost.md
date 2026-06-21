---
title: "Source: Part 6 — Control Cost"
page_class: concept
source: "raw/controlling-cost.md"
tags: [source, cost, token-economy, model-routing, TCO]
---

# Source: Part 6 — Control Cost

## Metadata

- **File:** `raw/controlling-cost.md`
- **Author:** Oleksandr Derechei
- **Published:** 2026-06-18
- **Series position:** Part 6 of 8

## Summary

Reframes AI workflow economics around total cost of ownership rather than velocity. Identifies three cost levers: first-pass success rate (fewer retries), model routing by task complexity (frontier vs cheap models), and dynamic context/skills (pay only for tokens needed). Shows how structured workflows invert the ad-hoc cost curve — higher upfront investment, sharply lower marginal cost per feature.

## Key Claims

The real economic metric is total cost of ownership, not shipping speed. Ad-hoc prompting looks free but carries token burn from retries, maintenance tax from unstructured code, and security remediation costs. Three levers: (1) first-pass success — a tight rule file reduces retries; (2) model routing — cheap models handle test generation, review, CI; frontier handles architecture and hard implementation; (3) dynamic context — pay only for what's needed per request. Routing config example: YAML routing by task keyword. First-pass going from 40% to 80% roughly halves token spend before routing is applied. Covers: Controlling Cost, Model Routing, Context Engineering, TCO, Scale.
