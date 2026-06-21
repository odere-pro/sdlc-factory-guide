---
id: running-the-work
title: "Partie 4: Exécuter le travail"
description: Modes conducteur vs. orchestrateur et où s'intègrent les agents — éditeur, terminal et arrière-plan — plus le problème des 80 %.
sidebar_position: 6
keywords: [agent modes, conductor, orchestrator, sandbox, code generation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Partie 4: Exécuter le travail',
      description: 'Modes conducteur vs. orchestrateur et où s\'intègrent les agents — éditeur, terminal et arrière-plan — plus le problème des 80 %.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/running-the-work',
      },
    })}
  </script>
</head>

# Partie 4: Exécuter le travail

Vous disposez d'un fichier de règles, d'un contexte ingénié et d'une vérification en place. Maintenant vous effectuez vraiment le travail. Les deux questions qui décident comment il se passe : dans quel *mode* êtes-vous, et quel *type* d'agent convient à la tâche ?

## Deux modes : conducteur et orchestrateur

La plupart des développeurs naviguent entre deux modes tout au long de la journée. Ils exigent des compétences différentes, et utiliser le mauvais pour la tâche est une source fréquente de frustration.

**Le mode conducteur** est temps réel, mains dans le cambouis. Vous êtes dans l'éditeur, regardant le code apparaître, guidant avec des prompts et des corrections, maintenant un contrôle fin. Vous comprenez chaque changement au fur et à mesure qu'il est effectué.

- Idéal pour : la logique complexe, le débogage délicat, les bases de code peu familières — partout où vous devez comprendre chaque étape.
- Le risque : si vous dirigez chaque frappe de clavier, *vous* devenez le goulot d'étranglement et l'accélération s'évapore.

**Le mode orchestrateur** est asynchrone et de haut niveau. Vous définissez un objectif, le confiez à un agent, et révisez le résultat — pas les frappes. Les agents peuvent s'exécuter en arrière-plan, en parallèle, sur différentes parties de la base de code.

- Idéal pour : le travail bien spécifié — corrections de bugs, migrations, génération de tests, fonctionnalités suivant un pattern établi.
- L'inconvénient : il nécessite *plus* de discipline en amont, pas moins. Vous devez écrire une spécification précise avant de pouvoir déléguer. Le bénéfice arrive à la deuxième tâche, pas à la première.

Le mode orchestrateur récompense un ensemble de compétences différent de la maîtrise syntaxique :

- **Spécification** — définir la tâche assez précisément pour qu'un agent puisse l'exécuter sans deviner.
- **Décomposition** — découper le grand travail en unités de taille agent.
- **Évaluation** — juger rapidement la qualité de la sortie.
- **Conception système** — construire les contraintes et les boucles de rétroaction qui maintiennent les agents productifs.

## Trois endroits où les agents s'intègrent dans votre journée

En découpant le même tableau différemment, les agents apparaissent à trois emplacements. La plupart des gens utilisent les trois.

- **Dans l'éditeur** — complétion en ligne et chat en place, avec conscience de toute la base de code. C'est là que vous restez en flux. (Copilot, Cursor, Windsurf, JetBrains AI.)
- **Dans le terminal** — vous lancez l'agent, lui confiez un objectif en langage naturel, et le laissez travailler sur les fichiers, exécuter des outils et des tests et réagir aux résultats. C'est là que se passe le vrai travail pratique. (Claude Code, Codex CLI, et similaires.)
- **En arrière-plan** — l'agent s'exécute de façon autonome dans un sandbox, parfois pendant des heures, et rend une pull request à réviser plus tard. (Jules, mode agent Copilot, agents en arrière-plan de Cursor.)

La correspondance est intuitive une fois qu'on la voit : les agents éditeur conviennent *pendant que vous écrivez* ; les agents terminal conviennent à *l'exploration multi-fichiers et au cycle exécuter-et-réagir* ; les agents en arrière-plan conviennent à *tout ce que vous pouvez décrire en un paragraphe et dont vous pouvez vous éloigner*. Le bon point de départ est la tâche, pas l'outil qui revendique le plus d'autonomie.

## Exécuter dans un sandbox

Quand l'agent exécute du code — en lançant des tests, en testant un correctif, en lisant des fichiers — il doit le faire dans un sandbox isolé avec un ensemble d'outils et d'accès défini et limité. C'est ce qui rend la boucle autonome « penser → agir → observer » sûre : l'agent peut essayer des choses et échouer sans toucher à ce qu'il ne devrait pas.

## Le problème des 80 % (là où ça tourne mal)

Un agent va générer environ 80 % d'une fonctionnalité rapidement. Les 20 % restants — cas limites, gestion des erreurs, points d'intégration, justesse subtile — nécessitent un contexte profond que le modèle n'a généralement pas. Et c'est précisément là que vivent les échecs en production.

Le danger a changé. Les premières erreurs IA étaient des fautes de syntaxe évidentes. Les erreurs d'aujourd'hui sont *conceptuelles* : une hypothèse erronée sur la logique métier, un cas limite manqué, un choix architectural qui accumule silencieusement de la dette de maintenance. Elles sont difficiles à détecter précisément parce que **le code semble correct et peut même passer des tests basiques.**

Concrètement :

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)
```

Les 20 % manquants sont tout ce que l'agent n'a pas su demander : `percent` peut-il dépasser 100 ? `price` est-il une valeur entière en centimes ou un flottant ? Quelle règle d'arrondi monétaire s'applique ? Une remise de 100 % doit-elle être autorisée, ou signale-t-elle un bug en amont ? Rien de tout cela n'est visible dans le code — ce sont des règles métier que vous détenez et que le modèle n'a pas.

Les développeurs qui s'en sortent bien n'essaient pas d'aller plus vite en acceptant tout. Ils utilisent l'agent pour les 80 % bien spécifiés et consacrent leur propre attention aux 20 % qui nécessitent du jugement.

## Mettre en place votre propre workflow

- [ ] Avant une tâche, choisir consciemment le mode conducteur ou orchestrateur — et remarquer quand vous conduisez un travail que vous auriez dû déléguer.
- [ ] Adapter l'emplacement de l'agent à la tâche : éditeur pour le flux, terminal pour le multi-fichiers, arrière-plan pour le travail dont on peut s'éloigner.
- [ ] S'assurer que l'exécution de code se passe dans un sandbox avec un accès limité.
- [ ] Pour chaque fonctionnalité, noter les 20 % — les cas limites et les règles métier — et réviser ces lignes vous-même, même si les tests passent.
