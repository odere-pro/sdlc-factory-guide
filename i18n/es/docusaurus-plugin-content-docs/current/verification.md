---
id: verification
title: "Parte 3: Construye la verificación"
description: Las pruebas como contrato determinista y las evaluaciones para el comportamiento no determinista — el volante de calidad que se acumula con el tiempo.
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 3: Construye la verificación',
      description: 'Las pruebas como contrato determinista y las evaluaciones para el comportamiento no determinista — el volante de calidad que se acumula con el tiempo.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/verification',
      },
    })}
  </script>
</head>

# Parte 3: Construye la verificación

Aquí está la línea que decide si estás haciendo ingeniería real o simplemente apostando: **¿cómo se verifican tus outputs?** Si la respuesta es "lo ejecuto y parece funcionar", estás haciendo vibe coding, sin importar cuán sofisticados sean tus prompts. La verificación es la disciplina que hace que el output de la IA sea confiable en entornos de producción.

Dos mecanismos trabajan juntos. Las pruebas cubren lo que es determinista. Las evaluaciones cubren lo que no lo es.

## Pruebas: el contrato determinista

Las pruebas verifican las partes de tu sistema donde una entrada determinada debe producir una salida determinada. Son las mismas pruebas que escribirías de todas formas — pero en un flujo de trabajo con IA asumen un segundo trabajo: **comunican la intención al agente con más precisión que cualquier prompt.**

Una prueba es una especificación que una máquina puede verificar. Entrégale al agente una prueba fallida y "haz que pase", y le has dado un objetivo inequívoco más una forma automática de saber cuándo ha terminado. Así que escríbelas *primero*:

```python
def test_refund_over_threshold_requires_approval():
    charge = make_charge(amount=600_00)
    with pytest.raises(ApprovalRequired):
        refund_service.issue(charge.id, amount=600_00, approved_by=None)

def test_refund_writes_ledger_entry():
    charge = make_charge(amount=50_00)
    refund_service.issue(charge.id, amount=50_00, approved_by="alice")
    assert ledger.last_entry().type == "refund"
```

El agente ahora conoce la regla del umbral y el requisito del libro mayor sin que tengas que explicárselos en prosa. La prueba *es* la explicación.

## Evaluaciones: juzgar las partes no deterministas

Las pruebas no pueden cubrir todo, porque gran parte del comportamiento del agente no es determinista. ¿Tomó el agente un camino sensato hacia la respuesta? ¿Eligió las herramientas correctas? ¿Es el output final realmente bueno, y no solo sintácticamente válido? Eso es lo que miden las **evaluaciones**.

Las evaluaciones se verifican con conjuntos de datos etiquetados, rúbricas de puntuación y, a veces, un modelo actuando como juez. Hay dos variantes, y necesitas ambas:

- **Evaluación de output** — juzga el artefacto final. ¿Compila el código? ¿Pasan las pruebas? ¿Es preciso el resumen?
- **Evaluación de trayectoria** — juzga *cómo llegó allí*. ¿Llamó el agente a las herramientas correctas en un orden razonable, o tropezó hasta llegar a un resultado aceptable?

La trayectoria importa más de lo que parece. Un output fluido que saltó sus pasos de verificación es *más* peligroso que uno con un error obvio, porque oculta el riesgo. Un agente que produjo código correcto por casualidad mientras ignoraba la suite de pruebas acabará produciendo código incorrecto de la misma manera.

## Una rúbrica de evaluación concreta

Para un agente que responde preguntas de tu documentación, un conjunto de evaluaciones es una lista de casos con una rúbrica:

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

Cada ejecución puntúa: ¿mencionó los hechos requeridos, evitó los prohibidos y siguió el camino de herramientas esperado? Un modelo juez puede calificar la dimensión más suave de "¿es esta respuesta clara y correcta?" según una rúbrica que tú escribes. El punto es que "bueno" ahora está definido explícitamente y se verifica automáticamente — no a ojo.

## El volante de calidad

Las pruebas y las evaluaciones alcanzan su pleno valor cuando las conectas en un bucle que se acumula:

1. **Evaluar** contra tu suite de referencia.
2. **Diagnosticar** los fallos agrupándolos en causas raíz (no corrigiendo casos aislados).
3. **Optimizar** el prompt, la regla o la herramienta que causó el grupo.
4. **Verificar** la corrección con una suite de regresión para que permanezca corregida.
5. **Monitorear** el tráfico de producción en busca de nuevos modos de fallo, y reintroducirlos en el paso 1.

Cada vuelta de este bucle hace que la siguiente comience desde una línea de base más alta. Así es como un agente mejora de forma confiable con el tiempo sin cambiar el modelo subyacente.

## Configura tu propio flujo de trabajo

- [ ] Para tu próxima funcionalidad, escribe las pruebas antes de dejar que el agente genere código.
- [ ] Construye un pequeño conjunto de evaluaciones — incluso diez casos — para un comportamiento del agente que te importe.
- [ ] Para cada caso de evaluación, define tanto lo que el output debe contener como el camino de herramientas que esperas.
- [ ] Añade una suite de regresión que vuelva a ejecutar cada corrección.
- [ ] Elige un fallo de producción esta semana, encuentra su grupo de causa raíz y corrige la causa, no el síntoma.
