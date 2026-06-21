---
id: rule-file
title: "1부 — 규칙 파일 설정하기"
description: AI 에이전트에게 필요한 온보딩 문서를 작성하세요 — CLAUDE.md 또는 AGENTS.md에 스택, 컨벤션, 절대 규칙, 워크플로를 담습니다.
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: '1부 — 규칙 파일 설정하기',
      description: 'AI 에이전트에게 필요한 온보딩 문서를 작성하세요 — CLAUDE.md 또는 AGENTS.md에 스택, 컨벤션, 절대 규칙, 워크플로를 담습니다.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/rule-file',
      },
    })}
  </script>
</head>

# 1부 — 규칙 파일 설정하기

코딩 에이전트는 첫 출근한 신입 엔지니어처럼 여러분의 저장소에 도착합니다. 단, 질문을 할 수 없다는 점이 다릅니다. 에이전트는 스스로 추론합니다. 그리고 아무런 정보가 없으면 예측 가능한 방식으로 틀린 추론을 합니다. 잘못된 상태 관리 패턴, 잘못된 폴더 구조, 잘못된 테스트 컨벤션, 잘못된 임포트 경로 같은 것들이 그 예입니다.

규칙 파일은 그 신입 엔지니어가 여러분에게 써달라고 부탁조차 할 수 없었던 온보딩 문서입니다. 이 가이드 전체에서 가장 높은 레버리지를 가진 한 시간입니다. 왜냐하면 프로젝트에서 이루어지는 모든 미래의 상호작용이 이 파일을 기반으로 하기 때문입니다.

## 왜 효과적인가

대부분의 사람들은 AI 출력 결과가 나쁠 때 더 영리한 프롬프트를 작성하는 것으로 문제를 해결하려 합니다. 그것은 잘못된 레버입니다. 출력 품질은 요청을 어떻게 표현하느냐보다 에이전트가 *여러분의 프로젝트에 대해 무엇을 알고 있는가*에 훨씬 더 크게 좌우됩니다. 규칙 파일은 그 지식을 한 번 인코딩함으로써, 매 세션마다 같은 내용을 반복 설명하는 일을 없애줍니다.

이 파일은 도구에 따라 이름이 다릅니다 — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` — 하지만 내용의 핵심은 동일합니다. 이 저장소에서 에이전트가 어떤 존재인지, 무엇을 해야 하는지, 그리고 절대 하지 말아야 하는 것이 무엇인지를 정의하는 것입니다.

## 무엇을 담는가

네 가지 파트로 구성합니다. 각각 짧고 구체적으로 작성하세요.

1. **스택과 버전** — 에이전트가 어떤 API가 존재하는지 더 이상 추측하지 않도록 합니다.
2. **컨벤션** — 일반적인 모범 사례가 아닌, 여러분이 *실제로* 사용하는 패턴입니다.
3. **절대 규칙** — 절대 일어나서는 안 되는 것들입니다.
4. **워크플로** — 코드 생성 전후에 따라야 할 단계입니다.

## 실제 예시

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

이것이 *아닌* 것에 주목하세요. 이것은 프롬프트가 아니며, FastAPI에 대한 튜토리얼도 아닙니다. 이것은 이 코드베이스에 특화된 운영 지침입니다. 범용 모델은 FastAPI를 이미 알고 있습니다. 그것이 모르는 것은 *여러분의* 라우트가 반드시 얇게 유지되어야 하며, *여러분의* 시크릿 규칙은 절대적이라는 사실입니다.

## 수정하면서 발전시키기

처음부터 완벽한 파일을 쓰려 하지 마세요. 열 줄로 시작하고 실제 실패에서 배운 것들을 추가해 나가세요. 루프는 단순합니다.

- 에이전트가 원하지 않는 일을 합니다.
- 그것을 방지하는 규칙 하나를 추가합니다.
- 그 일은 다시는 발생하지 않습니다.

예를 들어, 에이전트가 계속해서 `utils.py`라는 잡동사니 파일을 만들어낸다면 다음을 추가합니다.

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

각 규칙은 추가하는 비용이 저렴하고, 이후 모든 작업에서 효과를 발휘합니다. 몇 주가 지나면 에이전트가 수개월간 프로젝트를 다뤄온 사람처럼 행동하게 만드는 파일을 갖게 될 것입니다.

## 도구도 정의하기

규칙 파일은 에이전트가 어떤 도구에 접근할 수 있는지, 언제 사용할지도 알려주는 곳입니다 — 특정 내부 API, 스크립트, 데이터베이스 스키마 등이 그 대상입니다. 도구를 *언제* 호출해야 하는지에 대한 한 줄짜리 설명은 에이전트가 도구를 무시하거나 잘못 사용하는 것을 방지합니다.

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## 아키텍처는 여러분이, 구현은 에이전트가

확실히 지켜야 할 경계가 하나 있습니다. 에이전트는 아키텍처를 *구현*하는 데는 뛰어나지만, *선택*하는 데는 약합니다. 일관성 vs. 가용성, 빌드 vs. 구매 같은 트레이드오프는 모델이 볼 수 없는 비즈니스 맥락에 의존합니다. 그 결정은 직접 내리고, 기록해 두고, 에이전트가 그것을 토대로 구축하게 하세요. 규칙 파일에 명확한 아키텍처 지침을 담으면 에이전트는 즉흥적으로 행동하는 대신 일관된 구현자가 됩니다.

## 직접 워크플로 설정하기

- [ ] 도구의 명명 규칙에 따라 저장소 루트에 규칙 파일을 생성합니다.
- [ ] 열 줄을 작성합니다: 스택, 컨벤션 두세 개, 절대 규칙 두세 개, 간략한 워크플로.
- [ ] 에이전트가 사용해야 할 스크립트/API와 사용하지 말아야 할 것들을 나열한 `## Tools` 섹션을 추가합니다.
- [ ] 다음 한 주 동안, 에이전트가 잘못 행동할 때마다 규칙을 하나씩 추가합니다.
- [ ] 팀 전체(그리고 모든 미래 세션)가 공유할 수 있도록 파일을 버전 관리에 커밋합니다.
