---
id: checklist
title: Liste de contrôle d'implémentation
description: Liste de contrôle complète et actionnable pour mettre en place un flux de travail d'ingénierie agentique — des fichiers de règles aux standards d'équipe.
sidebar_position: 2
keywords: [checklist, implementation, setup, agentic engineering, AI development]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Liste de contrôle d\'implémentation',
      description: 'Liste de contrôle complète et actionnable pour mettre en place un flux de travail d\'ingénierie agentique — des fichiers de règles aux standards d\'équipe.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/checklist',
      },
    })}
  </script>
</head>

# Ingénierie agentique — Liste de contrôle d'implémentation

## Sommaire
1. [Mettre en place le fichier de règles](#1-mettre-en-place-le-fichier-de-règles)
2. [Ingénierie du contexte](#2-ingénierie-du-contexte)
3. [Construire la vérification](#3-construire-la-vérification)
4. [Exécuter le travail](#4-exécuter-le-travail)
5. [Réviser et livrer](#5-réviser-et-livrer)
6. [Contrôler les coûts](#6-contrôler-les-coûts)
7. [Livrer des agents en production](#7-livrer-des-agents-en-production)
8. [En faire un standard d'équipe](#8-en-faire-un-standard-déquipe)

---

## 1. Mettre en place le fichier de règles

- [ ] Créer un `CLAUDE.md` / `AGENTS.md` à la racine du dépôt. Commencer avec 10 lignes.
- [ ] Couvrir quatre points :
  - [ ] Stack et versions
  - [ ] Conventions (structure des dossiers, nommage, patterns réellement utilisés)
  - [ ] Règles absolues que l'agent ne doit jamais enfreindre (packages interdits, gestion des secrets, architecture en couches)
  - [ ] Workflow à suivre avant de générer du code
- [ ] Ajouter une nouvelle règle chaque fois que l'agent fait quelque chose que vous ne souhaitez pas voir répété.
- [ ] Lister les outils que l'agent peut appeler et quand les utiliser (APIs, scripts, schémas de base de données).
- [ ] Prendre les décisions d'architecture vous-même ; laisser l'agent les implémenter, pas les choisir.

## 2. Ingénierie du contexte

- [ ] Décider ce qui est **statique** (toujours chargé) vs **dynamique** (chargé à la demande) :
  - [ ] Statique : fichiers de règles, instructions système, mémoire globale
  - [ ] Dynamique : compétences, résultats d'outils, documents récupérés, historique récent
- [ ] Garder le contexte statique court et à haute valeur informationnelle. Supprimer tout ce dont l'agent n'a pas besoin à chaque appel.
- [ ] Déplacer les savoir-faire récurrents dans des compétences qui se chargent uniquement quand la tâche correspond.
- [ ] Ne jamais coller tout un dépôt dans le prompt. Récupérer uniquement ce qui est pertinent.

## 3. Construire la vérification

- [ ] Écrire les tests avant de générer la fonctionnalité. Les tests sont la spécification.
- [ ] Écrire des évaluations pour les parties non déterministes :
  - [ ] L'agent a-t-il emprunté un chemin sensé ?
  - [ ] A-t-il choisi les bons outils ?
  - [ ] La sortie satisfait-elle le niveau de qualité requis ?
- [ ] Vérifier à la fois le résultat (compile, tests passent) et la trajectoire (comment il y est arrivé).
- [ ] Mettre en place la boucle de retour :
  - [ ] Exécuter contre une suite de benchmarks
  - [ ] Regrouper les échecs par cause racine
  - [ ] Corriger le prompt ou l'outil qui les a causés
  - [ ] Relancer une suite de régression
  - [ ] Surveiller la production pour de nouveaux échecs

## 4. Exécuter le travail

- [ ] Choisir un mode par tâche :
  - [ ] **Conducteur** (temps réel, dans l'IDE) pour la logique complexe, le débogage, le code peu familier
  - [ ] **Orchestrateur** (asynchrone, déléguer et réviser) pour les corrections de bugs, les migrations, la génération de tests
- [ ] Choisir l'emplacement de l'agent par tâche :
  - [ ] Agent éditeur — modifications et suggestions en flux
  - [ ] Agent terminal — travail multi-fichiers, exécuter-et-réagir
  - [ ] Agent en arrière-plan — tâches spécifiées en paragraphe dont on peut s'éloigner
- [ ] Exécuter la génération de code dans un sandbox, en utilisant uniquement des outils approuvés.
- [ ] Gérer les 20 % restants vous-même : cas limites, gestion des erreurs, points d'intégration, logique métier. Le code qui « semble correct » est là où se cachent les bugs.

## 5. Réviser et livrer

- [ ] Utiliser l'agent comme premier réviseur (bugs, style, sécurité, performance).
- [ ] Réviser chaque ligne qui est livrée :
  - [ ] Être sceptique envers le code élaboré
  - [ ] Confirmer que les packages importés existent réellement
  - [ ] Vérifier la gestion des erreurs face aux échecs réalistes
- [ ] Ajouter des hooks aux points de commit/édition (par ex. bloquer les commits contenant des secrets codés en dur).
- [ ] Activer l'observabilité : traces, résultats d'évaluation, tokens/latence/coût, dérive.
- [ ] Pointer l'agent vers le code hérité que vous avez évité : refactorisations, migrations, APIs dépréciées.

## 6. Contrôler les coûts

- [ ] Mesurer le coût total de possession, pas seulement la vitesse.
- [ ] Augmenter le taux de succès au premier passage avec un fichier de règles précis pour éviter les boucles de ré-essais.
- [ ] Router les modèles par tâche :
  - [ ] Modèles frontier pour l'architecture et les implémentations difficiles
  - [ ] Modèles économiques pour la génération de tests, la revue, la surveillance CI
- [ ] Utiliser le contexte dynamique et les compétences pour ne payer que les tokens nécessaires.

## 7. Livrer des agents en production

- [ ] Décider ce que vous construisez :
  - [ ] Un script — l'agent est le point de terminaison
  - [ ] Un produit pour de vrais utilisateurs — l'agent a besoin d'une infrastructure sous-jacente
- [ ] Pour les produits, ajouter : mémoire persistante, permissions limitées, couverture d'évaluation en CI, traçage complet des exécutions.
- [ ] Utiliser un bundle de compétences pour que votre agent de codage existant gère build → évaluer → déployer → observer.
- [ ] Pour les configurations multi-agents, coordonner via un état partagé, MCP pour les outils, A2A pour la délégation.

## 8. En faire un standard d'équipe

- [ ] Versionner les fichiers de règles, les prompts, les suites d'évaluation et les compétences. Les réviser dans les PRs. Assigner des propriétaires.
- [ ] Conditionner la livraison au passage d'une suite d'évaluation avec une rubrique claire, pas à une démo fonctionnelle.
- [ ] Former les réviseurs aux modes d'échec du code généré.
- [ ] Rendre explicite la frontière prototype/production (quels dépôts, branches, environnements).
- [ ] Construire le harness une fois et continuer à l'affiner.
- [ ] Recruter et promouvoir pour le jugement : spécification, évaluation, architecture.

---

### Référence

Basé sur *The New SDLC With Vibe Coding* (Google) :
https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
