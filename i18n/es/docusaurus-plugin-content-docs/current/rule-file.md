---
id: rule-file
title: "Parte 1 — Configura el archivo de reglas"
description: Crea el documento de incorporación que necesita tu agente de IA — stack, convenciones, reglas estrictas y flujo de trabajo en CLAUDE.md o AGENTS.md.
sidebar_position: 3
keywords: [rule file, CLAUDE.md, AGENTS.md, AI configuration, coding agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 1 — Configura el archivo de reglas',
      description: 'Crea el documento de incorporación que necesita tu agente de IA — stack, convenciones, reglas estrictas y flujo de trabajo en CLAUDE.md o AGENTS.md.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/rule-file',
      },
    })}
  </script>
</head>

# Parte 1 — Configura el archivo de reglas

Un agente de codificación llega a tu repositorio como un ingeniero nuevo en su primer día, excepto que no puede hacer preguntas. Infiere. Y sin ninguna referencia, infiere de manera predecible equivocada: el patrón de gestión de estado incorrecto, la estructura de carpetas incorrecta, la convención de pruebas incorrecta, la ruta de importación incorrecta.

El archivo de reglas es el documento de incorporación que ese ingeniero nuevo nunca tiene la oportunidad de pedirte que escribas. Es la hora de mayor apalancamiento en toda esta guía, porque toda interacción futura en el proyecto lo hereda.

## Por qué funciona

La mayoría de las personas intentan corregir el mal output de la IA escribiendo prompts más ingeniosos. Ese es el lever equivocado. La calidad del output depende mucho más de lo que el agente *sabe sobre tu proyecto* que de cómo formulas una solicitud. Un archivo de reglas codifica ese conocimiento una sola vez, así que dejas de reexplicarlo en cada sesión.

El archivo recibe nombres distintos según la herramienta — `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` — pero el contenido es la misma idea: quién es el agente en este repositorio, qué debe hacer y qué nunca debe hacer.

## Qué incluir

Cuatro partes. Mantén cada una corta y específica.

1. **Stack y versiones** — para que el agente deje de adivinar qué APIs existen.
2. **Convenciones** — los patrones que *realmente* usas, no las mejores prácticas genéricas.
3. **Reglas estrictas** — las cosas que nunca deben ocurrir.
4. **Flujo de trabajo** — los pasos a seguir antes y después de generar código.

## Un ejemplo real

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

Observa lo que esto *no* es: no es un prompt ni es un tutorial sobre FastAPI. Es un conjunto de instrucciones operativas específicas para este código base. Un modelo generalista ya conoce FastAPI; lo que no sabe es que *tus* rutas deben mantenerse delgadas y que *tu* regla sobre secretos es absoluta.

## Hazlo crecer mediante correcciones

No intentes escribir el archivo perfecto desde el principio. Empieza con diez líneas y deja que los fallos reales te enseñen qué añadir. El ciclo es simple:

- El agente hace algo que no quieres.
- Añades una regla que lo impide.
- Nunca vuelve a ocurrir.

Por ejemplo, supón que el agente sigue inventando un archivo `utils.py` genérico. Añades:

```markdown
- No catch-all `utils.py`. Helpers live next to the feature that uses them.
```

Cada regla es barata de añadir y rinde beneficios en cada tarea posterior. En pocas semanas tendrás un archivo que hace que el agente se comporte como alguien que ha trabajado en el proyecto durante meses.

## Define también las herramientas

El archivo de reglas es también donde le indicas al agente qué herramientas puede usar y cuándo — APIs internas específicas, scripts, esquemas de base de datos. Una descripción de una línea sobre *cuándo* invocar una herramienta evita que el agente la ignore o la use mal.

```markdown
## Tools
- `scripts/seed_db.py` — reset local data. Use before running integration tests.
- Internal `billing-api` (OpenAPI at /openapi.json) — never call in tests; mock it.
```

## Tú decides la arquitectura; el agente la implementa

Un límite que debes mantener con firmeza: el agente es bueno *implementando* una arquitectura, y malo *eligiendo* una. Las compensaciones entre consistencia y disponibilidad, o entre construir y comprar, dependen de un contexto de negocio que el modelo no puede ver. Toma esas decisiones tú mismo, escríbelas y deja que el agente construya sobre ellas. Una nota de arquitectura clara en el archivo de reglas convierte al agente en un implementador consistente en lugar de un improvisador.

## Configura tu propio flujo de trabajo

- [ ] Crea el archivo de reglas en la raíz de tu repositorio usando la convención de nomenclatura de tu herramienta.
- [ ] Escribe diez líneas: stack, dos o tres convenciones, dos o tres reglas estrictas, un flujo de trabajo breve.
- [ ] Añade una sección `## Tools` que liste los scripts/APIs que el agente debe y no debe usar.
- [ ] Durante la próxima semana, añade una regla cada vez que el agente se comporte mal.
- [ ] Confirma el archivo en el control de versiones para que todo el equipo (y cada sesión futura) lo comparta.
