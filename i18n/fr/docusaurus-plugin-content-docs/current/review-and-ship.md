---
id: review-and-ship
title: "Partie 5: Réviser et livrer"
description: L'agent comme premier réviseur, liste de contrôle de révision pour le code généré, hooks de commit et observabilité pour les workflows IA.
sidebar_position: 7
keywords: [code review, shipping, observability, hooks, generated code]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Partie 5: Réviser et livrer',
      description: 'L\'agent comme premier réviseur, liste de contrôle de révision pour le code généré, hooks de commit et observabilité pour les workflows IA.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/review-and-ship',
      },
    })}
  </script>
</head>

# Partie 5: Réviser et livrer

Quand un agent écrit 80 % de votre code, vous devenez davantage un réviseur qu'un auteur. Le travail passe de la frappe au jugement — et ce jugement doit être plus affûté qu'il ne l'était, parce que le code généré échoue de façon plus silencieuse que le code humain.

## Laisser l'agent effectuer le premier passage

Utilisez l'agent comme premier réviseur avant qu'un humain ne regarde quoi que ce soit. Il est performant sur la couche mécanique : détecter les bugs probables, les violations de style, les odeurs de sécurité et les problèmes de performance. Cela dégage le bruit pour que le réviseur humain puisse concentrer son attention sur ce qui nécessite réellement un humain — la conception, la maintenabilité, si ce changement s'inscrit dans la direction du système.

La répartition est l'essentiel. La première passe de révision est mécanique et peut être déléguée. Le jugement final sur la conception ne l'est pas.

## Réviser chaque ligne qui est livrée — avec le scepticisme approprié

Le réflexe de faire confiance au code parce qu'il s'exécute est exactement le mauvais réflexe pour le code généré. Révisez chaque ligne qui va en production, et orientez votre scepticisme vers les façons spécifiques dont la sortie IA échoue :

- **Soyez sceptique envers le code élaboré.** Les solutions générées atteignent parfois une abstraction astucieuse là où une solution ennuyeuse était correcte. L'élégance est un signal d'alerte, pas un compliment.
- **Confirmez que les imports existent.** Les modèles hallucinent des packages au nom plausible. Un import qui semble juste peut correspondre à un package inexistant — ou pire, à un squat malveillant sur un nom que le modèle invente couramment.
- **Vérifiez la gestion des erreurs face aux échecs réalistes.** Le code généré tend à couvrir le chemin heureux correctement et les chemins d'échec insuffisamment. Demandez ce qui se passe quand l'appel réseau expire, que l'entrée est vide, que la ligne est manquante.

Le coût de l'omission est concret : le code que votre équipe ne comprend pas devient un coût de débogage que votre équipe ne peut pas se permettre. Les économies réalisées grâce à la génération rapide s'évaporent la première fois que quelqu'un passe trois jours à rétroingéniérer un bloc astucieux que personne n'a révisé.

## Hooks : faire respecter mécaniquement les règles que l'on oublie

Certaines règles sont trop importantes pour s'en remettre à la révision. Encodez-les comme des **hooks** — du code déterministe qui s'exécute à des points fixes du cycle de vie (avant un appel d'outil, après l'édition d'un fichier, avant un commit) et bloque automatiquement les mauvaises actions.

Un hook de pré-commit qui refuse de committer un secret codé en dur :

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'\''"][^"'\'']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

Les hooks sont l'endroit où vous mettez les choses qu'un agent (ou un humain) « ne devrait jamais oublier mais oublie souvent ». Contrairement à une règle dans un fichier, un hook ne peut pas être contourné par la persuasion.

## Observabilité : voir ce que l'agent a réellement fait

On ne peut pas gérer ce qu'on ne voit pas. Quand les agents prennent en charge davantage de travail, mettez en place de l'observabilité pour pouvoir répondre à « qu'a-t-il fait, et pourquoi ? » Suivez :

- **Les traces** de chaque exécution — la séquence complète d'étapes et d'appels d'outils.
- **Les résultats d'évaluation** dans le temps, pour que les régressions de qualité remontent tôt.
- **Le coût en tokens et la latence**, pour qu'un workflow qui est devenu silencieusement coûteux se remarque.
- **La dérive** — le comportement évoluant dans le temps sans cause évidente.

Sans cela, un agent qui se comporte mal est une boîte noire et votre seul outil de débogage est la supposition.

## La victoire sous-estimée : la maintenance

Pointez votre workflow désormais capable vers le travail que vous avez évité. Le code hérité qui était « trop risqué à toucher » parce que seuls ses auteurs originaux le comprenaient est exactement là où un agent tient ses promesses : il peut lire le code, inférer les patterns, trouver les fichiers pertinents, et effectuer des modifications qui respectent l'existant.

Cela débloque du travail qui ne se faisait jamais parce qu'il était trop fastidieux et risqué : migrations de frameworks, mises à jour d'APIs dépréciées, modernisation d'anciennes suites de tests. Une migration que personne ne voulait consacrer un trimestre devient une tâche en arrière-plan bien spécifiée avec une PR reviewable à la clé.

## Mettre en place votre propre workflow

- [ ] Ajouter une étape de première passe de révision (l'agent révise le diff) avant la révision humaine.
- [ ] Écrire une liste de contrôle de révision pour le code généré : abstractions astucieuses, imports hallucinations, gestion des erreurs insuffisante.
- [ ] Ajouter au moins un hook — commencez par le bloqueur de secrets ci-dessus.
- [ ] Activer le traçage pour les exécutions d'agents et surveiller le coût en tokens et les scores d'évaluation dans le temps.
- [ ] Choisir un morceau de code hérité « trop risqué à toucher » et le confier à l'agent comme tâche limitée et reviewable.
