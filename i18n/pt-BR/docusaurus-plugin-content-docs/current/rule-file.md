---
id: rule-file
title: "Parte 1 — Configure o Arquivo de Regras"
description: Crie o documento de integração que seu agente de IA precisa — stack, convenções, regras rígidas e fluxo de trabalho no CLAUDE.md ou AGENTS.md.
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 1 — Configure o Arquivo de Regras',
      description: 'Crie o documento de integração que seu agente de IA precisa — stack, convenções, regras rígidas e fluxo de trabalho no CLAUDE.md ou AGENTS.md.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/rule-file',
      },
    })}
  </script>
</head>

# Parte 1 — Configure o arquivo de regras

Um agente de codificação chega ao seu repositório como um engenheiro novo no primeiro dia, exceto que ele não consegue fazer perguntas. Ele vai inferir. E sem nada para se basear, ele infere errado de formas previsíveis: o padrão de gerenciamento de estado errado, o layout de pasta errado, a convenção de testes errada, o caminho de importação errado.

O arquivo de regras é o documento de integração que aquele engenheiro novo nunca consegue te pedir para escrever. É a hora com maior retorno de toda esta série, porque cada interação futura no projeto o herda.

## Por que funciona

A maioria das pessoas tenta corrigir saídas ruins da IA escrevendo prompts mais inteligentes. Essa é a alavanca errada. A qualidade da saída depende muito mais do que o agente *sabe sobre o seu projeto* do que da forma como você formula uma solicitação. Um arquivo de regras codifica esse conhecimento uma vez, para que você pare de reexplicar em cada sessão.

O arquivo tem nomes diferentes dependendo da ferramenta — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` — mas o conteúdo é a mesma ideia: quem é o agente neste repositório, o que ele deve fazer e o que nunca deve fazer.

## O que colocar nele

Quatro partes. Mantenha cada uma curta e específica.

1. **Stack e versões** — para o agente parar de adivinhar quais APIs existem.
2. **Convenções** — os padrões que você *realmente* usa, não boas práticas genéricas.
3. **Regras rígidas** — as coisas que nunca devem acontecer.
4. **Fluxo de trabalho** — os passos a seguir antes e depois de gerar código.

## Um exemplo real

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

Observe o que isso *não* é: não é um prompt e não é um tutorial sobre FastAPI. É um conjunto de instruções operacionais específicas para esta base de código. Um modelo generalista já conhece FastAPI; o que ele não sabe é que *suas* rotas devem ser enxutas e que *sua* regra de segredos é absoluta.

## Evolua por correção

Não tente escrever o arquivo perfeito de início. Comece com dez linhas e deixe as falhas reais ensinarem o que adicionar. O ciclo é simples:

- O agente faz algo que você não quer.
- Você adiciona uma regra que previne isso.
- Nunca acontece de novo.

Por exemplo, digamos que o agente fica inventando um `utils.py` como depósito de tudo. Você adiciona:

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

Cada regra é barata de adicionar e se paga em cada tarefa subsequente. Em poucas semanas você terá um arquivo que faz o agente se comportar como alguém que trabalhou no projeto por meses.

## Defina as ferramentas também

O arquivo de regras é também onde você diz ao agente quais ferramentas ele pode usar e quando — APIs internas específicas, scripts, esquemas de banco de dados. Uma descrição de uma linha de *quando* chamar uma ferramenta evita que o agente a ignore ou a use de forma incorreta.

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## Você é dono da arquitetura; o agente a implementa

Uma fronteira a manter firmemente: o agente é bom em *implementar* uma arquitetura e ruim em *escolher* uma. Trade-offs como consistência vs. disponibilidade ou construir vs. comprar dependem de contexto de negócio que o modelo não consegue enxergar. Tome essas decisões você mesmo, escreva-as e deixe o agente construir sobre elas. Uma nota de arquitetura clara no arquivo de regras transforma o agente num implementador consistente em vez de um improvisador.

## Configure seu próprio fluxo de trabalho

- [ ] Crie o arquivo de regras na raiz do seu repositório usando a convenção de nomenclatura da sua ferramenta.
- [ ] Escreva dez linhas: stack, duas ou três convenções, duas ou três regras rígidas, um fluxo de trabalho curto.
- [ ] Adicione uma seção `## Tools` listando scripts/APIs que o agente deve e não deve usar.
- [ ] Na próxima semana, adicione uma regra cada vez que o agente se comportar mal.
- [ ] Faça commit do arquivo no controle de versão para que toda a equipe (e cada sessão futura) o compartilhe.
