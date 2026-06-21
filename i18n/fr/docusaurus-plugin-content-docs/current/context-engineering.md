---
id: context-engineering
title: "Partie 2 — Ingénierie du contexte"
description: Contrôlez ce que l'agent voit et quand — contexte statique vs dynamique, compétences pour la divulgation progressive, et conception soucieuse des coûts.
sidebar_position: 4
keywords: [context engineering, dynamic context, skills, tokens, prompt design]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Partie 2 — Ingénierie du contexte',
      description: 'Contrôlez ce que l\'agent voit et quand — contexte statique vs dynamique, compétences pour la divulgation progressive, et conception soucieuse des coûts.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/context-engineering',
      },
    })}
  </script>
</head>

# Partie 2 — Ingénierie du contexte

L'ingénierie du contexte est la compétence qui sépare une sortie IA rapide d'une sortie IA *utile*. Le fichier de règles de la partie 1 en est un élément. Cette partie porte sur la discipline plus large : décider ce que l'agent voit, et quand.

Le changement de mentalité est de passer de « comment formuler ceci pour inciter le modèle à produire du bon code ? » à « qu'est-ce qu'un nouveau coéquipier aurait besoin de savoir pour contribuer efficacement, et comment le lui transmettre de façon efficiente ? »

## Les deux catégories : statique et dynamique

Chaque élément de contexte appartient à l'une des deux catégories, et choisir la bonne est une vraie décision d'ingénierie avec un coût réel.

**Le contexte statique** est toujours chargé, à chaque requête :

- Instructions système
- Fichiers de règles (`CLAUDE.md` et équivalents)
- Mémoire globale et persona

Il est fiable — l'agent ne l'oublie jamais — mais coûteux, car vous payez chaque token à chaque appel, que la tâche en cours en ait besoin ou non.

**Le contexte dynamique** n'est chargé qu'en cas de besoin :

- Compétences déclenchées par la tâche en cours
- Résultats d'outils récupérés durant l'exécution
- Documents extraits d'un index de recherche
- La tranche récente de l'historique de conversation

Il est efficace — vous ne payez que lorsque l'information est réellement pertinente.

Le piège aux deux extrêmes : trop de contexte statique gaspille de l'argent et *dilue le signal* (les règles importantes se noient dans le bruit), tandis que trop peu fait oublier à l'agent ce dont il avait besoin. Traitez la ligne statique/dynamique comme toute autre décision d'architecture — révisée et versionnée, pas accidentelle.

## Une intuition rapide sur les coûts

Supposons que votre fichier de règles pèse 2 000 tokens et que vous fassiez 50 requêtes par session. C'est 100 000 tokens rien que pour le fichier de règles, payés 50 fois. Si la moitié du fichier est du matériel de référence pertinent pour une seule tâche, vous brûlez de l'argent sur 49 requêtes qui n'en avaient pas besoin. Déplacez cette moitié dans une compétence chargée à la demande et le coût disparaît pour les 49 autres.

C'est pourquoi « garder le contexte statique dense et à haute valeur » n'est pas une préférence de style — c'est un poste budgétaire.

## Compétences : le pattern pour le contexte dynamique

La façon la plus efficace de gérer la catégorie dynamique est une **compétence** : un ensemble autonome de connaissances procédurales que l'agent charge uniquement quand une tâche correspond.

Les compétences fonctionnent par *divulgation progressive* — trois couches, chargées paresseusement :

1. Au démarrage, l'agent ne voit que des métadonnées légères (un nom et une description d'une ligne).
2. Quand une tâche correspond, il charge les instructions complètes.
3. Seulement s'il a besoin de la profondeur, il tire le matériel de référence lourd.

Le résultat : un agent généraliste léger peut porter des dizaines de capacités spécialisées tout en ne payant le coût en tokens que pour celle qu'il utilise activement.

Une compétence minimale ressemble à ceci :

```markdown
---
name: stripe-refunds
description: How to issue and reconcile refunds through our billing layer. Use when a task involves refunds, chargebacks, or payment reversals.
---

# Issuing a refund

1. Look up the charge via `billing.get_charge(charge_id)`.
2. Refunds over $500 require an `approved_by` field — never auto-approve.
3. Call `billing.refund(charge_id, amount, approved_by)`.
4. Write a `RefundRecord` to the ledger in the same transaction.
5. Emit a `refund.issued` event.

See `reference/refund-edge-cases.md` for partial refunds and currency conversion.
```

L'agent ne lit ceci que lorsqu'une tâche mentionne réellement les remboursements. Le reste du temps, cela ne coûte rien d'autre que la description d'une ligne.

## Les six types de contexte à gérer

Quand vous décidez quoi fournir, pensez à six catégories. La plupart des workflows sous-investissent dans les quatre du milieu.

- **Instructions** — le rôle, les objectifs et les limites de l'agent (votre fichier de règles).
- **Connaissance** — documentation, diagrammes d'architecture, données de domaine.
- **Mémoire** — ce qui vient de se passer (session), et ce qu'est le projet (long terme).
- **Exemples** — patterns de référence *tirés de votre propre base de code*, pas des exemples génériques trouvés sur internet.
- **Outils** — définitions précises des APIs et scripts que l'agent peut appeler.
- **Garde-fous** — contraintes dures et règles de sécurité.

Le point sur les « exemples » mérite d'être souligné : un seul exemple tiré de votre vrai code enseigne votre style à l'agent plus vite que trois paragraphes de description.

## Ne pas coller tout le dépôt

Un échec courant consiste à déverser un dépôt entier de 100 000 tokens dans le prompt « pour qu'il ait tout ». C'est à la fois coûteux et contre-productif — le signal pertinent se noie. Récupérez plutôt les quelques fichiers qui comptent pour la tâche en cours, et laissez l'agent en demander davantage. La conscience de toute la base de code est le travail de l'outil (indexation, récupération), pas quelque chose que vous faites à la main à chaque prompt.

## Mettre en place votre propre workflow

- [ ] Lister tout ce qui se trouve actuellement dans votre contexte statique. Pour chaque élément, demandez : *chaque* tâche en a-t-elle besoin ?
- [ ] Déplacer le matériel spécifique aux tâches hors du fichier de règles et dans des compétences.
- [ ] Écrire votre première compétence pour une tâche spécialisée récurrente (un flux de remboursement, un pattern de migration, un format de rapport).
- [ ] Ajouter quelques exemples réels de votre base de code dans le fichier de règles ou une compétence.
- [ ] Arrêter de coller des fichiers entiers ; laisser la récupération faire remonter ce qui est pertinent.
