---
id: controlling-cost
title: "Parte 6: Controla el costo"
description: Costo total de propiedad en flujos de trabajo con IA — tasa de éxito en primera pasada, enrutamiento de modelos por tarea y contexto dinámico como control de costos.
sidebar_position: 8
keywords: [cost control, token economy, model routing, TCO, AI cost]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 6: Controla el costo',
      description: 'Costo total de propiedad en flujos de trabajo con IA — tasa de éxito en primera pasada, enrutamiento de modelos por tarea y contexto dinámico como control de costos.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/controlling-cost',
      },
    })}
  </script>
</head>

# Parte 6: Controla el costo

La pregunta habitual sobre el desarrollo con IA es "¿qué tan rápido podemos entregar?". La pregunta más adecuada es "¿cuánto cuesta mantener esto?". La velocidad oculta la economía real. La métrica honesta es el costo total de propiedad, y en un flujo de trabajo con IA está dominada por una sola cosa: la economía de tokens.

## La deuda oculta de ir rápido

El prompting ad hoc parece casi gratuito — una suscripción y algunos prompts casuales, costo inicial casi nulo. La factura llega después, y se acumula:

- **Quema de tokens.** Volcar archivos enormes y no estructurados en la ventana de contexto y pedirle al modelo que corrija sus propios errores no verificados crea un costoso bucle de reintentos con una tasa de éxito baja en primera pasada. Cada intento fallido son tokens gastados en vano.
- **Impuesto de mantenimiento.** El código generado no estructurado carece de consistencia. Seis meses después, un ingeniero pasa días haciendo ingeniería inversa de "spaghetti" que nadie diseñó.
- **Remediación de seguridad.** Sin un harness de evaluación, la generación rápida de código se convierte en generación rápida de vulnerabilidades. Corregir un fallo en producción cuesta mucho más que detectarlo en el momento del diseño.

El enfoque estructurado invierte esto: inviertes por adelantado en esquemas, pruebas y contexto, y el costo marginal de entregar y mantener cada funcionalidad cae drásticamente. Mayor costo para construir, mucho menor costo para mantener.

## Palanca uno: tasa de éxito en primera pasada

El token más barato es el que no gastas en un reintento. Un archivo de reglas denso y de alta señal (Parte 1) y un contexto bien gestionado (Parte 2) elevan la tasa de éxito en primera pasada del agente, lo que directamente reduce los bucles de prueba y error que queman dinero. La ingeniería de contexto no es solo una práctica de calidad — es una práctica de control de costos. El mismo `CLAUDE.md` preciso que mejora el output también reduce el gasto.

Pasar un repositorio completo de 100 000 tokens a cada prompt es financieramente inviable a escala. Recupera lo que es relevante; paga por lo que usas.

## Palanca dos: enruta por tarea

En un flujo de trabajo ad hoc, usas un gran modelo de frontera para todo — pagando precios premium para corregir un error tipográfico o generar una prueba de boilerplate. Un flujo de trabajo diseñado enruta por complejidad de tarea:

- **Arquitectura, diseño complejo** → Modelo de frontera — necesita el máximo razonamiento
- **Implementación compleja inicial** → Modelo de frontera — alto riesgo, ambigüedad
- **Generación de pruebas** → Modelo pequeño / económico — determinista, bien especificado
- **Revisión de código (primera pasada)** → Modelo pequeño / económico — coincidencia de patrones
- **Verificaciones de CI / monitoreo** → Modelo pequeño / económico — repetitivo, limitado

Una configuración de enrutamiento simple lo hace concreto:

```yaml
routing:
  default: small-fast
  rules:
    - match: ["architecture", "design", "migration plan"]
      model: frontier
    - match: ["write tests", "lint", "review diff", "ci check"]
      model: small-fast
    - match: ["implement feature"]
      model: frontier
```

Orquestar una mezcla de múltiples modelos te permite mantener la calidad del output donde importa mientras reduces el costo de la mayoría determinista del trabajo.

## Palanca tres: contexto dinámico y habilidades

Conecta esto con la Parte 2. Cargar todo estáticamente significa pagarlo en cada llamada. Mover el conocimiento específico de cada tarea a habilidades que se cargan bajo demanda — y acceder a las herramientas mediante llamadas bajo demanda en lugar de hornear todo en el prompt — mantiene pequeña la carga útil por solicitud. A escala, la diferencia entre "todo cargado siempre" y "solo lo necesario" es la diferencia entre una estructura de costos viable y una inviable.

## Una intuición con ejemplos

Supón que la tasa de éxito en primera pasada sube del 40 % al 80 % después de invertir en el archivo de reglas y un par de habilidades. Las tareas que antes necesitaban ~2,5 intentos ahora necesitan ~1,25. Eso es la mitad de los tokens para el mismo output — antes de haber enrutado una sola tarea a un modelo más económico. Apila el enrutamiento encima (modelos económicos gestionando la generación de pruebas y la revisión, que puede ser la mitad de tus llamadas) y la curva de OpEx se dobla con fuerza.

## Configura tu propio flujo de trabajo

- [ ] Deja de medir solo la velocidad; empieza a rastrear el gasto en tokens por funcionalidad entregada.
- [ ] Ajusta tu archivo de reglas específicamente para elevar la tasa de éxito en primera pasada y eliminar los bucles de reintento.
- [ ] Configura el enrutamiento de modelos: modelos económicos para generación de pruebas, revisión y CI; frontera para arquitectura e implementación compleja.
- [ ] Mueve el contexto específico de cada tarea a habilidades bajo demanda para no pagarlo en cada llamada.
- [ ] Compara el costo por funcionalidad antes y después — la inversión inicial debería reflejarse en una factura continua más baja.
