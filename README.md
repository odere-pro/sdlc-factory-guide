# Agentic Engineering Setup

[![Deploy to GitHub Pages](https://github.com/odere-pro/sdlc-factory-guide/actions/workflows/deploy.yml/badge.svg)](https://github.com/odere-pro/sdlc-factory-guide/actions/workflows/deploy.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Languages: 11](https://img.shields.io/badge/languages-11-green.svg)](#languages)

A practical, 8-part guide to moving from ad-hoc AI prompting to a disciplined engineering workflow you can rely on in production — inspired by Google's *The New SDLC With Vibe Coding* and Karpathy's Software 3.0.

**[Read the live docs →](https://odere-pro.github.io/sdlc-factory-guide/)**

---

## Implementation Checklist

### 1. Set up the rule file

- [ ] Create a `CLAUDE.md` / `AGENTS.md` in the repo root. Start with 10 lines.
- [ ] Cover four things:
  - [ ] Stack and versions
  - [ ] Conventions (folder structure, naming, patterns you actually use)
  - [ ] Hard rules the agent must never break (forbidden packages, secrets handling, layering)
  - [ ] Workflow to follow before generating code
- [ ] Add a new rule every time the agent does something you don't want repeated.
- [ ] List the tools the agent may call and when to use each (APIs, scripts, DB schemas).
- [ ] Make architecture decisions yourself; let the agent implement them, not choose them.

### 2. Engineer the context

- [ ] Decide what is **static** (always loaded) vs **dynamic** (loaded on demand):
  - [ ] Static: rule files, system instructions, global memory
  - [ ] Dynamic: skills, tool results, retrieved docs, recent history
- [ ] Keep static context short and high-signal. Cut anything the agent doesn't need every call.
- [ ] Move repeatable know-how into skills that load only when the task matches.
- [ ] Never paste a whole repo into the prompt. Retrieve what's relevant.

### 3. Build verification

- [ ] Write tests before generating the feature. Tests are the spec.
- [ ] Write evals for the non-deterministic parts:
  - [ ] Did the agent take a sensible path?
  - [ ] Did it pick the right tools?
  - [ ] Does the output meet the quality bar?
- [ ] Check both the result (compiles, tests pass) and the trajectory (how it got there).
- [ ] Set up the feedback loop:
  - [ ] Run against a benchmark suite
  - [ ] Cluster failures by root cause
  - [ ] Fix the prompt or tool that caused them
  - [ ] Re-run a regression suite
  - [ ] Monitor production for new failures

### 4. Run the work

- [ ] Pick a mode per task:
  - [ ] **Conductor** (real-time, in-IDE) for complex logic, debugging, unfamiliar code
  - [ ] **Orchestrator** (async, delegate and review) for bug fixes, migrations, test generation
- [ ] Pick the agent location per task:
  - [ ] Editor agent — in-flow edits and suggestions
  - [ ] Terminal agent — multi-file work, run-and-react
  - [ ] Background agent — paragraph-spec tasks you can walk away from
- [ ] Run code generation inside a sandbox, using only approved tools.
- [ ] Handle the last 20% yourself: edge cases, error handling, integration points, business logic.

### 5. Review and ship

- [ ] Use the agent as a first-pass reviewer (bugs, style, security, performance).
- [ ] Review every line that ships:
  - [ ] Be skeptical of clever code
  - [ ] Confirm imported packages are real
  - [ ] Check error handling for realistic failures
- [ ] Add hooks at commit/edit points (e.g. block commits with hard-coded secrets).
- [ ] Turn on observability: traces, eval results, token/latency/cost, drift.
- [ ] Point the agent at legacy work you've been avoiding: refactors, migrations, deprecated APIs.

### 6. Control cost

- [ ] Measure total cost of ownership, not just speed.
- [ ] Raise first-pass success with a tight rule file to avoid retry loops.
- [ ] Route models by task:
  - [ ] Frontier models for architecture and hard implementation
  - [ ] Cheap models for test generation, review, CI monitoring
- [ ] Use dynamic context and skills so you only pay for tokens you need.

### 7. Ship production agents

- [ ] Decide what you're building:
  - [ ] A script — the agent is the endpoint
  - [ ] A product for real users — the agent needs a substrate
- [ ] For products, add: persistent memory, scoped permissions, eval coverage in CI, full-run tracing.
- [ ] Use a skills bundle so your existing coding agent handles build → evaluate → deploy → observe.
- [ ] For multi-agent setups, coordinate via shared state, MCP for tools, A2A for delegation.

### 8. Make it a team standard

- [ ] Version rule files, prompts, eval suites, and skills. Review them in PRs. Assign owners.
- [ ] Gate shipping on a passing eval suite with a clear rubric, not a working demo.
- [ ] Train reviewers on how generated code fails.
- [ ] Make the prototype-vs-production boundary explicit (which repos, branches, environments).
- [ ] Build the harness once and keep refining it.
- [ ] Hire and promote for judgment: specification, evaluation, architecture.

---

## Quick Start

```bash
git clone https://github.com/odere-pro/sdlc-factory-guide.git
cd sdlc-factory-guide
npm install
npm start
```

## Languages

The full guide is translated into 11 languages. Read any version on the live
site, or directly as Markdown here on GitHub:

- **English** — [Read online](https://odere-pro.github.io/sdlc-factory-guide/) · [Markdown](docs/)
- **Svenska** — Swedish — [Read online](https://odere-pro.github.io/sdlc-factory-guide/sv/) · [Markdown](i18n/sv/docusaurus-plugin-content-docs/current/)
- **Українська** — Ukrainian — [Read online](https://odere-pro.github.io/sdlc-factory-guide/uk/) · [Markdown](i18n/uk/docusaurus-plugin-content-docs/current/)
- **Español** — Spanish — [Read online](https://odere-pro.github.io/sdlc-factory-guide/es/) · [Markdown](i18n/es/docusaurus-plugin-content-docs/current/)
- **Deutsch** — German — [Read online](https://odere-pro.github.io/sdlc-factory-guide/de/) · [Markdown](i18n/de/docusaurus-plugin-content-docs/current/)
- **Français** — French — [Read online](https://odere-pro.github.io/sdlc-factory-guide/fr/) · [Markdown](i18n/fr/docusaurus-plugin-content-docs/current/)
- **日本語** — Japanese — [Read online](https://odere-pro.github.io/sdlc-factory-guide/ja/) · [Markdown](i18n/ja/docusaurus-plugin-content-docs/current/)
- **简体中文** — Chinese (Simplified) — [Read online](https://odere-pro.github.io/sdlc-factory-guide/zh-Hans/) · [Markdown](i18n/zh-Hans/docusaurus-plugin-content-docs/current/)
- **Português (Brasil)** — Portuguese (Brazil) — [Read online](https://odere-pro.github.io/sdlc-factory-guide/pt-BR/) · [Markdown](i18n/pt-BR/docusaurus-plugin-content-docs/current/)
- **한국어** — Korean — [Read online](https://odere-pro.github.io/sdlc-factory-guide/ko/) · [Markdown](i18n/ko/docusaurus-plugin-content-docs/current/)
- **हिन्दी** — Hindi — [Read online](https://odere-pro.github.io/sdlc-factory-guide/hi/) · [Markdown](i18n/hi/docusaurus-plugin-content-docs/current/)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Commit your changes
4. Push to the branch and open a Pull Request

For translations, place files under `i18n/{locale}/docusaurus-plugin-content-docs/current/`.

## Reference

Based on *The New SDLC With Vibe Coding* (Google):
https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding

## License

[Apache-2.0](LICENSE)
