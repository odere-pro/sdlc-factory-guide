---
id: rule-file
title: "第 1 部分：配置规则文件"
description: 创建 AI 智能体所需的入职文档——在 CLAUDE.md 或 AGENTS.md 中写明技术栈、约定、硬性规则和工作流程。
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: '第 1 部分：配置规则文件',
      description: '创建 AI 智能体所需的入职文档——在 CLAUDE.md 或 AGENTS.md 中写明技术栈、约定、硬性规则和工作流程。',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/rule-file',
      },
    })}
  </script>
</head>

# 第 1 部分：配置规则文件

编码智能体来到你的代码库，就像一名新工程师第一天入职——但它没法提问。它只会推断。而没有任何参照的情况下，它的推断会以可预期的方式出错：错误的状态管理模式、错误的目录结构、错误的测试约定、错误的导入路径。

规则文件就是那份新工程师从未有机会请你撰写的入职文档。这是本指南中投入产出比最高的一个小时，因为项目中所有后续的交互都会继承它。

## 为什么有效

大多数人试图通过写更聪明的提示词来修复糟糕的 AI 输出。这是错误的方向。输出质量更多取决于智能体*对你项目的了解*，而不是你如何措辞一个请求。规则文件把这些知识编码一次，让你不必在每次会话中重复解释。

这个文件因工具不同而命名各异——`CLAUDE.md`、`AGENTS.md`、`GEMINI.md`——但内容的本质是一样的：智能体在这个代码库中是什么角色、它必须做什么、以及它绝对不能做什么。

## 写什么内容

四个部分。每部分保持简短具体。

1. **技术栈与版本**——让智能体不再猜测哪些 API 可用。
2. **约定**——你*实际*使用的模式，而不是通用的最佳实践。
3. **硬性规则**——永远不能发生的事情。
4. **工作流程**——生成代码前后需要遵循的步骤。

## 一个真实示例

```markdown
# CLAUDE.md

## Stack
- Python 3.12, FastAPI, SQLAlchemy 2.0 (async)
- Postgres 16, Alembic for migrations
- pytest + httpx for tests
- uv for dependency management

## Conventions
- Feature folders under `app/features/<name>/`, not layered by type.
- Routes are thin: validation + a single service call. No business logic in routes.
- Services return domain objects; serialization happens in the route layer.
- All DB access goes through repositories. No raw SQL in services.
- Async everywhere. No blocking calls inside request handlers.

## Hard rules
- Never add a dependency that isn't already in pyproject.toml. Ask first.
- Never write secrets, tokens, or connection strings into code or tests.
- No `print()`. Use the configured `structlog` logger.
- Every new endpoint needs a test in the matching `tests/` folder before it's done.
- Run `ruff check` and `pytest` before declaring a task complete.

## Workflow
1. Read the feature's spec or ticket before writing code.
2. Write the test first, then implement until it passes.
3. If a change touches the database schema, stop and flag it for human review.
4. After implementing, confirm ruff and pytest both pass, then summarize what changed.
```

注意这*不是*什么：它不是一个提示词，也不是 FastAPI 的教程。它是一套针对这个代码库的操作规范。一个通用模型早就了解 FastAPI；它不知道的是*你的*路由必须保持精简，*你的*密钥规则是绝对红线。

## 通过纠正来持续完善

不要试图一开始就写出完美的文件。从十行开始，让真实的失败案例告诉你该添加什么。循环很简单：

- 智能体做了你不希望的事。
- 你添加一条防止它发生的规则。
- 它再也不会发生了。

比如，假设智能体总是创建一个 `utils.py` 大杂烩文件。你就添加：

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

每条规则添加起来成本极低，却在每次后续任务中都能收到回报。几周之后，你将拥有一个能让智能体表现得像在项目上工作了数月的老员工一样的规则文件。

## 同时定义工具

规则文件也是告诉智能体它能访问哪些工具以及何时使用它们的地方——特定的内部 API、脚本、数据库模式。对*何时*调用某个工具的一行描述，能防止智能体忽略它或误用它。

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## 你主导架构；智能体负责实现

有一条边界需要坚定地守住：智能体擅长*实现*架构，不擅长*选择*架构。一致性 vs. 可用性、自研 vs. 采购这类权衡取决于模型无法感知的业务背景。这些决策由你来做，写下来，让智能体按照它们来构建。在规则文件中写清楚架构决策，能把智能体变成一个稳定的实现者，而不是即兴发挥者。

## 搭建你自己的工作流

- [ ] 按照你所用工具的命名约定，在代码库根目录创建规则文件。
- [ ] 写下十行：技术栈、两三条约定、两三条硬性规则、一段简短的工作流程。
- [ ] 添加 `## Tools` 部分，列出智能体应该和不应该使用的脚本/API。
- [ ] 接下来的一周，每次智能体行为不当就添加一条规则。
- [ ] 将该文件提交到版本控制，让整个团队（以及未来的每一次会话）共享它。
