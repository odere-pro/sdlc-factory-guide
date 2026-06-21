---
id: checklist
title: Checklist de Implementação
description: Checklist completo e acionável para configurar um fluxo de trabalho de engenharia agêntica — de arquivos de regras a padrões de equipe.
sidebar_position: 2
keywords: [checklist, implementation, setup, agentic engineering, AI development]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Checklist de Implementação',
      description: 'Checklist completo e acionável para configurar um fluxo de trabalho de engenharia agêntica — de arquivos de regras a padrões de equipe.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/checklist',
      },
    })}
  </script>
</head>

# Engenharia Agêntica — Checklist de Implementação

## Conteúdo
1. [Configure o arquivo de regras](#1-configure-o-arquivo-de-regras)
2. [Engenharia de contexto](#2-engenharia-de-contexto)
3. [Construa verificação](#3-construa-verificação)
4. [Execute o trabalho](#4-execute-o-trabalho)
5. [Revise e entregue](#5-revise-e-entregue)
6. [Controle o custo](#6-controle-o-custo)
7. [Publique agentes em produção](#7-publique-agentes-em-produção)
8. [Torne-o um padrão de equipe](#8-torne-o-um-padrão-de-equipe)

---

## 1. Configure o arquivo de regras

- [ ] Crie um `CLAUDE.md` / `AGENTS.md` na raiz do repositório. Comece com 10 linhas.
- [ ] Cubra quatro aspectos:
  - [ ] Stack e versões
  - [ ] Convenções (estrutura de pastas, nomenclatura, padrões que você realmente usa)
  - [ ] Regras rígidas que o agente nunca deve quebrar (pacotes proibidos, tratamento de segredos, camadas)
  - [ ] Fluxo de trabalho a seguir antes de gerar código
- [ ] Adicione uma nova regra sempre que o agente fizer algo que você não quer que se repita.
- [ ] Liste as ferramentas que o agente pode chamar e quando usar cada uma (APIs, scripts, esquemas de BD).
- [ ] Tome as decisões de arquitetura você mesmo; deixe o agente implementá-las, não escolhê-las.

## 2. Engenharia de contexto

- [ ] Decida o que é **estático** (sempre carregado) vs **dinâmico** (carregado sob demanda):
  - [ ] Estático: arquivos de regras, instruções do sistema, memória global
  - [ ] Dinâmico: skills, resultados de ferramentas, documentos recuperados, histórico recente
- [ ] Mantenha o contexto estático curto e com alto sinal. Remova tudo que o agente não precisa em cada chamada.
- [ ] Mova o know-how repetível para skills que carregam apenas quando a tarefa corresponde.
- [ ] Nunca cole um repositório inteiro no prompt. Recupere o que for relevante.

## 3. Construa verificação

- [ ] Escreva testes antes de gerar a funcionalidade. Os testes são a especificação.
- [ ] Escreva avaliações para as partes não determinísticas:
  - [ ] O agente seguiu um caminho sensato?
  - [ ] Ele escolheu as ferramentas certas?
  - [ ] A saída atende ao nível de qualidade exigido?
- [ ] Verifique tanto o resultado (compila, testes passam) quanto a trajetória (como chegou lá).
- [ ] Configure o ciclo de feedback:
  - [ ] Execute contra um conjunto de benchmarks
  - [ ] Agrupe falhas por causa raiz
  - [ ] Corrija o prompt ou a ferramenta que as causou
  - [ ] Execute uma suíte de regressão
  - [ ] Monitore a produção em busca de novas falhas

## 4. Execute o trabalho

- [ ] Escolha um modo por tarefa:
  - [ ] **Condutor** (tempo real, no editor) para lógica complexa, depuração, código desconhecido
  - [ ] **Orquestrador** (assíncrono, delegar e revisar) para correções de bugs, migrações, geração de testes
- [ ] Escolha o local do agente por tarefa:
  - [ ] Agente no editor — edições e sugestões em fluxo
  - [ ] Agente no terminal — trabalho em múltiplos arquivos, executar-e-reagir
  - [ ] Agente em segundo plano — tarefas especificadas em um parágrafo das quais você pode se afastar
- [ ] Execute a geração de código dentro de um sandbox, usando apenas ferramentas aprovadas.
- [ ] Cuide você mesmo dos últimos 20%: casos extremos, tratamento de erros, pontos de integração, lógica de negócio. O código que "parece certo" é onde os bugs se escondem.

## 5. Revise e entregue

- [ ] Use o agente como revisor de primeira passagem (bugs, estilo, segurança, desempenho).
- [ ] Revise cada linha que vai para produção:
  - [ ] Desconfie de código inteligente demais
  - [ ] Confirme que os pacotes importados são reais
  - [ ] Verifique o tratamento de erros para falhas realistas
- [ ] Adicione hooks em pontos de commit/edição (ex.: bloquear commits com segredos embutidos no código).
- [ ] Ative a observabilidade: traces, resultados de avaliação, tokens/latência/custo, desvio.
- [ ] Aponte o agente para trabalhos legados que você vem evitando: refatorações, migrações, APIs obsoletas.

## 6. Controle o custo

- [ ] Meça o custo total de propriedade, não apenas a velocidade.
- [ ] Aumente o sucesso de primeira passagem com um arquivo de regras bem definido para evitar loops de repetição.
- [ ] Roteie modelos por tarefa:
  - [ ] Modelos de fronteira para arquitetura e implementação difícil
  - [ ] Modelos baratos para geração de testes, revisão, monitoramento de CI
- [ ] Use contexto dinâmico e skills para pagar apenas pelos tokens necessários.

## 7. Publique agentes em produção

- [ ] Decida o que está construindo:
  - [ ] Um script — o agente é o destino final
  - [ ] Um produto para usuários reais — o agente precisa de uma infraestrutura subjacente
- [ ] Para produtos, adicione: memória persistente, permissões com escopo, cobertura de avaliação no CI, rastreamento completo de execução.
- [ ] Use um pacote de skills para que seu agente de codificação existente gerencie build → avaliar → deploy → observar.
- [ ] Para configurações multi-agente, coordene via estado compartilhado, MCP para ferramentas, A2A para delegação.

## 8. Torne-o um padrão de equipe

- [ ] Versione arquivos de regras, prompts, suítes de avaliação e skills. Revise-os em PRs. Atribua responsáveis.
- [ ] Condicione o lançamento a uma suíte de avaliação aprovada com um rubric claro, não a uma demo funcional.
- [ ] Treine revisores sobre como o código gerado falha.
- [ ] Torne a fronteira entre protótipo e produção explícita (quais repositórios, branches, ambientes).
- [ ] Construa o harness uma vez e continue refinando-o.
- [ ] Contrate e promova por julgamento: especificação, avaliação, arquitetura.

---

### Referência

Baseado em *The New SDLC With Vibe Coding* (Google):
https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
