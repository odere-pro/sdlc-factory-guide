---
id: team-standard
title: "Partie 8 — En faire un standard d'équipe"
description: Versionner le harness, valider sur les évaluations et non les démos, remodeler la revue de code, et recruter pour le jugement dans une organisation d'ingénierie orientée IA.
sidebar_position: 10
keywords: [team standard, engineering culture, CI gates, eval suite, hiring]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Partie 8 — En faire un standard d\'équipe',
      description: 'Versionner le harness, valider sur les évaluations et non les démos, remodeler la revue de code, et recruter pour le jugement dans une organisation d\'ingénierie orientée IA.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/team-standard',
      },
    })}
  </script>
</head>

# Partie 8 — En faire un standard d'équipe

Tout ce qui se trouve dans les sept premières parties fonctionne pour un développeur seul. Dès qu'une équipe est impliquée, un mode d'échec supplémentaire apparaît : le harness dérive. Le fichier de règles d'une personne dit une chose, celui d'une autre dit quelque chose de différent, le comportement de l'agent devient non reproductible d'un membre à l'autre, et la discipline s'érode silencieusement. Cette partie porte sur la transformation du workflow en un standard partagé et durable.

Le principe sous-jacent à garder à l'esprit : **l'IA amplifie la culture d'ingénierie dans laquelle elle s'installe.** Une équipe avec des tests solides, des standards clairs et une revue saine tire un bénéfice considérablement plus grand de ces outils. Une équipe sans ces bases va plus vite à produire des problèmes. L'objectif de la standardisation est de faire de la bonne culture le chemin de moindre résistance.

## Traiter le harness comme du code

Les fichiers de règles, les prompts système, les suites d'évaluation et les bibliothèques de compétences ne sont pas de la configuration personnelle — ce sont de l'infrastructure partagée. Traitez-les exactement comme du code :

- **Versionnez-les** avec le projet.
- **Révisez-les dans des pull requests**, comme tout autre changement.
- **Assignez des propriétaires nommés**, pour qu'ils soient maintenus intentionnellement plutôt que de se dégrader.

Sans cela, l'agent de chaque développeur se comporte légèrement différemment et personne ne peut reproduire les résultats des autres.

## Valider sur l'évaluation, pas sur la démo

Une démo fonctionnelle prouve qu'un agent peut réussir *une fois*. Une suite d'évaluation passante prouve qu'il réussit *de façon fiable*. Les deux ne sont pas équivalents, et livrer sur la foi d'une démo est la façon dont les agents peu fiables atteignent la production.

Faites de la couverture d'évaluation une condition préalable à la livraison, de la même façon que vous conditionneriez un service à la couverture de tests. Mais une évaluation sans rubrique claire ne mesure rien — définissez donc ce que vous notez :

- Succès de la tâche
- Qualité d'utilisation des outils
- Conformité de la trajectoire
- Taux d'hallucination
- Qualité des réponses

Un gate CI le rend concret :

```yaml
# ci: block merge if the agent's eval suite regresses
agent-evals:
  run: eval-suite --rubric rubric.yaml --min-score 0.9
  on: [pull_request]
  required: true
```

## Remodeler la revue de code pour le code généré

Le code généré nécessite le même examen que le code humain, voire davantage — et les réviseurs doivent connaître ses modes d'échec spécifiques. Formez-les à repérer les dépendances hallucinations, la gestion des erreurs insuffisante, et les lacunes de justesse qui semblent correctes au premier coup d'œil (partie 5). Adaptez la liste de contrôle de révision à ces patterns plutôt que de réutiliser telle quelle l'ancienne liste pour le code humain.

## Tracer la frontière prototype/production explicitement

L'exploration rapide et libre et le travail de production discipliné sont tous deux valides — mais seulement quand tout le monde sait lequel est lequel. Rendez la frontière explicite :

- Quels **dépôts** sont en production vs. en sandbox.
- Quelles **branches** requièrent la discipline complète.
- Quels **environnements** la sortie d'un agent peut atteindre.

Les équipes qui laissent cela flou produisent des prototypes qui se retrouvent en production par accident. Une frontière écrite garde l'exploration rapide et la production sûre en même temps.

## Construire le harness une fois, l'affiner de nombreuses fois

Les prompts réutilisables, les bibliothèques de compétences, les connexions d'outils et les harnesses d'évaluation se composent d'un projet à l'autre. Les équipes qui tirent le plus grand bénéfice du développement IA sont celles qui construisent ce harness partagé une fois et continuent à l'améliorer, plutôt que chaque personne reconstruisant le sien de zéro. Traitez-le comme de l'infrastructure : documentée, maintenue, améliorée délibérément.

## Recruter et promouvoir pour le jugement

À mesure que l'implémentation devient moins chère, le goulot d'étranglement se déplace vers la spécification, l'évaluation et le jugement architectural. Les ingénieurs les plus précieux ces prochaines années sont ceux qui peuvent bien diriger les agents — pas ceux qui peuvent taper le plus de code. Reflétez-le dans la façon dont vous recrutez, évaluez et développez les personnes : accordez du poids à la compétence de spécification, à la rigueur d'évaluation et à la conception système plutôt qu'à la vitesse d'implémentation brute.

Les configurations les plus solides sont hybrides par conception : les humains définissent la direction, les agents implémentent, et des protocoles de transfert clairs régissent la frontière. La revue de code, l'astreinte et la structure d'équipe évoluent tous pour traiter les agents comme des participants, pas juste des outils.

## Mettre en place votre propre workflow

- [ ] Déplacer les fichiers de règles, les prompts, les évaluations et les compétences dans le dépôt ; exiger une revue PR pour les changements.
- [ ] Assigner un propriétaire pour le harness partagé.
- [ ] Ajouter un gate CI qui bloque les fusions quand la suite d'évaluation régresse en dessous d'un seuil.
- [ ] Écrire un guide d'une page sur les modes d'échec du code généré.
- [ ] Documenter la frontière prototype/production : dépôts, branches, environnements.
- [ ] Dans votre prochain cycle de recrutement, ajouter un exercice de spécification-et-évaluation, pas seulement un test de codage.

---

Source : *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
