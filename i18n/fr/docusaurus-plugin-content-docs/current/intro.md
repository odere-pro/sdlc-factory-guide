---
id: intro
title: Le flux de travail de l'ingénierie agentique
description: Un guide pratique en huit parties pour passer du prompting IA ad hoc à un flux de travail discipliné sur lequel vous pouvez vous appuyer en production.
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
      headline: 'Le flux de travail de l\'ingénierie agentique',
      description: 'Un guide pratique en huit parties pour passer du prompting IA ad hoc à un flux de travail discipliné sur lequel vous pouvez vous appuyer en production.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/',
      },
    })}
  </script>
</head>

# Le flux de travail de l'ingénierie agentique

Un guide pratique en huit parties pour passer du prompting IA ad hoc à un flux de travail discipliné sur lequel vous pouvez vous appuyer en production. Chaque partie est autonome : lisez-la, copiez les exemples et mettez en place ce fragment de votre propre workflow.

Le fil conducteur de l'ensemble des huit parties : **votre véritable production n'est plus du code — c'est le système qui produit le code.** Le modèle n'est qu'un petit rouage de ce système. Tout ce que vous construisez autour de lui (règles, contexte, tests, revue, observabilité) détermine si la sortie est digne de confiance.

## La série

1. **[Mettre en place le fichier de règles](/rule-file)** — donner à l'agent la connaissance du projet dont un nouveau coéquipier aurait besoin.
2. **[Ingénierie du contexte](/context-engineering)** — contrôler ce que l'agent voit, et quand.
3. **[Construire la vérification](/verification)** — tests et évaluations comme contrat avec l'IA.
4. **[Exécuter le travail](/running-the-work)** — mode conducteur vs. orchestrateur, et où les agents s'intègrent dans votre journée.
5. **[Réviser et livrer](/review-and-ship)** — détecter les échecs qui « semblent corrects ».
6. **[Contrôler les coûts](/controlling-cost)** — coût total de possession et routage des modèles.
7. **[Livrer des agents en production](/production-agents)** — du script prototype au produit avec une infrastructure sous-jacente.
8. **[En faire un standard d'équipe](/team-standard)** — versionner le harness, valider sur les évaluations, recruter pour le jugement.

## Comment utiliser ce guide

- **Développeur solo ?** Les parties 1 à 6 suffisent pour transformer votre workflow quotidien. Commencez par la partie 1.
- **Vous construisez un produit IA ?** Ajoutez la partie 7.
- **Vous dirigez une équipe ?** Les parties 1 à 8, avec un accent particulier sur les parties 3, 5 et 8.

---

Source : *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
