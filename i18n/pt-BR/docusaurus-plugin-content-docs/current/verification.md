---
id: verification
title: "Parte 3 — Construa Verificação"
description: Testes como contrato determinístico e avaliações para comportamento não determinístico — o volante de qualidade que se acumula.
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 3 — Construa Verificação',
      description: 'Testes como contrato determinístico e avaliações para comportamento não determinístico — o volante de qualidade que se acumula.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/verification',
      },
    })}
  </script>
</head>

# Parte 3 — Construa verificação

Aqui está a linha que decide se você está fazendo engenharia de verdade ou apenas apostando: **como suas saídas são verificadas?** Se a resposta é "executo e parece funcionar," você está vibe coding, independentemente de quão sofisticados são seus prompts. A verificação é a disciplina que torna a saída de IA confiável em nível de produção.

Dois mecanismos trabalham juntos. Testes cobrem o que é determinístico. Avaliações cobrem o que não é.

## Testes: o contrato determinístico

Testes verificam as partes do seu sistema onde uma entrada determinada deve produzir uma saída determinada. São os mesmos testes que você escreveria de qualquer forma — mas num fluxo de trabalho com IA eles assumem uma segunda função: **comunicam a intenção ao agente de forma mais precisa do que qualquer prompt.**

Um teste é uma especificação que uma máquina pode verificar. Entregue ao agente um teste que falha e diga "faça este passar," e você deu a ele um alvo sem ambiguidade mais uma forma automática de saber quando terminou. Portanto, escreva-os *antes*:

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

O agente agora conhece a regra de limite e o requisito do ledger sem que você os explique em prosa. O teste *é* a explicação.

## Avaliações: julgando as partes não determinísticas

Testes não conseguem cobrir tudo, porque muito do comportamento do agente não é determinístico. O agente seguiu um caminho sensato até a resposta? Escolheu as ferramentas certas? A saída final é realmente boa, não apenas sintaticamente válida? É isso que as **avaliações** medem.

Avaliações são verificadas com conjuntos de dados rotulados, rubrics de pontuação e às vezes um modelo atuando como juiz. Existem dois tipos, e você precisa de ambos:

- **Avaliação de saída** — julga o artefato final. O código compila? Os testes passam? O resumo é preciso?
- **Avaliação de trajetória** — julga *como chegou lá*. O agente chamou as ferramentas certas numa ordem razoável, ou se debateu até tropeçar num resultado aprovado?

A trajetória importa mais do que parece. Uma saída fluente que pulou suas etapas de verificação é *mais* perigosa do que uma com um erro óbvio, porque oculta o risco. Um agente que por acaso produziu código correto enquanto ignorava a suíte de testes eventualmente produzirá código incorreto da mesma forma.

## Um rubric de avaliação concreto

Para um agente que responde perguntas da sua documentação, um conjunto de avaliações é uma lista de casos mais um rubric:

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

Cada execução pontua: ele mencionou os fatos exigidos, evitou os proibidos e seguiu o caminho de ferramentas esperado? Um modelo juiz pode avaliar a dimensão mais subjetiva "esta resposta é clara e correta" com base num rubric que você escreve. O ponto é que "bom" agora é definido explicitamente e verificado automaticamente — não avaliado a olho.

## O volante de qualidade

Testes e avaliações atingem seu pleno valor quando você os conecta a um ciclo que se compõe:

1. **Avalie** contra sua suíte de benchmarks.
2. **Diagnostique** falhas agrupando-as em causas raiz (não corrigindo casos isolados).
3. **Otimize** o prompt, a regra ou a ferramenta que causou o agrupamento.
4. **Verifique** a correção contra uma suíte de regressão para que permaneça corrigida.
5. **Monitore** o tráfego de produção em busca de novos modos de falha e alimente-os de volta na etapa 1.

Cada volta deste ciclo faz a próxima começar de uma linha de base mais alta. É assim que um agente melhora de forma confiável ao longo do tempo sem alterar o modelo por baixo.

## Configure seu próprio fluxo de trabalho

- [ ] Para sua próxima funcionalidade, escreva os testes antes de deixar o agente gerar código.
- [ ] Construa um pequeno conjunto de avaliações — mesmo dez casos — para um comportamento de agente que você se importa.
- [ ] Para cada caso de avaliação, defina tanto o que a saída deve conter quanto o caminho de ferramentas que você espera.
- [ ] Adicione uma suíte de regressão que re-executa cada correção.
- [ ] Escolha uma falha de produção desta semana, encontre seu agrupamento de causa raiz e corrija a causa, não o sintoma.
