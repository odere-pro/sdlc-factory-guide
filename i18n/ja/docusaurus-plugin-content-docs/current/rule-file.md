---
id: rule-file
title: "パート1: ルールファイルのセットアップ"
description: AIエージェントが必要とするオンボーディングドキュメントを作成する — CLAUDE.mdまたはAGENTS.mdにスタック、規約、ハードルール、ワークフローを記述する。
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'パート1: ルールファイルのセットアップ',
      description: 'AIエージェントが必要とするオンボーディングドキュメントを作成する — CLAUDE.mdまたはAGENTS.mdにスタック、規約、ハードルール、ワークフローを記述する。',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/rule-file',
      },
    })}
  </script>
</head>

# パート1: ルールファイルのセットアップ

コーディングエージェントは初日の新入りエンジニアのようにリポジトリに到着しますが、一つだけ違うことがあります。それは質問ができないということです。エージェントは推測します。そして何も手がかりがなければ、予測可能な形で間違った推測をします。間違ったステート管理パターン、間違ったフォルダ構成、間違ったテスト規約、間違ったインポートパス、といった具合に。

ルールファイルとは、その新入りエンジニアが書いてくれるよう頼む機会を得られなかったオンボーディングドキュメントのことです。これはこのガイド全体の中で最も投資対効果の高い1時間です。なぜなら、プロジェクト内の将来のすべてのインタラクションがそれを引き継ぐからです。

## なぜ機能するのか

多くの人は、AIのアウトプットが悪いときに、より巧みなプロンプトを書くことで解決しようとします。それは間違ったアプローチです。アウトプットの品質は、リクエストの表現よりも、エージェントが*あなたのプロジェクトについて何を知っているか*にはるかに依存します。ルールファイルはその知識を一度エンコードすることで、毎セッションの再説明を不要にします。

このファイルはツールによって名前が異なります — `CLAUDE.md`、`AGENTS.md`、`GEMINI.md` — しかし内容は同じ考え方です。このリポジトリでエージェントが誰であるか、何をしなければならないか、何をしてはならないか。

## 何を書くか

4つのパートで構成します。それぞれを短く具体的に保ちましょう。

1. **スタックとバージョン** — エージェントがどのAPIが存在するか推測しなくて済むように。
2. **規約** — 一般的なベストプラクティスではなく、*実際に*使用しているパターン。
3. **ハードルール** — 絶対に起きてはならないこと。
4. **ワークフロー** — コード生成の前後に従うべき手順。

## 実際の例

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

これが*何ではないか*に注目してください。これはプロンプトではなく、FastAPIのチュートリアルでもありません。このコードベース固有の操作指示です。ジェネラリストモデルはすでにFastAPIを知っています。それが知らないのは、*あなたの*ルートは薄く保たれなければならないこと、*あなたの*シークレットルールは絶対であること、です。

## 修正によって育てる

最初から完璧なファイルを書こうとしないでください。10行から始め、実際の失敗から何を追加すべきかを学びましょう。ループはシンプルです：

- エージェントが望ましくないことをする。
- それを防ぐルールを1つ追加する。
- 二度と起きない。

たとえば、エージェントが常に `utils.py` というダンプ場を作り続けるなら、次を追加します：

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

各ルールは追加コストが低く、その後のすべてのタスクで恩恵をもたらします。数週間後には、何ヶ月もプロジェクトで働いてきた人のように振る舞うエージェントを持つファイルができあがります。

## ツールも定義する

ルールファイルはエージェントがどのツールにアクセスでき、いつ使用するかを伝える場所でもあります。特定の社内API、スクリプト、データベーススキーマなどです。ツールを*いつ*呼び出すかについての1行の説明があれば、エージェントがそれを無視したり誤用したりするのを防げます。

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## アーキテクチャはあなたが所有し、エージェントは実装する

しっかり守るべき一つの境界線があります。エージェントはアーキテクチャを*実装*することは得意ですが、*選択*することは苦手です。一貫性対可用性、またはビルド対購入のようなトレードオフは、モデルが見ることのできないビジネスコンテキストに依存します。その判断は自分で行い、書き留めて、エージェントにそれに基づいて構築させましょう。ルールファイルに明確なアーキテクチャノートを書くことで、エージェントをその場しのぎの即興者ではなく、一貫した実装者にすることができます。

## 自分のワークフローをセットアップする

- [ ] ツールの命名規約に従い、リポジトリルートにルールファイルを作成する。
- [ ] 10行を書く：スタック、規約2〜3個、ハードルール2〜3個、簡単なワークフロー。
- [ ] エージェントが使うべき・使うべきでないスクリプト/APIを列挙した `## Tools` セクションを追加する。
- [ ] 翌週は、エージェントが問題ある動作をするたびにルールを1つ追加する。
- [ ] ファイルをバージョン管理にコミットし、チーム全体（および将来のすべてのセッション）で共有できるようにする。
