---
id: rule-file
title: "Part 1 — Rule File तैयार करें"
description: वह onboarding document बनाएँ जो आपके AI agent को चाहिए — CLAUDE.md या AGENTS.md में stack, conventions, hard rules, और workflow।
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 1 — Set Up the Rule File',
      description: 'Create the onboarding document your AI agent needs — stack, conventions, hard rules, and workflow in CLAUDE.md or AGENTS.md.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/rule-file',
      },
    })}
  </script>
</head>

# Part 1 — Rule file तैयार करें

एक coding agent आपके repository में उसी तरह आता है जैसे पहले दिन कोई नया engineer — सिवाय इसके कि वह सवाल नहीं पूछ सकता। वह अनुमान लगाएगा। और बिना किसी आधार के, वह अनुमान लगाएगा — पर गलत तरीके से, जो अनुमानित है: गलत state-management pattern, गलत folder layout, गलत test convention, गलत import path।

Rule file वह onboarding document है जो उस नए engineer को आपसे लिखवाने का मौका कभी नहीं मिलता। यह इस पूरे guide में सबसे ज़्यादा leverage देने वाला एक घंटा है, क्योंकि project में आगे होने वाली हर interaction इसे inherit करती है।

## यह काम क्यों करता है

ज़्यादातर लोग खराब AI output ठीक करने की कोशिश cleverer prompts लिखकर करते हैं। यह गलत lever है। Output quality इस बात पर कहीं ज़्यादा निर्भर करती है कि agent *आपके project के बारे में क्या जानता है*, बजाय इसके कि आप request कैसे phrase करते हैं। Rule file उस knowledge को एक बार encode करती है, ताकि आप हर session में उसे दोबारा explain करना बंद करें।

File का नाम tool के अनुसार अलग-अलग होता है — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` — लेकिन contents एक ही idea है: इस repo में agent कौन है, उसे क्या करना है, और क्या कभी नहीं करना।

## इसमें क्या होता है

चार भाग। हर एक छोटा और specific रखें।

1. **Stack और versions** — ताकि agent यह अनुमान लगाना बंद करे कि कौन से APIs मौजूद हैं।
2. **Conventions** — वे patterns जो आप *वास्तव में* उपयोग करते हैं, generic best practices नहीं।
3. **Hard rules** — वे चीज़ें जो कभी नहीं होनी चाहिए।
4. **Workflow** — code generate करने से पहले और बाद में follow करने के steps।

## एक असली उदाहरण

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

ध्यान दें यह *क्या नहीं* है: यह कोई prompt नहीं है, और यह FastAPI पर कोई tutorial नहीं है। यह इस codebase के लिए विशिष्ट operating instructions का एक set है। एक generalist model FastAPI पहले से जानता है; जो वह नहीं जानता वह यह है कि *आपके* routes पतले होने चाहिए और *आपका* secrets rule absolute है।

## सुधार से बढ़ाएँ

शुरुआत में perfect file लिखने की कोशिश न करें। दस lines से शुरू करें और असली failures को बताने दें कि क्या जोड़ना है। Loop सरल है:

- Agent कुछ ऐसा करता है जो आप नहीं चाहते।
- आप एक rule जोड़ते हैं जो उसे रोकती है।
- वह फिर कभी नहीं होता।

उदाहरण के लिए, मान लीजिए agent बार-बार एक `utils.py` dumping ground बना देता है। आप जोड़ते हैं:

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

प्रत्येक rule जोड़ना सस्ता है और हर अगले task पर फायदा देता है। कुछ हफ्तों में आपके पास एक ऐसी file होगी जो agent को उस व्यक्ति की तरह व्यवहार करवाती है जो महीनों से project पर काम कर रहा हो।

## Tools भी define करें

Rule file वह जगह भी है जहाँ आप agent को बताते हैं कि वह कौन से tools reach कर सकता है और उनका उपयोग कब करना है — specific internal APIs, scripts, database schemas। *कब* किसी tool को call करना है, इसका एक-लाइन description agent को या तो उसे ignore करने या गलत उपयोग करने से रोकती है।

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## Architecture आप तय करें; agent implement करे

एक boundary दृढ़ता से रखें: agent किसी architecture को *implement* करने में अच्छा है, और उसे *चुनने* में बुरा। consistency बनाम availability या build बनाम buy जैसे trade-offs business context पर निर्भर करते हैं जो model नहीं देख सकता। वे फैसले खुद लें, लिख लें, और agent को उनके अनुसार बनाने दें। Rule file में एक clear architecture note agent को एक consistent implementer बनाती है, न कि एक improviser।

## अपना खुद का workflow तैयार करें

- [ ] अपने repo root में अपने tool के naming convention का उपयोग करके rule file बनाएँ।
- [ ] दस lines लिखें: stack, दो-तीन conventions, दो-तीन hard rules, एक short workflow।
- [ ] एक `## Tools` section जोड़ें जो उन scripts/APIs को list करे जिन्हें agent उपयोग करे और न करे।
- [ ] अगले हफ्ते, हर बार जब agent गलत व्यवहार करे, एक rule जोड़ें।
- [ ] File को version control में commit करें ताकि पूरी team (और हर भविष्य का session) इसे share करे।
