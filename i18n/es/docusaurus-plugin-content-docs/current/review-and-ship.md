---
id: review-and-ship
title: "Parte 5 — Revisa y despliega"
description: El agente como revisor de primera pasada, lista de verificación para código generado, hooks de commit y observabilidad para flujos de trabajo con IA.
sidebar_position: 7
keywords: [code review, shipping, observability, hooks, generated code]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 5 — Revisa y despliega',
      description: 'El agente como revisor de primera pasada, lista de verificación para código generado, hooks de commit y observabilidad para flujos de trabajo con IA.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/review-and-ship',
      },
    })}
  </script>
</head>

# Parte 5 — Revisa y despliega

Cuando un agente escribe el 80 % de tu código, te conviertes más en revisor que en autor. El trabajo pasa de escribir a juzgar — y ese juicio tiene que ser más agudo que antes, porque el código generado falla de maneras más silenciosas que el código humano.

## Deja que el agente haga la primera pasada

Usa el agente como revisor de primera pasada antes de que un humano vea cualquier cosa. Es bueno en la capa mecánica: detectar probables bugs, violaciones de estilo, olores de seguridad y problemas de rendimiento. Esto limpia el ruido para que el revisor humano pueda dedicar su atención a lo que realmente necesita un humano — diseño, mantenibilidad, si este cambio encaja con la dirección del sistema.

La división es el punto. La revisión de primera pasada es mecánica y se puede delegar. El juicio final sobre el diseño no lo es.

## Revisa cada línea que se despliega — con la suspicacia correcta

El reflejo de confiar en el código porque funciona es exactamente el reflejo incorrecto para el código generado. Revisa cada línea que va a producción, y apunta tu suspicacia a las formas específicas en que falla el output de IA:

- **Sé escéptico con el código ingenioso.** Las soluciones generadas a veces optan por una abstracción sofisticada donde una aburrida era la correcta. El ingenio es una señal de alerta, no un elogio.
- **Confirma que las importaciones son reales.** Los modelos alucinan paquetes con nombres plausibles. Una importación que parece correcta puede ser un paquete que no existe — o peor, un ataque de typosquatting sobre el nombre que el modelo suele inventar.
- **Verifica el manejo de errores ante fallos realistas.** El código generado tiende a cubrir bien el camino feliz y mal los caminos de fallo. Pregúntate qué ocurre cuando la llamada de red agota el tiempo de espera, la entrada está vacía o falta la fila.

El costo de saltarse esto es concreto: el código que tu equipo no entiende se convierte en costo de depuración que tu equipo no puede afrontar. Los ahorros de la generación rápida se evaporan la primera vez que alguien pasa tres días haciendo ingeniería inversa de un bloque ingenioso que nadie revisó.

## Hooks: haz que la máquina aplique las reglas que olvida

Algunas reglas son demasiado importantes para depender de la revisión. Codifícalas como **hooks** — código determinista que se ejecuta en puntos fijos del ciclo de vida (antes de una llamada a herramienta, después de una edición de archivo, antes de un commit) y bloquea automáticamente las acciones incorrectas.

Un hook de pre-commit que rechaza confirmar un secreto en duro:

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'\''"][^"'\'']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

Los hooks son donde pones las cosas que un agente (o un humano) "nunca debería olvidar pero a menudo olvida." A diferencia de una regla en un archivo, un hook no puede ser eludido con palabras.

## Observabilidad: ve lo que el agente realmente hizo

No puedes gestionar lo que no puedes ver. A medida que los agentes asumen más trabajo, establece observabilidad para poder responder "¿qué hizo y por qué?" Registra:

- **Trazas** de cada ejecución — la secuencia completa de pasos y llamadas a herramientas.
- **Resultados de evaluaciones** a lo largo del tiempo, para que las regresiones de calidad se detecten pronto.
- **Costo en tokens y latencia**, para que un flujo de trabajo que se volvió silenciosamente costoso sea visible.
- **Deriva** — el comportamiento cambia con el tiempo sin una causa obvia.

Sin esto, un agente que se porta mal es una caja negra y tu única herramienta de depuración es adivinar.

## El beneficio subestimado: el mantenimiento

Apunta tu flujo de trabajo ahora capaz al trabajo que has estado evitando. El código legado que era "demasiado arriesgado de tocar" porque solo sus autores originales lo entendían es exactamente donde un agente demuestra su valor: puede leer el código, inferir los patrones, encontrar los archivos relevantes y hacer cambios que respeten lo que hay.

Esto desbloquea trabajo que anteriormente nunca ocurría porque era demasiado tedioso y arriesgado: migraciones de frameworks, actualizaciones de APIs deprecadas, modernización de suites de pruebas antiguas. Una migración que nadie quería dedicarle un trimestre se convierte en una tarea en segundo plano bien especificada con un PR revisable al final.

## Configura tu propio flujo de trabajo

- [ ] Añade un paso de revisión de primera pasada (el agente revisa el diff) antes de la revisión humana.
- [ ] Escribe una lista de verificación de revisión para código generado: abstracciones ingeniosas, importaciones alucinadas, manejo débil de errores.
- [ ] Añade al menos un hook — empieza con el bloqueador de secretos de arriba.
- [ ] Activa el rastreo para las ejecuciones del agente y observa el costo en tokens y las puntuaciones de evaluación con el tiempo.
- [ ] Elige un fragmento de código legado "demasiado arriesgado de tocar" y dáselo al agente como una tarea delimitada y revisable.
