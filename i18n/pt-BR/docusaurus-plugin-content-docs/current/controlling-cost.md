---
id: controlling-cost
title: "Parte 6: Controle o Custo"
description: Custo total de propriedade em fluxos de trabalho com IA — sucesso de primeira passagem, roteamento de modelos por tarefa e contexto dinâmico como controle de custo.
sidebar_position: 8
keywords: [cost control, token economy, model routing, TCO, AI cost]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 6: Controle o Custo',
      description: 'Custo total de propriedade em fluxos de trabalho com IA — sucesso de primeira passagem, roteamento de modelos por tarefa e contexto dinâmico como controle de custo.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/controlling-cost',
      },
    })}
  </script>
</head>

# Parte 6: Controle o custo

A pergunta habitual sobre desenvolvimento com IA é "com que velocidade conseguimos entregar?" A pergunta melhor é "quanto custa manter isso?" A velocidade esconde a economia real. A métrica honesta é o custo total de propriedade, e num fluxo de trabalho com IA isso é dominado por uma coisa: a economia de tokens.

## A dívida oculta de ir rápido

O prompting ad-hoc parece quase de graça — uma assinatura e alguns prompts casuais, custo inicial quase zero. A conta chega depois, e ela se acumula:

- **Queima de tokens.** Despejar arquivos grandes não estruturados na janela de contexto e pedir ao modelo que corrija seus próprios erros não verificados cria um loop de repetição caro com baixa taxa de sucesso de primeira passagem. Cada tentativa falha são tokens gastos por nada.
- **Imposto de manutenção.** Código gerado não estruturado carece de consistência. Seis meses depois, um engenheiro passa dias fazendo engenharia reversa de "macarrão" que ninguém projetou.
- **Remediação de segurança.** Sem um harness de avaliação, geração rápida de código se torna geração rápida de vulnerabilidades. Corrigir uma falha em produção custa muito mais do que detectá-la no tempo de design.

A abordagem estruturada inverte isso: você investe antecipadamente em schemas, testes e contexto, e o custo marginal de entregar e manter cada funcionalidade cai acentuadamente. Custo maior para construir, custo muito menor para manter.

## Alavanca um: sucesso de primeira passagem

O token mais barato é o que você não gasta numa repetição. Um arquivo de regras denso e com alto sinal (Parte 1) e contexto bem gerenciado (Parte 2) aumentam a taxa de sucesso de primeira passagem do agente, o que diretamente reduz os loops de tentativa e erro que queimam dinheiro. A engenharia de contexto não é apenas uma prática de qualidade — é uma prática de controle de custo. O mesmo `CLAUDE.md` compacto que melhora a saída também reduz o gasto.

Passar um repositório inteiro de 100.000 tokens em cada prompt é financeiramente inviável em escala. Recupere o que é relevante; pague pelo que usa.

## Alavanca dois: roteie por tarefa

Num fluxo de trabalho ad-hoc, você usa um grande modelo de fronteira para tudo — pagando preços premium para corrigir um erro de digitação ou gerar um teste boilerplate. Um fluxo de trabalho projetado roteia por complexidade de tarefa:

- **Arquitetura, design difícil** → Modelo de fronteira — precisa de raciocínio máximo
- **Implementação complexa inicial** → Modelo de fronteira — alto risco, ambíguo
- **Geração de testes** → Modelo pequeno / barato — determinístico, bem especificado
- **Revisão de código (primeira passagem)** → Modelo pequeno / barato — correspondência de padrões
- **Verificações de CI / monitoramento** → Modelo pequeno / barato — repetitivo, restrito

Uma configuração simples de roteamento torna isso concreto:

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

Orquestrar um mix de múltiplos modelos permite manter a qualidade de saída onde importa enquanto reduz o custo da maioria determinística do trabalho.

## Alavanca três: contexto dinâmico e skills

Conecte isso à Parte 2. Carregar tudo estaticamente significa pagar por isso em cada chamada. Empurrar conhecimento específico de tarefa para skills que carregam sob demanda — e acessar ferramentas por chamadas sob demanda em vez de embutir tudo no prompt — mantém o payload por solicitação pequeno. Em escala, a diferença entre "tudo sempre carregado" e "apenas o que é necessário" é a diferença entre uma estrutura de custo viável e uma inviável.

## Uma intuição concreta

Suponha que o sucesso de primeira passagem vai de 40% para 80% depois que você investe no arquivo de regras e em algumas skills. Tarefas que antes precisavam de ~2,5 tentativas agora precisam de ~1,25. São metade dos tokens para a mesma saída — antes de você ter roteado uma única tarefa para um modelo mais barato. Empilhe o roteamento em cima (modelos baratos gerenciando geração de testes e revisão, que podem ser metade das suas chamadas) e a curva de OpEx dobra acentuadamente.

## Configure seu próprio fluxo de trabalho

- [ ] Pare de medir apenas velocidade; comece a acompanhar gasto de tokens por funcionalidade entregue.
- [ ] Afine seu arquivo de regras especificamente para aumentar o sucesso de primeira passagem e eliminar loops de repetição.
- [ ] Configure roteamento de modelos: modelos baratos para geração de testes, revisão e CI; fronteira para arquitetura e implementação difícil.
- [ ] Mova contexto específico de tarefa para skills sob demanda para não pagar por ele em cada chamada.
- [ ] Compare custo-por-funcionalidade antes e depois — o investimento inicial deve aparecer como uma conta recorrente menor.
