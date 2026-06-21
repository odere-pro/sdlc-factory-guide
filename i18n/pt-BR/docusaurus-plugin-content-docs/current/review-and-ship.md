---
id: review-and-ship
title: "Parte 5 — Revise e Entregue"
description: Agente como revisor de primeira passagem, checklist de revisão para código gerado, hooks de commit e observabilidade para fluxos de trabalho com IA.
sidebar_position: 7
keywords: [code review, shipping, observability, hooks, generated code]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Parte 5 — Revise e Entregue',
      description: 'Agente como revisor de primeira passagem, checklist de revisão para código gerado, hooks de commit e observabilidade para fluxos de trabalho com IA.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/review-and-ship',
      },
    })}
  </script>
</head>

# Parte 5 — Revise e entregue

Quando um agente escreve 80% do seu código, você se torna um revisor mais do que um autor. O trabalho passa de digitar para julgar — e o julgamento precisa ser mais aguçado do que era, porque o código gerado falha de formas mais silenciosas do que o código humano.

## Deixe o agente fazer a primeira passagem

Use o agente como revisor de primeira passagem antes que um humano olhe qualquer coisa. Ele é bom na camada mecânica: capturar bugs prováveis, violações de estilo, cheiros de segurança e problemas de desempenho. Isso limpa o ruído para que o revisor humano possa gastar atenção no que realmente precisa de um humano — design, manutenibilidade, se esta mudança se encaixa na direção do sistema.

A divisão é o ponto. A revisão de primeira passagem é mecânica e pode ser delegada. O julgamento final sobre design não pode.

## Revise cada linha que vai para produção — com a suspeita certa

O reflexo de confiar no código porque ele roda é exatamente o reflexo errado para código gerado. Revise cada linha que vai para produção e aponte sua suspeita nas formas específicas como a saída de IA falha:

- **Desconfie de código inteligente demais.** Soluções geradas às vezes escolhem uma abstração engenhosa onde uma entediante era correta. Inteligente demais é um sinal de alerta, não um elogio.
- **Confirme que as importações são reais.** Modelos alucinam pacotes que soam plausíveis. Uma importação que parece certa pode ser um pacote que não existe — ou pior, um ocupante malicioso do nome que um modelo comumente inventa.
- **Verifique o tratamento de erros para falhas realistas.** O código gerado tende a cobrir bem o caminho feliz e mal os caminhos de falha. Pergunte o que acontece quando a chamada de rede expira, a entrada está vazia, a linha está ausente.

O custo de pular isso é concreto: código que sua equipe não entende vira custo de depuração que sua equipe não pode arcar. A economia da geração rápida evapora na primeira vez que alguém gasta três dias fazendo engenharia reversa de um bloco inteligente que ninguém revisou.

## Hooks: faça a máquina impor as regras que ela esquece

Algumas regras são importantes demais para depender de revisão. Codifique-as como **hooks** — código determinístico que roda em pontos fixos do ciclo de vida (antes de uma chamada de ferramenta, após uma edição de arquivo, antes de um commit) e bloqueia ações ruins automaticamente.

Um hook de pré-commit que recusa commitar um segredo embutido no código:

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'\''"][^"'\'']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

Hooks são onde você coloca as coisas que um agente (ou um humano) "nunca deveria esquecer mas frequentemente esquece." Ao contrário de uma regra num arquivo, um hook não pode ser contornado por conversa.

## Observabilidade: veja o que o agente realmente fez

Você não pode gerenciar o que não consegue ver. À medida que os agentes assumem mais trabalho, configure a observabilidade para que você possa responder "o que ele fez e por quê?" Acompanhe:

- **Traces** de cada execução — a sequência completa de etapas e chamadas de ferramentas.
- **Resultados de avaliação** ao longo do tempo, para que regressões de qualidade apareçam cedo.
- **Custo de tokens e latência**, para que um fluxo de trabalho que silenciosamente ficou caro apareça.
- **Desvio** — comportamento mudando ao longo do tempo sem uma causa óbvia.

Sem isso, um agente com comportamento errado é uma caixa preta e sua única ferramenta de depuração é chute.

## A vitória subestimada: manutenção

Aponte seu fluxo de trabalho agora capaz para o trabalho que você vinha evitando. Código legado que era "arriscado demais para tocar" porque apenas seus autores originais o entendiam é exatamente onde um agente vale seu espaço: ele consegue ler o código, inferir os padrões, encontrar os arquivos relevantes e fazer mudanças que respeitam o que existe.

Isso desbloqueia trabalho que anteriormente nunca acontecia porque era entediante e arriscado demais: migrações de framework, atualizações de APIs obsoletas, modernização de suítes de testes antigas. Uma migração que ninguém queria gastar um trimestre acaba se tornando uma tarefa de segundo plano bem especificada com um PR revisável no final.

## Configure seu próprio fluxo de trabalho

- [ ] Adicione uma etapa de revisão de primeira passagem (o agente revisa o diff) antes da revisão humana.
- [ ] Escreva um checklist de revisão para código gerado: abstrações inteligentes demais, importações alucinadas, tratamento de erros fraco.
- [ ] Adicione pelo menos um hook — comece com o bloqueador de segredos acima.
- [ ] Ative o rastreamento para execuções de agentes e acompanhe custo de tokens e pontuações de avaliação ao longo do tempo.
- [ ] Escolha um trecho de código legado "arriscado demais para tocar" e entregue ao agente como uma tarefa com escopo e PR revisável.
