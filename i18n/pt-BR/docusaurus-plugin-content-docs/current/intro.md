---
id: intro
title: O Fluxo de Trabalho de Engenharia Agêntica
description: Um guia prático em oito partes para sair do prompting ad-hoc com IA e adotar um fluxo de trabalho disciplinado e confiável em produção.
sidebar_position: 1
slug: /
keywords: [agentic engineering, AI workflow, software development, SDLC, vibe coding]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'O Fluxo de Trabalho de Engenharia Agêntica',
      description: 'Um guia prático em oito partes para sair do prompting ad-hoc com IA e adotar um fluxo de trabalho disciplinado e confiável em produção.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/',
      },
    })}
  </script>
</head>

# O Fluxo de Trabalho de Engenharia Agêntica

Um guia prático em oito partes para sair do prompting ad-hoc com IA e adotar um fluxo de trabalho disciplinado e confiável em produção. Cada parte é autocontida: leia-a, copie os exemplos e configure essa etapa no seu próprio fluxo de trabalho.

O fio condutor que atravessa as oito partes: **seu produto real não é mais o código — é o sistema que produz código.** O modelo é apenas uma pequena peça desse sistema. Tudo o que você constrói ao redor dele (regras, contexto, testes, revisão, observabilidade) é o que determina se a saída é confiável.

## A série

1. **[Configure o arquivo de regras](/rule-file)** — forneça ao agente o conhecimento do projeto que um novo colega de equipe precisaria.
2. **[Engenharia de contexto](/context-engineering)** — controle o que o agente vê e quando.
3. **[Construa verificação](/verification)** — testes e avaliações como o contrato com a IA.
4. **[Execute o trabalho](/running-the-work)** — condutor vs. orquestrador, e onde os agentes se encaixam no seu dia a dia.
5. **[Revise e entregue](/review-and-ship)** — capture as falhas que "parecem corretas."
6. **[Controle o custo](/controlling-cost)** — custo total de propriedade e roteamento de modelos.
7. **[Publique agentes em produção](/production-agents)** — de um script protótipo a um produto com infraestrutura.
8. **[Torne-o um padrão de equipe](/team-standard)** — versione o harness, valide com avaliações, contrate por julgamento.

## Como usar este guia

- **Desenvolvedor solo?** As partes 1–6 são suficientes para transformar seu fluxo de trabalho diário. Comece pela Parte 1.
- **Construindo um produto de IA?** Adicione a Parte 7.
- **Liderando uma equipe?** Partes 1–8, com ênfase extra em 3, 5 e 8.

---

Fonte: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
