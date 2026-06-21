---
id: running-the-work
title: "Parte 4: Ejecuta el trabajo"
description: Modos conductor vs. orquestador y dónde encajan los agentes — editor, terminal y segundo plano — además del problema del 80 %.
sidebar_position: 6
keywords: [agent modes, conductor, orchestrator, sandbox, code generation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 4: Ejecuta el trabajo',
      description: 'Modos conductor vs. orquestador y dónde encajan los agentes — editor, terminal y segundo plano — además del problema del 80 %.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/running-the-work',
      },
    })}
  </script>
</head>

# Parte 4: Ejecuta el trabajo

Ya tienes un archivo de reglas, contexto diseñado y verificación en marcha. Ahora realizas el trabajo propiamente dicho. Las dos preguntas que deciden qué tan bien va: en qué *modo* estás y qué *tipo* de agente encaja con la tarea.

## Dos modos: conductor y orquestador

La mayoría de los desarrolladores alterna entre dos modos a lo largo del día. Exigen habilidades diferentes, y usar el incorrecto para la tarea es una fuente común de frustración.

**El modo conductor** es en tiempo real y práctico. Estás en el editor, viendo aparecer el código, dirigiendo con prompts y correcciones, manteniendo un control fino. Comprendes cada cambio a medida que se realiza.

- Ideal para: lógica compleja, depuración complicada, código base desconocido — en cualquier lugar donde necesites entender cada paso.
- El riesgo: si diriges cada pulsación de tecla, *tú* te conviertes en el cuello de botella y la aceleración desaparece.

**El modo orquestador** es asíncrono y de nivel superior. Defines un objetivo, lo delegas a un agente y revisas el resultado — no las pulsaciones de tecla. Los agentes pueden ejecutarse en segundo plano, en paralelo, en diferentes partes del código base.

- Ideal para: trabajo bien especificado — corrección de bugs, migraciones, generación de pruebas, funcionalidades que siguen un patrón establecido.
- La condición: requiere *más* disciplina por adelantado, no menos. Debes escribir una especificación precisa antes de poder delegar. El beneficio llega en la segunda tarea, no en la primera.

El modo orquestador recompensa un conjunto de habilidades diferente al de la fluidez sintáctica:

- **Especificación** — definir la tarea con suficiente precisión para que un agente la ejecute sin adivinar.
- **Descomposición** — dividir el trabajo grande en unidades del tamaño de un agente.
- **Evaluación** — juzgar la calidad del output rápidamente.
- **Diseño de sistemas** — construir las restricciones y los bucles de retroalimentación que mantienen a los agentes productivos.

## Tres lugares donde los agentes encajan en tu día

Viendo la misma imagen desde otro ángulo, los agentes aparecen en tres ubicaciones. La mayoría de las personas usa las tres.

- **En el editor** — completado en línea y chat integrado, con conciencia de todo el código base. Aquí es donde te mantienes en el flujo. (Copilot, Cursor, Windsurf, JetBrains AI.)
- **En la terminal** — lanzas el agente, le entregas un objetivo en lenguaje natural y lo dejas trabajar en múltiples archivos, ejecutar herramientas y pruebas, y reaccionar a los resultados. Aquí es donde ocurre el trabajo práctico serio. (Claude Code, Codex CLI y similares.)
- **En segundo plano** — el agente se ejecuta de forma autónoma en un sandbox, a veces durante horas, y entrega un pull request para revisar más tarde. (Jules, modo agente de Copilot, agentes en segundo plano de Cursor.)

El mapeo es intuitivo una vez que lo ves: los agentes en el editor encajan *mientras escribes*; los agentes en la terminal encajan para *exploración de múltiples archivos y ejecutar-y-reaccionar*; los agentes en segundo plano encajan para *cualquier cosa que puedas describir en un párrafo y dejar correr*. El punto de partida correcto es la tarea, no la herramienta que reclama más autonomía.

## Ejecuta dentro de un sandbox

Cuando el agente ejecuta código — corriendo pruebas, probando una corrección, leyendo archivos — debe hacerlo dentro de un sandbox aislado con un conjunto definido y limitado de herramientas y acceso. Esto es lo que hace que el bucle autónomo "pensar → actuar → observar" sea seguro: el agente puede intentar cosas y fallar sin tocar nada que no debería.

## El problema del 80 % (dónde falla)

Un agente generará aproximadamente el 80 % de una funcionalidad rápidamente. El 20 % restante — casos borde, manejo de errores, puntos de integración, corrección sutil — necesita un contexto profundo que el modelo generalmente carece. Y precisamente aquí es donde viven los fallos de producción.

El peligro ha cambiado. Los primeros errores de IA eran errores de sintaxis obvios. Los errores de hoy son *conceptuales*: una suposición incorrecta sobre la lógica de negocio, un caso borde omitido, una elección arquitectónica que acumula deuda de mantenimiento en silencio. Son difíciles de detectar precisamente porque **el código parece correcto e incluso puede pasar las pruebas básicas.**

En concreto:

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)
```

El 20 % que falta es todo lo que el agente no supo preguntar: ¿Puede `percent` superar 100? ¿Es `price` un valor entero en centavos o un float? ¿Qué redondeo de moneda aplica? ¿Debe permitirse un descuento del 100 % o eso señala un bug aguas arriba? Ninguna de estas cosas es visible en el código — son reglas de negocio que tú conoces y el modelo no.

Los desarrolladores que lo hacen bien no intentan ir más rápido aceptándolo todo. Usan el agente para el 80 % bien especificado y dedican su propia atención al 20 % que necesita criterio.

## Configura tu propio flujo de trabajo

- [ ] Antes de una tarea, elige conscientemente conductor u orquestador — y nota cuándo estás dirigiendo trabajo que deberías haber delegado.
- [ ] Empareja la ubicación del agente con la tarea: editor para el flujo de trabajo, terminal para múltiples archivos, segundo plano para lo que puedes dejar correr.
- [ ] Asegúrate de que la ejecución de código ocurra en un sandbox con acceso limitado.
- [ ] Para cada funcionalidad, escribe el 20 % — los casos borde y las reglas de negocio — y revisa esas líneas tú mismo, aunque las pruebas pasen.
