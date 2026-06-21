---
id: running-the-work
title: "Parte 4 — Execute o Trabalho"
description: Modos condutor vs. orquestrador e onde os agentes se encaixam — editor, terminal e segundo plano — mais o problema dos 80%.
sidebar_position: 6
keywords: [agent modes, conductor, orchestrator, sandbox, code generation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 4 — Execute o Trabalho',
      description: 'Modos condutor vs. orquestrador e onde os agentes se encaixam — editor, terminal e segundo plano — mais o problema dos 80%.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/running-the-work',
      },
    })}
  </script>
</head>

# Parte 4 — Execute o trabalho

Você tem um arquivo de regras, contexto engenheirado e verificação em vigor. Agora você executa o trabalho de verdade. As duas perguntas que decidem o quão bem isso vai correr: qual *modo* você está usando e qual *tipo* de agente se encaixa na tarefa.

## Dois modos: condutor e orquestrador

A maioria dos desenvolvedores alterna entre dois modos ao longo do dia. Eles exigem habilidades diferentes, e usar o modo errado para a tarefa é uma fonte comum de frustração.

**Modo condutor** é em tempo real, hands-on. Você está no editor, observando o código aparecer, dirigindo com prompts e correções, mantendo controle fino. Você entende cada mudança conforme ela é feita.

- Melhor para: lógica complexa, depuração difícil, bases de código desconhecidas — em qualquer lugar que você precise entender cada etapa.
- O risco: se você dirige cada tecla pressionada, *você* se torna o gargalo e o ganho de velocidade desaparece.

**Modo orquestrador** é assíncrono e de nível mais alto. Você define um objetivo, entrega a um agente e revisa o resultado — não as teclas pressionadas. Os agentes podem rodar em segundo plano, em paralelo, em diferentes partes da base de código.

- Melhor para: trabalho bem especificado — correções de bugs, migrações, geração de testes, funcionalidades que seguem um padrão estabelecido.
- O problema: requer *mais* disciplina antecipada, não menos. Você precisa escrever uma especificação precisa antes de poder delegar. O retorno chega na segunda tarefa, não na primeira.

O modo orquestrador recompensa um conjunto de habilidades diferente da fluência em sintaxe:

- **Especificação** — defina a tarefa com precisão suficiente para que um agente execute sem adivinhar.
- **Decomposição** — quebre trabalho grande em unidades do tamanho de um agente.
- **Avaliação** — julgue a qualidade da saída rapidamente.
- **Design de sistema** — construa as restrições e ciclos de feedback que mantêm os agentes produtivos.

## Três lugares onde os agentes se encaixam no seu dia

Olhando a mesma imagem de um ângulo diferente, os agentes aparecem em três locais. A maioria das pessoas usa os três.

- **No editor** — conclusão inline e chat no lugar, com consciência de toda a base de código. É aqui que você se mantém em fluxo. (Copilot, Cursor, Windsurf, JetBrains AI.)
- **No terminal** — você lança o agente, entrega um objetivo em linguagem natural e o deixa trabalhar em arquivos, executando ferramentas e testes e reagindo aos resultados. É aqui que acontece o trabalho hands-on sério. (Claude Code, Codex CLI e similares.)
- **Em segundo plano** — o agente roda de forma autônoma em um sandbox, às vezes por horas, e entrega de volta um pull request para revisar depois. (Jules, modo agente do Copilot, agentes em segundo plano do Cursor.)

O mapeamento é intuitivo uma vez que você o vê: agentes no editor se encaixam *enquanto você escreve*; agentes no terminal se encaixam em *exploração multi-arquivo e executar-e-reagir*; agentes em segundo plano se encaixam em *qualquer coisa que você possa descrever em um parágrafo e se afastar*. O ponto de partida certo é a tarefa, não a ferramenta que reivindica mais autonomia.

## Execute dentro de um sandbox

Quando o agente executa código — rodando testes, tentando uma correção, lendo arquivos — ele deve fazer isso dentro de um sandbox isolado com um conjunto definido e limitado de ferramentas e acessos. É isso que torna o loop autônomo "pensar → agir → observar" seguro: o agente pode tentar coisas e falhar sem tocar em nada que não deveria.

## O problema dos 80% (onde as coisas dão errado)

Um agente vai gerar aproximadamente 80% de uma funcionalidade rapidamente. Os 20% restantes — casos extremos, tratamento de erros, pontos de integração, correção sutil — precisam de contexto profundo que o modelo geralmente não tem. E é exatamente aí que vivem as falhas de produção.

O perigo mudou. Os primeiros erros de IA eram erros de sintaxe óbvios. Os erros de hoje são *conceituais*: uma suposição errada sobre lógica de negócio, um caso extremo perdido, uma escolha arquitetural que acumula silenciosamente dívida de manutenção. São difíceis de detectar precisamente porque **o código parece correto e pode até passar em testes básicos.**

Concretamente:

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)
```

Os 20% ausentes são tudo que o agente não sabia perguntar: `percent` pode ultrapassar 100? `price` é um valor inteiro em centavos ou um float? Qual arredondamento de moeda se aplica? Um desconto de 100% deve ser permitido, ou isso sinaliza um bug upstream? Nada disso é visível no código — são regras de negócio que você detém e o modelo não.

Os desenvolvedores que se saem bem não tentam ir mais rápido aceitando tudo. Eles usam o agente nos 80% bem especificados e gastam sua própria atenção nos 20% que precisam de julgamento.

## Configure seu próprio fluxo de trabalho

- [ ] Antes de uma tarefa, escolha conscientemente condutor ou orquestrador — e perceba quando você está conduzindo trabalho que deveria ter delegado.
- [ ] Combine o local do agente com a tarefa: editor para em fluxo, terminal para multi-arquivo, segundo plano para se afastar.
- [ ] Garanta que a execução de código aconteça em um sandbox com acesso com escopo.
- [ ] Para cada funcionalidade, anote os 20% — os casos extremos e as regras de negócio — e revise essas linhas você mesmo, mesmo que os testes passem.
