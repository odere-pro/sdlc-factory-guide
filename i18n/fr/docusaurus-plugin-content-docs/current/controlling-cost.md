---
id: controlling-cost
title: "Partie 6 — Contrôler les coûts"
description: Coût total de possession dans les workflows IA — taux de succès au premier passage, routage des modèles par tâche, et contexte dynamique comme levier de contrôle des coûts.
sidebar_position: 8
keywords: [cost control, token economy, model routing, TCO, AI cost]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Partie 6 — Contrôler les coûts',
      description: 'Coût total de possession dans les workflows IA — taux de succès au premier passage, routage des modèles par tâche, et contexte dynamique comme levier de contrôle des coûts.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/controlling-cost',
      },
    })}
  </script>
</head>

# Partie 6 — Contrôler les coûts

La question habituelle sur le développement IA est « à quelle vitesse peut-on livrer ? » La meilleure question est « combien coûte la possession de tout cela ? » La vélocité masque la vraie économie. La métrique honnête est le coût total de possession, et dans un workflow IA celui-ci est dominé par une chose : l'économie des tokens.

## La dette cachée d'aller vite

Le prompting ad hoc semble presque gratuit — un abonnement et quelques prompts décontractés, un coût initial quasi nul. La facture arrive plus tard, et elle s'accumule :

- **Consommation de tokens.** Déverser d'énormes fichiers non structurés dans la fenêtre de contexte et demander au modèle de corriger ses propres erreurs non vérifiées crée une boucle de ré-essais coûteuse avec un faible taux de succès au premier passage. Chaque tentative ratée représente des tokens dépensés pour rien.
- **Taxe de maintenance.** Le code généré non structuré manque de cohérence. Six mois plus tard, un ingénieur passe des jours à rétroingéniérer du « spaghetti » que personne n'a conçu.
- **Remédiation de sécurité.** Sans harness d'évaluation, la génération de code rapide devient la génération de vulnérabilités rapide. Corriger une faille en production coûte bien plus cher que de la détecter à la conception.

L'approche structurée inverse cela : vous investissez en amont dans des schémas, des tests et du contexte, et le coût marginal de livraison et de maintenance de chaque fonctionnalité chute fortement. Coût de construction plus élevé, coût de possession bien plus bas.

## Levier un : le taux de succès au premier passage

Le token le moins cher est celui que vous ne dépensez pas en ré-essai. Un fichier de règles dense et à haute valeur (partie 1) et un contexte bien géré (partie 2) augmentent le taux de succès au premier passage de l'agent, ce qui réduit directement les boucles d'essai-et-erreur qui brûlent de l'argent. L'ingénierie du contexte n'est pas seulement une pratique de qualité — c'est une pratique de contrôle des coûts. Le même `CLAUDE.md` précis qui améliore la sortie réduit également les dépenses.

Passer un dépôt entier de 100 000 tokens dans chaque prompt est financièrement inviable à l'échelle. Récupérez ce qui est pertinent ; payez pour ce que vous utilisez.

## Levier deux : router par tâche

Dans un workflow ad hoc, vous utilisez un grand modèle frontier pour tout — payant des prix premium pour corriger une faute de frappe ou générer un test boilerplate. Un workflow conçu route par complexité de tâche :

- **Architecture, conception difficile** → Modèle frontier — nécessite un raisonnement maximal
- **Implémentation complexe initiale** → Modèle frontier — enjeux élevés, ambiguïté
- **Génération de tests** → Petit modèle / économique — déterministe, bien spécifié
- **Revue de code (premier passage)** → Petit modèle / économique — correspondance de patterns
- **Vérifications CI / surveillance** → Petit modèle / économique — répétitif, restreint

Une configuration de routage simple rend cela concret :

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

Orchestrer un mix multi-modèles vous permet de maintenir la qualité de sortie là où elle compte tout en réduisant le coût de la majorité déterministe du travail.

## Levier trois : contexte dynamique et compétences

Faites le lien avec la partie 2. Tout charger statiquement signifie le payer à chaque appel. Pousser les connaissances spécifiques aux tâches dans des compétences qui se chargent à la demande — et accéder aux outils via des appels à la demande plutôt que tout inclure dans le prompt — maintient la charge utile par requête réduite. À l'échelle, la différence entre « tout toujours chargé » et « uniquement ce qui est nécessaire » est la différence entre une structure de coûts viable et une non viable.

## Une intuition travaillée

Supposons que le taux de succès au premier passage passe de 40 % à 80 % après votre investissement dans le fichier de règles et quelques compétences. Les tâches qui nécessitaient ~2,5 tentatives n'en nécessitent plus que ~1,25. C'est la moitié des tokens pour la même sortie — avant même d'avoir routé une seule tâche vers un modèle moins cher. Ajoutez le routage par-dessus (les modèles économiques gérant la génération de tests et la revue, qui représentent peut-être la moitié de vos appels) et la courbe OpEx s'infléchit fortement.

## Mettre en place votre propre workflow

- [ ] Cesser de mesurer uniquement la vitesse ; commencer à suivre la dépense en tokens par fonctionnalité livrée.
- [ ] Affiner votre fichier de règles spécifiquement pour augmenter le taux de succès au premier passage et éliminer les boucles de ré-essais.
- [ ] Mettre en place le routage des modèles : modèles économiques pour la génération de tests, la revue et le CI ; frontier pour l'architecture et l'implémentation difficile.
- [ ] Déplacer le contexte spécifique aux tâches dans des compétences à la demande pour ne pas le payer à chaque appel.
- [ ] Comparer le coût par fonctionnalité avant et après — l'investissement initial devrait se traduire par une facture courante plus basse.
