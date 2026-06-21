---
id: context-engineering
title: "Parte 2 — Diseña el contexto"
description: Controla qué ve el agente y cuándo — contexto estático vs. dinámico, habilidades para divulgación progresiva y diseño consciente del costo.
sidebar_position: 4
keywords: [context engineering, dynamic context, skills, tokens, prompt design]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 2 — Diseña el contexto',
      description: 'Controla qué ve el agente y cuándo — contexto estático vs. dinámico, habilidades para divulgación progresiva y diseño consciente del costo.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/context-engineering',
      },
    })}
  </script>
</head>

# Parte 2 — Diseña el contexto

La ingeniería de contexto es la habilidad que separa el output rápido de la IA del output *útil*. El archivo de reglas de la Parte 1 es solo una pieza de ella. Esta parte trata sobre la disciplina más amplia: decidir qué ve el agente y cuándo.

El cambio mental pasa de "¿cómo formulo esto para engañar al modelo para que produzca buen código?" a "¿qué necesitaría saber un compañero nuevo para contribuir bien, y cómo se lo entrego de forma eficiente?"

## Los dos cubos: estático y dinámico

Cada pieza de contexto cae en uno de dos cubos, y elegir el cubo es una decisión de ingeniería real con un costo real.

**El contexto estático** se carga siempre, en cada solicitud:

- Instrucciones del sistema
- Archivos de reglas (`CLAUDE.md` y similares)
- Memoria global y persona

Es confiable — el agente nunca lo olvida — pero costoso, porque pagas por cada token en cada llamada, lo necesite la tarea actual o no.

**El contexto dinámico** se carga solo cuando es necesario:

- Habilidades activadas por la tarea en curso
- Resultados de herramientas obtenidos durante la ejecución
- Documentos recuperados de un índice de búsqueda
- El fragmento reciente del historial de conversación

Es eficiente — pagas solo cuando la información es realmente relevante.

La trampa en ambos extremos: demasiado contexto estático desperdicia dinero y *diluye la señal* (las reglas importantes se ahogan en el ruido), mientras que muy poco hace que el agente olvide cosas que necesitaba. Trata la línea entre estático y dinámico como cualquier otra decisión de arquitectura — revisada y versionada, no accidental.

## Una intuición rápida sobre el costo

Supón que tu archivo de reglas tiene 2 000 tokens y haces 50 solicitudes en una sesión. Eso son 100 000 tokens solo del archivo de reglas, pagados 50 veces. Si la mitad de ese archivo es material de referencia relevante solo para una tarea, estás quemando dinero en las otras 49 solicitudes que no lo necesitaban. Mueve esa mitad a una habilidad que se carga bajo demanda y el costo desaparece para las otras 49.

Por eso "mantén el contexto estático denso y de alta señal" no es una preferencia de estilo — es una partida en el presupuesto.

## Habilidades: el patrón para el contexto dinámico

La forma más efectiva de gestionar el cubo dinámico es una **habilidad**: un paquete autocontenido de conocimiento procedimental que el agente carga solo cuando una tarea la activa.

Las habilidades funcionan mediante *divulgación progresiva* — tres capas, cargadas de forma perezosa:

1. Al inicio, el agente solo ve metadatos ligeros (un nombre y una descripción de una línea).
2. Cuando una tarea coincide, carga las instrucciones completas.
3. Solo si necesita la profundidad, extrae el material de referencia más pesado.

El resultado: un agente generalista ligero puede llevar docenas de capacidades especializadas mientras paga el costo en tokens solo por la que está usando activamente.

Una habilidad mínima se ve así:

```markdown
---
name: stripe-refunds
description: How to issue and reconcile refunds through our billing layer. Use when a task involves refunds, chargebacks, or payment reversals.
---

# Issuing a refund

1. Look up the charge via `billing.get_charge(charge_id)`.
2. Refunds over $500 require an `approved_by` field — never auto-approve.
3. Call `billing.refund(charge_id, amount, approved_by)`.
4. Write a `RefundRecord` to the ledger in the same transaction.
5. Emit a `refund.issued` event.

See `reference/refund-edge-cases.md` for partial refunds and currency conversion.
```

El agente solo lee esto cuando una tarea menciona realmente los reembolsos. El resto del tiempo no cuesta nada excepto la descripción de una línea.

## Los seis tipos de contexto a gestionar

Cuando decides qué proporcionar, piensa en seis categorías. La mayoría de los flujos de trabajo invierten poco en las cuatro del medio.

- **Instrucciones** — el rol, los objetivos y los límites del agente (tu archivo de reglas).
- **Conocimiento** — documentación, diagramas de arquitectura, datos del dominio.
- **Memoria** — lo que acaba de ocurrir (sesión) y lo que es el proyecto (largo plazo).
- **Ejemplos** — patrones de referencia *de tu propio código base*, no genéricos de internet.
- **Herramientas** — definiciones precisas de las APIs y scripts que el agente puede invocar.
- **Restricciones** — límites estrictos y reglas de seguridad.

El punto sobre los "ejemplos" merece destacarse: un solo ejemplo extraído de tu código real enseña al agente tu estilo más rápido que tres párrafos de descripción.

## No pegues todo el repositorio

Un fallo común es volcar un repositorio completo de 100 000 tokens en el prompt "para que tenga todo". Esto es tanto costoso como contraproducente — la señal relevante queda enterrada. Recupera en su lugar los pocos archivos que importan para la tarea actual y deja que el agente pida más. La conciencia del código base completo es el trabajo de la herramienta (indexación, recuperación), no algo que hagas a mano en cada prompt.

## Configura tu propio flujo de trabajo

- [ ] Lista todo lo que hay actualmente en tu contexto estático. Por cada elemento, pregunta: ¿necesita esto *cada* tarea?
- [ ] Mueve el material específico de cada tarea fuera del archivo de reglas y hacia habilidades.
- [ ] Escribe tu primera habilidad para una tarea especializada recurrente (un flujo de reembolsos, un patrón de migración, un formato de informe).
- [ ] Añade algunos ejemplos reales de tu código base al archivo de reglas o a una habilidad.
- [ ] Deja de pegar archivos completos; deja que la recuperación muestre lo relevante.
