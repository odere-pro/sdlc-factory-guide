---
id: production-agents
title: "Parte 7 — Despliega agentes en producción"
description: De un script prototipo a un agente en producción — memoria persistente, permisos con alcance limitado, cobertura de evaluaciones y coordinación multiagente.
sidebar_position: 9
keywords: [production agents, MCP, A2A, agent deployment, multi-agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 7 — Despliega agentes en producción',
      description: 'De un script prototipo a un agente en producción — memoria persistente, permisos con alcance limitado, cobertura de evaluaciones y coordinación multiagente.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/production-agents',
      },
    })}
  </script>
</head>

# Parte 7 — Despliega agentes en producción

Todo lo anterior ha sido sobre usar agentes para construir software. Esta parte trata de cuando lo que estás construyendo *es* un agente — un bot de soporte al cliente, un asistente de investigación, una herramienta interna de monitoreo. Estos no son scripts que ejecutas una vez; son productos que sirven a usuarios reales, y necesitan más infraestructura debajo.

## Primero, decide qué estás construyendo realmente

La pregunta más útil antes de empezar:

- **¿Es esto un script?** Una automatización de un solo uso, una herramienta personal, un prototipo. El agente es el destino. Un agente de codificación regular en tu terminal es suficiente.
- **¿Es esto un producto?** Algo de lo que dependen usuarios reales. El agente ahora es el producto, y necesita una infraestructura de soporte debajo: sus propias herramientas, memoria, evaluación e infraestructura de despliegue.

Confundir ambos es como los prototipos se despliegan por accidente. Sé explícito sobre cuál estás construyendo antes de escribir nada.

## Lo que un agente en producción necesita y un script no

Cuando usuarios reales dependen del agente, cuatro cosas dejan de ser opcionales:

- **Memoria persistente** entre sesiones, para que el agente no empiece desde cero cada vez.
- **Permisos con alcance limitado** en cada herramienta y fuente de datos, para que el agente solo pueda acceder a lo que debe.
- **Cobertura de evaluaciones** ejecutándose en CI, para que las regresiones se detecten antes de desplegarse (esto es la Parte 3, aplicada al agente mismo).
- **Observabilidad** que rastrea lo que el agente realmente hizo, para que el comportamiento en producción sea auditable (esto es la Parte 5, aplicada al agente mismo).

Para un script de un solo uso, nada de esto vale el esfuerzo. Para un producto, construirlo *después* del lanzamiento en lugar de antes es como terminar con un sistema imposible de mantener y en el que no se puede confiar.

## Mantén un único flujo de trabajo del prototipo a la producción

El cambio que hace esto práctico: el mismo flujo de trabajo basado en la terminal que produce un prototipo ahora llega hasta un producto desplegado. No aprendes un stack separado para ir a producción. Describes lo que quieres, y un bundle de habilidades (del tipo de la Parte 2) le da a tu agente de codificación existente el ciclo de vida completo — andamiar, escribir, evaluar, desplegar, conectar la observabilidad — sin un nuevo SDK.

El bucle, de principio a fin, parece una conversación:

```
# one-time setup of the skills bundle, then, in your coding agent:
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

Detrás de eso, el agente andamia el proyecto desde una plantilla, escribe el código, genera un conjunto de evaluaciones, lo ejecuta, despliega e informa. Para quienes prefieren conducir directamente, los mismos pasos están disponibles como comandos CLI simples. El resultado: el prototipo que corría en tu laptop ayer se convierte en el agente en producción que sirve a usuarios hoy, sin una reescritura.

## Configuraciones multiagente

Cuando un agente no es suficiente, la coordinación ocurre mediante tres mecanismos, usados a diferentes escalas:

- **Estado de sesión compartido** — para casos simples donde los agentes solo necesitan ver el mismo contexto.
- **MCP (Model Context Protocol)** — la forma estándar en que los agentes acceden a herramientas y servicios externos.
- **A2A (Agent2Agent)** — para que un agente delegue trabajo a otro.

Estos se combinan en el patrón que mejor encaja: un planificador pasando subtareas a especialistas, trabajadores en paralelo en diferentes partes de un trabajo, un agente revisor verificando a un agente constructor. El cuello de botella pasa de escribir la implementación a especificar qué debe hacer cada agente y verificar que lo hizo — el mismo tema que el resto de esta guía, un nivel más arriba.

## Configura tu propio flujo de trabajo

- [ ] Para tu próximo agente, escribe una oración: "esto es un script" o "esto es un producto". Deja que eso decida cuánta infraestructura construyes.
- [ ] Si es un producto, añade los cuatro elementos esenciales: memoria persistente, permisos con alcance limitado, evaluaciones en CI, rastreo de ejecuciones.
- [ ] Usa un bundle de habilidades para que compilar → evaluar → desplegar → observar permanezca en un único flujo de trabajo.
- [ ] Si necesitas múltiples agentes, empieza con estado compartido; recurre a MCP y A2A solo cuando la coordinación lo requiera realmente.
