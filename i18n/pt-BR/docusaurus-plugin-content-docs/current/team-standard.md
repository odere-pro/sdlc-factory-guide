---
id: team-standard
title: "Parte 8: Torne-o um Padrão de Equipe"
description: Versione o harness, valide com avaliações não demos, reformule a revisão de código e contrate por julgamento em uma org de engenharia com IA em primeiro lugar.
sidebar_position: 10
keywords: [team standard, engineering culture, CI gates, eval suite, hiring]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 8: Torne-o um Padrão de Equipe',
      description: 'Versione o harness, valide com avaliações não demos, reformule a revisão de código e contrate por julgamento em uma org de engenharia com IA em primeiro lugar.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/team-standard',
      },
    })}
  </script>
</head>

# Parte 8: Torne-o um padrão de equipe

Tudo nas primeiras sete partes funciona para um desenvolvedor. No momento em que uma equipe está envolvida, um modo de falha extra aparece: o harness deriva. O arquivo de regras de uma pessoa diz uma coisa, o de outra diz outra, o comportamento do agente se torna irreproducível em toda a equipe e a disciplina se erode silenciosamente. Esta parte é sobre tornar o fluxo de trabalho um padrão compartilhado e duradouro.

O princípio subjacente a ter em mente: **a IA amplifica a cultura de engenharia onde aterrissa.** Uma equipe com testes fortes, padrões claros e revisão saudável consegue dramaticamente mais com essas ferramentas. Uma equipe sem esses elementos fica mais rápida em produzir problemas. O ponto de padronizar é tornar a boa cultura o caminho de menor resistência.

## Trate o harness como código

Os arquivos de regras, prompts do sistema, suítes de avaliação e bibliotecas de skills não são configuração pessoal — são infraestrutura compartilhada. Trate-os exatamente como código:

- **Versione-os** com o projeto.
- **Revise-os em pull requests**, como qualquer outra mudança.
- **Atribua responsáveis nomeados**, para que sejam mantidos intencionalmente em vez de apodrecer.

Sem isso, o agente de cada desenvolvedor se comporta ligeiramente diferente e ninguém consegue reproduzir os resultados de ninguém.

## Valide com avaliação, não com demo

Uma demo funcionando prova que um agente pode ter sucesso *uma vez*. Uma suíte de avaliações aprovada prova que ele tem sucesso *de forma confiável*. Os dois não são a mesma coisa, e publicar na força de uma demo é como agentes não confiáveis chegam à produção.

Torne a cobertura de avaliação uma pré-condição para publicar, da mesma forma que você condiciona um serviço à cobertura de testes. Mas uma avaliação sem um rubric claro não mede nada — então defina o que você está pontuando:

- Sucesso da tarefa
- Qualidade do uso de ferramentas
- Conformidade de trajetória
- Taxa de alucinação
- Qualidade da resposta

Um gate de CI torna isso real:

```yaml
# ci: block merge if the agent's eval suite regresses
agent-evals:
  run: eval-suite --rubric rubric.yaml --min-score 0.9
  on: [pull_request]
  required: true
```

## Reformule a revisão de código para código gerado

O código gerado precisa do mesmo escrutínio que o código humano, ou mais — e os revisores precisam conhecer seus modos de falha específicos. Treine-os para procurar dependências alucinadas, tratamento de erros superficial e lacunas de correção que parecem bem à primeira vista (Parte 5). Ajuste o checklist de revisão para esses padrões em vez de reutilizar o checklist antigo de código humano sem alterações.

## Desenhe a linha protótipo/produção explicitamente

Exploração rápida e solta e trabalho de produção disciplinado são ambos válidos — mas apenas quando todos sabem qual é qual. Torne a fronteira explícita:

- Quais **repositórios** são produção vs. sandbox.
- Quais **branches** exigem a disciplina completa.
- Quais **ambientes** a saída de um agente pode alcançar.

Equipes que deixam isso indefinido produzem protótipos que são publicados por acidente. Uma fronteira documentada mantém a exploração rápida e a produção segura ao mesmo tempo.

## Construa o harness uma vez, refine-o muitas vezes

Prompts reutilizáveis, bibliotecas de skills, conexões de ferramentas e harnesses de avaliação se acumulam entre projetos. As equipes que mais aproveitam o desenvolvimento com IA são as que constroem esse harness compartilhado uma vez e continuam melhorando-o, em vez de cada pessoa reconstruir o seu do zero. Trate-o como infraestrutura: documentado, mantido, melhorado intencionalmente.

## Contrate e promova por julgamento

À medida que a implementação fica mais barata, o gargalo se move para especificação, avaliação e julgamento arquitetural. Os engenheiros mais valiosos nos próximos anos são os que conseguem dirigir agentes bem — não os que conseguem digitar mais código. Reflita isso em como você contrata, nivela e desenvolve pessoas: valorize habilidade de especificação, rigor de avaliação e design de sistemas em detrimento de velocidade pura de implementação.

As configurações mais fortes são híbridas por design: humanos definem a direção, agentes implementam, e protocolos claros de handoff governam a fronteira. Revisão de código, plantão e estrutura de equipe evoluem para tratar agentes como participantes, não apenas como ferramentas.

## Configure seu próprio fluxo de trabalho

- [ ] Mova arquivos de regras, prompts, avaliações e skills para o repositório; exija revisão de PR para mudanças.
- [ ] Atribua um responsável pelo harness compartilhado.
- [ ] Adicione um gate de CI que bloqueia merges quando a suíte de avaliação regride abaixo de um limite.
- [ ] Escreva um guia de revisão de uma página para modos de falha de código gerado.
- [ ] Documente a fronteira protótipo-vs-produção: repositórios, branches, ambientes.
- [ ] No seu próximo ciclo de contratação, adicione um exercício de especificação e avaliação, não apenas um teste de codificação.

---

Fonte: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
