---
id: context-engineering
title: "Parte 2 — Engenharia de Contexto"
description: Controle o que o agente vê e quando — contexto estático vs dinâmico, skills para divulgação progressiva e design consciente de custo.
sidebar_position: 4
keywords: [context engineering, dynamic context, skills, tokens, prompt design]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 2 — Engenharia de Contexto',
      description: 'Controle o que o agente vê e quando — contexto estático vs dinâmico, skills para divulgação progressiva e design consciente de custo.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/context-engineering',
      },
    })}
  </script>
</head>

# Parte 2 — Engenharia de contexto

A engenharia de contexto é a habilidade que separa saídas de IA rápidas de saídas de IA *úteis*. O arquivo de regras da Parte 1 é uma peça disso. Esta parte trata da disciplina mais ampla: decidir o que o agente vê e quando.

A mudança mental é afastar-se de "como formulo isso para enganar o modelo a gerar bom código?" e caminhar em direção a "o que um novo colega de equipe precisaria saber para contribuir bem e como entrego isso de forma eficiente?"

## Os dois baldes: estático e dinâmico

Cada pedaço de contexto cai em um de dois baldes, e escolher o balde é uma decisão de engenharia real com custo real.

**Contexto estático** é sempre carregado, em cada solicitação:

- Instruções do sistema
- Arquivos de regras (`CLAUDE.md` e similares)
- Memória global e persona

É confiável — o agente nunca esquece — mas caro, porque você paga por cada token em cada chamada, independentemente de a tarefa atual precisar ou não.

**Contexto dinâmico** é carregado apenas quando necessário:

- Skills ativadas pela tarefa em questão
- Resultados de ferramentas extraídos durante a execução
- Documentos recuperados de um índice de busca
- A fatia recente do histórico de conversa

É eficiente — você paga apenas quando a informação é de fato relevante.

A armadilha nos dois extremos: contexto estático demais desperdiça dinheiro e *dilui o sinal* (as regras importantes se afogam no ruído), enquanto contexto estático de menos faz o agente esquecer coisas que precisava. Trate a linha estático/dinâmico como qualquer outra decisão arquitetural — revisada e versionada, não acidental.

## Uma intuição rápida de custo

Digamos que seu arquivo de regras tem 2.000 tokens e você faz 50 solicitações em uma sessão. São 100.000 tokens só do arquivo de regras, pagos 50 vezes. Se metade desse arquivo é material de referência relevante apenas para uma tarefa, você está queimando dinheiro nas outras 49 solicitações que não precisavam disso. Mova essa metade para uma skill que carrega sob demanda e o custo desaparece para as outras 49.

É por isso que "mantenha o contexto estático denso e com alto sinal" não é uma preferência de estilo — é uma linha de orçamento.

## Skills: o padrão para contexto dinâmico

A forma mais eficaz de gerenciar o balde dinâmico é uma **skill**: um pacote autocontido de conhecimento procedural que o agente carrega apenas quando uma tarefa corresponde a ela.

As skills funcionam por meio de *divulgação progressiva* — três camadas, carregadas de forma lazy:

1. Na inicialização, o agente vê apenas metadados leves (um nome e uma descrição de uma linha).
2. Quando uma tarefa corresponde, ele carrega as instruções completas.
3. Somente se precisar de profundidade ele carrega o material de referência pesado.

O resultado: um agente generalista leve pode carregar dezenas de capacidades especializadas pagando o custo de tokens apenas pela que está usando ativamente.

Uma skill mínima tem esta aparência:

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

O agente só lê isso quando uma tarefa de fato menciona reembolsos. No restante do tempo, o custo é apenas a descrição de uma linha.

## Os seis tipos de contexto a gerenciar

Ao decidir o que fornecer, pense em seis categorias. A maioria dos fluxos de trabalho subestima as quatro do meio.

- **Instruções** — o papel, os objetivos e os limites do agente (seu arquivo de regras).
- **Conhecimento** — documentos, diagramas de arquitetura, dados de domínio.
- **Memória** — o que acabou de acontecer (sessão) e qual é o projeto (longo prazo).
- **Exemplos** — padrões de referência *da sua própria base de código*, não genéricos da internet.
- **Ferramentas** — definições precisas das APIs e scripts que o agente pode chamar.
- **Guardrails** — restrições rígidas e regras de segurança.

O item "exemplos" merece destaque: um único exemplo retirado do seu código real ensina o estilo do agente mais rápido do que três parágrafos de descrição.

## Não cole o repositório inteiro

Uma falha comum é despejar um repositório inteiro de 100.000 tokens no prompt "para ele ter tudo." Isso é ao mesmo tempo caro e contraproducente — o sinal relevante se perde. Em vez disso, recupere os poucos arquivos que importam para a tarefa atual e deixe o agente pedir mais. Consciência de toda a base de código é trabalho da ferramenta (indexação, recuperação), não algo que você faz manualmente a cada prompt.

## Configure seu próprio fluxo de trabalho

- [ ] Liste tudo o que está atualmente no seu contexto estático. Para cada item, pergunte: toda *tarefa* precisa disso?
- [ ] Mova material específico de tarefa para fora do arquivo de regras e para skills.
- [ ] Escreva sua primeira skill para uma tarefa especializada recorrente (um fluxo de reembolso, um padrão de migração, um formato de relatório).
- [ ] Adicione alguns exemplos reais da sua base de código ao arquivo de regras ou a uma skill.
- [ ] Pare de colar arquivos inteiros; deixe a recuperação trazer o que for relevante.
