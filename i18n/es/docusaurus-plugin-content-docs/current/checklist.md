---
id: checklist
title: Lista de verificación de implementación
description: Lista de verificación accionable y completa para configurar un flujo de trabajo de ingeniería agéntica — desde los archivos de reglas hasta los estándares de equipo.
sidebar_position: 2
keywords: [checklist, implementation, setup, agentic engineering, AI development]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Lista de verificación de implementación',
      description: 'Lista de verificación accionable y completa para configurar un flujo de trabajo de ingeniería agéntica — desde los archivos de reglas hasta los estándares de equipo.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/checklist',
      },
    })}
  </script>
</head>

# Ingeniería agéntica — Lista de verificación de implementación

## Contenido
1. [Configura el archivo de reglas](#1-configura-el-archivo-de-reglas)
2. [Diseña el contexto](#2-diseña-el-contexto)
3. [Construye la verificación](#3-construye-la-verificación)
4. [Ejecuta el trabajo](#4-ejecuta-el-trabajo)
5. [Revisa y despliega](#5-revisa-y-despliega)
6. [Controla el costo](#6-controla-el-costo)
7. [Despliega agentes en producción](#7-despliega-agentes-en-producción)
8. [Conviértelo en un estándar de equipo](#8-conviértelo-en-un-estándar-de-equipo)

---

## 1. Configura el archivo de reglas

- [ ] Crea un `CLAUDE.md` / `AGENTS.md` en la raíz del repositorio. Empieza con 10 líneas.
- [ ] Cubre cuatro aspectos:
  - [ ] Stack y versiones
  - [ ] Convenciones (estructura de carpetas, nomenclatura, los patrones que realmente usas)
  - [ ] Reglas estrictas que el agente nunca debe romper (paquetes prohibidos, manejo de secretos, capas de la arquitectura)
  - [ ] Flujo de trabajo a seguir antes de generar código
- [ ] Añade una regla nueva cada vez que el agente haga algo que no quieres que se repita.
- [ ] Lista las herramientas que el agente puede invocar y cuándo usar cada una (APIs, scripts, esquemas de BD).
- [ ] Toma las decisiones de arquitectura tú mismo; deja que el agente las implemente, no que las elija.

## 2. Diseña el contexto

- [ ] Decide qué es **estático** (siempre cargado) vs. **dinámico** (cargado bajo demanda):
  - [ ] Estático: archivos de reglas, instrucciones del sistema, memoria global
  - [ ] Dinámico: habilidades, resultados de herramientas, documentos recuperados, historial reciente
- [ ] Mantén el contexto estático corto y de alta señal. Elimina todo lo que el agente no necesite en cada llamada.
- [ ] Mueve el conocimiento reutilizable a habilidades que se cargan solo cuando la tarea coincide.
- [ ] Nunca pegues todo el repositorio en el prompt. Recupera únicamente lo relevante.

## 3. Construye la verificación

- [ ] Escribe pruebas antes de generar la funcionalidad. Las pruebas son la especificación.
- [ ] Escribe evaluaciones para las partes no deterministas:
  - [ ] ¿Tomó el agente un camino sensato?
  - [ ] ¿Eligió las herramientas correctas?
  - [ ] ¿Cumple el resultado con el nivel de calidad requerido?
- [ ] Verifica tanto el resultado (compila, las pruebas pasan) como la trayectoria (cómo llegó allí).
- [ ] Configura el bucle de retroalimentación:
  - [ ] Ejecutar contra una suite de referencia
  - [ ] Agrupar los fallos por causa raíz
  - [ ] Corregir el prompt o la herramienta que los causó
  - [ ] Volver a ejecutar una suite de regresión
  - [ ] Monitorear producción en busca de nuevos fallos

## 4. Ejecuta el trabajo

- [ ] Elige un modo por tarea:
  - [ ] **Conductor** (tiempo real, en el IDE) para lógica compleja, depuración, código desconocido
  - [ ] **Orquestador** (asíncrono, delegar y revisar) para corrección de bugs, migraciones, generación de pruebas
- [ ] Elige la ubicación del agente por tarea:
  - [ ] Agente en el editor — ediciones y sugerencias en el flujo de trabajo
  - [ ] Agente en la terminal — trabajo con múltiples archivos, ejecutar y reaccionar
  - [ ] Agente en segundo plano — tareas que puedes especificar en un párrafo y olvidar
- [ ] Ejecuta la generación de código dentro de un sandbox, usando solo herramientas aprobadas.
- [ ] Gestiona tú mismo el último 20 %: casos borde, manejo de errores, puntos de integración, lógica de negocio. El código que "parece correcto" es donde se esconden los bugs.

## 5. Revisa y despliega

- [ ] Usa el agente como revisor de primera pasada (bugs, estilo, seguridad, rendimiento).
- [ ] Revisa cada línea que se despliega:
  - [ ] Sé escéptico con el código ingenioso
  - [ ] Confirma que los paquetes importados existen
  - [ ] Verifica el manejo de errores ante fallos realistas
- [ ] Añade hooks en los puntos de commit/edición (p. ej., bloquear commits con secretos en duro).
- [ ] Activa la observabilidad: trazas, resultados de evaluaciones, tokens/latencia/costo, deriva.
- [ ] Apunta el agente al código legado que has estado evitando: refactorizaciones, migraciones, APIs deprecadas.

## 6. Controla el costo

- [ ] Mide el costo total de propiedad, no solo la velocidad.
- [ ] Eleva la tasa de éxito en primera pasada con un archivo de reglas preciso para evitar bucles de reintento.
- [ ] Enruta los modelos por tarea:
  - [ ] Modelos de frontera para arquitectura e implementación compleja
  - [ ] Modelos económicos para generación de pruebas, revisión, monitoreo de CI
- [ ] Usa contexto dinámico y habilidades para pagar solo por los tokens que necesitas.

## 7. Despliega agentes en producción

- [ ] Decide qué estás construyendo:
  - [ ] Un script — el agente es el destino
  - [ ] Un producto para usuarios reales — el agente necesita una infraestructura de soporte
- [ ] Para productos, añade: memoria persistente, permisos con alcance limitado, cobertura de evaluaciones en CI, trazas de ejecuciones completas.
- [ ] Usa un bundle de habilidades para que tu agente de codificación existente gestione compilar → evaluar → desplegar → observar.
- [ ] Para configuraciones multiagente, coordina mediante estado compartido, MCP para herramientas y A2A para delegación.

## 8. Conviértelo en un estándar de equipo

- [ ] Versiona los archivos de reglas, los prompts, las suites de evaluación y las habilidades. Revísalos en PRs. Asigna propietarios.
- [ ] Condiciona el despliegue a una suite de evaluaciones aprobada con un criterio claro, no a una demo funcional.
- [ ] Capacita a los revisores en cómo falla el código generado.
- [ ] Deja explícita la frontera prototipo/producción (qué repos, ramas, entornos).
- [ ] Construye el harness una vez y sigue refinándolo.
- [ ] Contrata y promueve por criterio: especificación, evaluación, arquitectura.

---

### Referencia

Basado en *The New SDLC With Vibe Coding* (Google):
https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
