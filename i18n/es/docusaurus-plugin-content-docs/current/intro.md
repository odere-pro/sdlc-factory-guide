---
id: intro
title: El flujo de trabajo de ingeniería agéntica
description: Una guía práctica de ocho partes para pasar del prompting ad hoc a un flujo de trabajo disciplinado en el que puedes confiar en producción.
sidebar_position: 1
slug: /
keywords: [agentic engineering, AI workflow, software development, SDLC, vibe coding]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'El flujo de trabajo de ingeniería agéntica',
      description: 'Una guía práctica de ocho partes para pasar del prompting ad hoc a un flujo de trabajo disciplinado en el que puedes confiar en producción.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/',
      },
    })}
  </script>
</head>

# El flujo de trabajo de ingeniería agéntica

Una guía práctica de ocho partes para pasar del prompting ad hoc a un flujo de trabajo disciplinado en el que puedes confiar en producción. Cada parte es autocontenida: léela, copia los ejemplos y configura esa pieza en tu propio flujo de trabajo.

El hilo conductor a lo largo de las ocho partes: **tu verdadero producto ya no es el código, sino el sistema que produce código.** El modelo es una pequeña parte de ese sistema. Todo lo que construyes a su alrededor (reglas, contexto, pruebas, revisión, observabilidad) es lo que determina si el resultado es confiable.

## La serie

1. **[Configura el archivo de reglas](/docs/rule-file)** — dale al agente el conocimiento del proyecto que necesitaría un compañero nuevo.
2. **[Diseña el contexto](/docs/context-engineering)** — controla qué ve el agente y cuándo.
3. **[Construye la verificación](/docs/verification)** — pruebas y evaluaciones como el contrato con la IA.
4. **[Ejecuta el trabajo](/docs/running-the-work)** — conductor vs. orquestador, y dónde encajan los agentes en tu día.
5. **[Revisa y despliega](/docs/review-and-ship)** — detecta los fallos que "parecen correctos".
6. **[Controla el costo](/docs/controlling-cost)** — costo total de propiedad y enrutamiento de modelos.
7. **[Despliega agentes en producción](/docs/production-agents)** — de un script prototipo a un producto con su infraestructura.
8. **[Conviértelo en un estándar de equipo](/docs/team-standard)** — versiona el harness, valida con evaluaciones, contrata por criterio.

## Cómo usar esto

- **¿Desarrollador en solitario?** Las partes 1–6 son suficientes para transformar tu flujo de trabajo diario. Empieza por la Parte 1.
- **¿Construyendo un producto con IA?** Añade la Parte 7.
- **¿Liderando un equipo?** Las partes 1–8, con énfasis especial en 3, 5 y 8.

---

Fuente: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
