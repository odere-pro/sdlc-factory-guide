---
id: production-agents
title: "Partie 7: Livrer des agents en production"
description: Du script prototype à l'agent en production — mémoire persistante, permissions limitées, couverture d'évaluation et coordination multi-agents.
sidebar_position: 9
keywords: [production agents, MCP, A2A, agent deployment, multi-agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Partie 7: Livrer des agents en production',
      description: 'Du script prototype à l\'agent en production — mémoire persistante, permissions limitées, couverture d\'évaluation et coordination multi-agents.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/production-agents',
      },
    })}
  </script>
</head>

# Partie 7: Livrer des agents en production

Tout ce qui précède portait sur l'utilisation d'agents pour construire des logiciels. Cette partie concerne le cas où ce que vous construisez *est* un agent — un bot de support client, un assistant de recherche, un outil de surveillance interne. Ce ne sont pas des scripts que vous exécutez une fois ; ce sont des produits qui servent de vrais utilisateurs, et ils ont besoin de plus sous le capot.

## D'abord, décider ce que vous construisez réellement

La question la plus utile avant de commencer :

- **Est-ce un script ?** Une automatisation ponctuelle, un outil personnel, un prototype. L'agent est la destination. Un agent de codage ordinaire dans votre terminal suffit.
- **Est-ce un produit ?** Quelque chose dont de vrais utilisateurs dépendent. L'agent est maintenant le produit, et il a besoin d'une infrastructure sous-jacente : ses propres outils, mémoire, évaluation et infrastructure de déploiement.

Confondre les deux est la façon dont les prototypes se retrouvent en production par accident. Soyez explicite sur lequel vous construisez avant d'écrire quoi que ce soit.

## Ce qu'un agent en production nécessite qu'un script n'a pas

Quand de vrais utilisateurs dépendent de l'agent, quatre choses cessent d'être optionnelles :

- **Mémoire persistante** entre les sessions, pour que l'agent ne reparte pas de zéro à chaque fois.
- **Permissions limitées** sur chaque outil et source de données, pour que l'agent ne puisse accéder qu'à ce qu'il doit.
- **Couverture d'évaluation** s'exécutant en CI, pour que les régressions soient détectées avant d'être livrées (c'est la partie 3, appliquée à l'agent lui-même).
- **Observabilité** qui trace ce que l'agent a réellement fait, pour que le comportement en production soit auditable (c'est la partie 5, appliquée à l'agent lui-même).

Pour un script ponctuel, rien de tout cela ne vaut l'effort. Pour un produit, construire cela *après* le lancement plutôt qu'avant est la façon dont on se retrouve avec un système non maintenable et non fiable.

## Maintenir un seul workflow du prototype à la production

La transition qui rend cela pratique : le même workflow en terminal qui produit un prototype atteint maintenant jusqu'à un produit déployé. Vous n'apprenez pas une stack séparée pour passer en production. Vous décrivez ce que vous voulez, et un bundle de compétences (du type de la partie 2) donne à votre agent de codage existant le cycle de vie complet — structurer, écrire, évaluer, déployer, brancher l'observabilité — sans nouveau SDK.

La boucle, de bout en bout, ressemble à une conversation :

```
# one-time setup of the skills bundle, then, in your coding agent:
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

Derrière cela, l'agent structure le projet depuis un template, écrit le code, génère un ensemble d'évaluations, l'exécute, déploie et fait son rapport. Pour ceux qui préfèrent piloter directement, les mêmes étapes sont disponibles comme commandes CLI simples. Le résultat : le prototype qui tournait sur votre laptop hier devient l'agent en production servant des utilisateurs aujourd'hui, sans réécriture.

## Passer au multi-agents

Quand un seul agent ne suffit pas, la coordination s'effectue via trois mécanismes, utilisés à différentes échelles :

- **État de session partagé** — pour les cas simples où les agents ont juste besoin de voir le même contexte.
- **MCP (Model Context Protocol)** — la façon standard pour les agents d'accéder aux outils et aux services externes.
- **A2A (Agent2Agent)** — pour qu'un agent délègue du travail à un autre.

Ces mécanismes se composent selon le pattern qui convient : un planificateur confiant des sous-tâches à des spécialistes, des travailleurs parallèles sur différentes parties d'un travail, un agent réviseur vérifiant un agent constructeur. Le goulot d'étranglement se déplace de l'écriture de l'implémentation à la spécification de ce que chaque agent doit faire et à la vérification qu'il l'a fait — le même thème que le reste de ce guide, un niveau au-dessus.

## Mettre en place votre propre workflow

- [ ] Pour votre prochain agent, écrire une phrase : « c'est un script » ou « c'est un produit ». Laisser cela décider de la quantité d'infrastructure à construire.
- [ ] Si c'est un produit, ajouter les quatre essentiels : mémoire persistante, permissions limitées, évaluations en CI, traçage des exécutions.
- [ ] Utiliser un bundle de compétences pour que build → évaluer → déployer → observer reste dans un seul workflow.
- [ ] Si vous avez besoin de plusieurs agents, commencer par l'état partagé ; recourir à MCP et A2A seulement quand la coordination le nécessite réellement.
