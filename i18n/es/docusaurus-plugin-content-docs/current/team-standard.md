---
id: team-standard
title: "Parte 8 — Conviértelo en un estándar de equipo"
description: Versiona el harness, valida con evaluaciones y no con demos, reforma la revisión de código y contrata por criterio en una organización de ingeniería con IA como eje central.
sidebar_position: 10
keywords: [team standard, engineering culture, CI gates, eval suite, hiring]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 8 — Conviértelo en un estándar de equipo',
      description: 'Versiona el harness, valida con evaluaciones y no con demos, reforma la revisión de código y contrata por criterio en una organización de ingeniería con IA como eje central.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/team-standard',
      },
    })}
  </script>
</head>

# Parte 8 — Conviértelo en un estándar de equipo

Todo lo que hay en las primeras siete partes funciona para un desarrollador en solitario. En el momento en que hay un equipo involucrado, aparece un modo de fallo adicional: el harness se desvía. El archivo de reglas de una persona dice una cosa, el de otra dice algo diferente, el comportamiento del agente se vuelve irreproducible en todo el equipo y la disciplina se erosiona en silencio. Esta parte trata sobre convertir el flujo de trabajo en un estándar compartido y duradero.

El principio subyacente a tener en mente: **la IA amplifica la cultura de ingeniería en la que aterriza.** Un equipo con pruebas sólidas, estándares claros y una revisión saludable obtiene mucho más de estas herramientas. Un equipo sin eso se vuelve más rápido produciendo problemas. El objetivo de estandarizar es hacer que la buena cultura sea el camino de menor resistencia.

## Trata el harness como código

Los archivos de reglas, los prompts del sistema, las suites de evaluación y las bibliotecas de habilidades no son configuración personal — son infraestructura compartida. Trátalos exactamente como código:

- **Versiónalos** con el proyecto.
- **Revísalos en pull requests**, como cualquier otro cambio.
- **Asigna propietarios con nombre**, para que se mantengan intencionalmente en lugar de degradarse.

Sin esto, el agente de cada desarrollador se comporta de forma ligeramente diferente y nadie puede reproducir los resultados de los demás.

## Valida con la evaluación, no con la demo

Una demo funcional demuestra que un agente puede tener éxito *una vez*. Una suite de evaluaciones que pasa demuestra que tiene éxito *de forma confiable*. Los dos no son lo mismo, y desplegar por la solidez de una demo es como los agentes poco confiables llegan a producción.

Haz que la cobertura de evaluaciones sea una condición previa para desplegar, de la misma manera que condicionarías un servicio a la cobertura de pruebas. Pero una evaluación sin una rúbrica clara no mide nada — así que define qué estás puntuando:

- Éxito de la tarea
- Calidad del uso de herramientas
- Cumplimiento de la trayectoria
- Tasa de alucinaciones
- Calidad de la respuesta

Un gate de CI lo hace real:

```yaml
# ci: block merge if the agent's eval suite regresses
agent-evals:
  run: eval-suite --rubric rubric.yaml --min-score 0.9
  on: [pull_request]
  required: true
```

## Reforma la revisión de código para el código generado

El código generado necesita el mismo escrutinio que el código humano, o más — y los revisores necesitan conocer sus modos de fallo específicos. Capacítalos para buscar dependencias alucinadas, manejo de errores superficial y brechas de corrección que parecen correctas a primera vista (Parte 5). Ajusta la lista de verificación de revisión a esos patrones en lugar de reutilizar sin cambios la lista del código humano.

## Traza la línea prototipo/producción de forma explícita

La exploración rápida y libre y el trabajo de producción disciplinado son ambos válidos — pero solo cuando todos saben cuál es cuál. Haz el límite explícito:

- Qué **repos** son de producción vs. sandbox.
- Qué **ramas** requieren la disciplina completa.
- A qué **entornos** puede llegar el output de un agente.

Los equipos que dejan esto ambiguo producen prototipos que se despliegan por accidente. Un límite escrito mantiene la exploración rápida y la producción segura al mismo tiempo.

## Construye el harness una vez, refínalo muchas veces

Los prompts reutilizables, las bibliotecas de habilidades, las conexiones de herramientas y los harnesses de evaluación se acumulan entre proyectos. Los equipos que más aprovechan el desarrollo con IA son los que construyen este harness compartido una vez y siguen mejorándolo, en lugar de que cada persona reconstruya el suyo desde cero. Trátalo como infraestructura: documentada, mantenida, mejorada deliberadamente.

## Contrata y promueve por criterio

A medida que la implementación se abarata, el cuello de botella se desplaza hacia la especificación, la evaluación y el criterio arquitectónico. Los ingenieros más valiosos en los próximos años serán los que puedan dirigir agentes bien — no los que puedan escribir más código. Refleja eso en cómo contratas, nivelar y desarrollas a las personas: pondera la habilidad de especificación, el rigor en la evaluación y el diseño de sistemas por encima de la velocidad de implementación pura.

Las configuraciones más sólidas son híbridas por diseño: los humanos establecen la dirección, los agentes implementan, y protocolos de traspaso claros gobiernan el límite. La revisión de código, las guardias y la estructura del equipo evolucionan para tratar a los agentes como participantes, no solo como herramientas.

## Configura tu propio flujo de trabajo

- [ ] Mueve los archivos de reglas, prompts, evaluaciones y habilidades al repositorio; exige revisión en PR para los cambios.
- [ ] Asigna un propietario para el harness compartido.
- [ ] Añade un gate de CI que bloquee las fusiones cuando la suite de evaluaciones cae por debajo de un umbral.
- [ ] Escribe una guía de una página sobre los modos de fallo del código generado.
- [ ] Documenta el límite prototipo/producción: repos, ramas, entornos.
- [ ] En tu próximo proceso de contratación, añade un ejercicio de especificación y evaluación, no solo una prueba de codificación.

---

Fuente: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
