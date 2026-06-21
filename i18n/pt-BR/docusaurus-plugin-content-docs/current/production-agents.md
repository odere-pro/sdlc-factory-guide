---
id: production-agents
title: "Parte 7: Publique Agentes em Produção"
description: De script protótipo a agente em produção — memória persistente, permissões com escopo, cobertura de avaliação e coordenação multi-agente.
sidebar_position: 9
keywords: [production agents, MCP, A2A, agent deployment, multi-agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 7: Publique Agentes em Produção',
      description: 'De script protótipo a agente em produção — memória persistente, permissões com escopo, cobertura de avaliação e coordenação multi-agente.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/production-agents',
      },
    })}
  </script>
</head>

# Parte 7: Publique agentes em produção

Tudo até agora foi sobre usar agentes para construir software. Esta parte é sobre quando a coisa que você está construindo *é* um agente — um bot de suporte ao cliente, um assistente de pesquisa, uma ferramenta interna de monitoramento. Esses não são scripts que você executa uma vez; são produtos que atendem usuários reais e precisam de mais por baixo.

## Primeiro, decida o que você está realmente construindo

A pergunta mais útil antes de começar:

- **É um script?** Uma automação única, uma ferramenta pessoal, um protótipo. O agente é o destino. Um agente de codificação regular no seu terminal é suficiente.
- **É um produto?** Algo de que usuários reais dependem. O agente agora é o produto e precisa de uma infraestrutura por baixo: suas próprias ferramentas, memória, avaliação e infraestrutura de deploy.

Confundir os dois é como protótipos são publicados por acidente. Seja explícito sobre qual você está construindo antes de escrever qualquer coisa.

## O que um agente de produção precisa que um script não precisa

Quando usuários reais dependem do agente, quatro coisas deixam de ser opcionais:

- **Memória persistente** entre sessões, para o agente não começar do zero toda vez.
- **Permissões com escopo** em cada ferramenta e fonte de dados, para o agente só acessar o que deve.
- **Cobertura de avaliação** rodando no CI, para regressões serem capturadas antes de chegar à produção (é a Parte 3, aplicada ao próprio agente).
- **Observabilidade** que rastreia o que o agente realmente fez, para que o comportamento em produção seja auditável (é a Parte 5, aplicada ao próprio agente).

Para um script único isso não vale o esforço. Para um produto, construir isso *depois* do lançamento em vez de antes é como você acaba com um sistema não manutenível e não confiável.

## Mantenha um fluxo de trabalho do protótipo à produção

A mudança que torna isso prático: o mesmo fluxo de trabalho baseado no terminal que produz um protótipo agora alcança até um produto implantado. Você não aprende uma stack separada para ir à produção. Você descreve o que quer, e um pacote de skills (do tipo da Parte 2) dá ao seu agente de codificação existente o ciclo de vida completo — scaffoldar, escrever, avaliar, fazer deploy, conectar observabilidade — sem um SDK novo.

O loop, de ponta a ponta, parece uma conversa:

```
# one-time setup of the skills bundle, then, in your coding agent:
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

Por trás disso, o agente scaffolda o projeto a partir de um template, escreve o código, gera um conjunto de avaliações, roda-o, faz deploy e reporta de volta. Para quem prefere dirigir diretamente, os mesmos passos estão disponíveis como comandos CLI simples. O resultado: o protótipo que rodava no seu laptop ontem se torna o agente de produção atendendo usuários hoje, sem uma reescrita.

## Partindo para multi-agente

Quando um agente não é suficiente, a coordenação acontece por meio de três mecanismos, usados em escalas diferentes:

- **Estado de sessão compartilhado** — para casos simples onde agentes só precisam ver o mesmo contexto.
- **MCP (Model Context Protocol)** — a forma padrão de agentes acessarem ferramentas e serviços externos.
- **A2A (Agent2Agent)** — para um agente delegar trabalho a outro.

Esses se compõem em qualquer padrão que se encaixe: um planejador passando subtarefas para especialistas, trabalhadores em paralelo em diferentes partes de um trabalho, um agente revisor verificando um agente construtor. O gargalo se move de escrever a implementação para especificar o que cada agente deve fazer e verificar que ele fez — o mesmo tema do restante deste guia, um nível acima.

## Configure seu próprio fluxo de trabalho

- [ ] Para seu próximo agente, escreva uma frase: "isso é um script" ou "isso é um produto." Deixe isso decidir quanta infraestrutura você constrói.
- [ ] Se for um produto, adicione os quatro essenciais: memória persistente, permissões com escopo, avaliações no CI, rastreamento de execução.
- [ ] Use um pacote de skills para que build → avaliar → deploy → observar fique em um fluxo de trabalho.
- [ ] Se você precisar de múltiplos agentes, comece com estado compartilhado; recorra a MCP e A2A apenas quando a coordenação realmente os exigir.
