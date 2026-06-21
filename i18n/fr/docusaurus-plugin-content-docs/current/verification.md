---
id: verification
title: "Partie 3 — Construire la vérification"
description: Les tests comme contrat déterministe et les évaluations pour les comportements non déterministes — le volant qualité qui s'amplifie.
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Partie 3 — Construire la vérification',
      description: 'Les tests comme contrat déterministe et les évaluations pour les comportements non déterministes — le volant qualité qui s\'amplifie.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/verification',
      },
    })}
  </script>
</head>

# Partie 3 — Construire la vérification

Voici la ligne qui décide si vous faites de l'ingénierie réelle ou si vous pariez : **comment vos sorties sont-elles vérifiées ?** Si la réponse est « je l'exécute et ça semble fonctionner », vous faites du vibe coding, peu importe la sophistication de vos prompts. La vérification est la discipline qui rend la sortie IA digne de confiance aux enjeux de la production.

Deux mécanismes fonctionnent de concert. Les tests couvrent ce qui est déterministe. Les évaluations couvrent ce qui ne l'est pas.

## Tests : le contrat déterministe

Les tests vérifient les parties de votre système où une entrée donnée doit produire une sortie donnée. Ce sont les mêmes tests que vous écririez de toute façon — mais dans un workflow IA, ils endossent un second rôle : **ils communiquent l'intention à l'agent plus précisément que n'importe quel prompt.**

Un test est une spécification qu'une machine peut vérifier. Donnez à l'agent un test en échec et « faites passer ce test », et vous lui avez donné une cible non ambiguë ainsi qu'un moyen automatique de savoir quand c'est terminé. Donc écrivez-les *en premier* :

```python
def test_refund_over_threshold_requires_approval():
    charge = make_charge(amount=600_00)
    with pytest.raises(ApprovalRequired):
        refund_service.issue(charge.id, amount=600_00, approved_by=None)

def test_refund_writes_ledger_entry():
    charge = make_charge(amount=50_00)
    refund_service.issue(charge.id, amount=50_00, approved_by="alice")
    assert ledger.last_entry().type == "refund"
```

L'agent connaît désormais la règle de seuil et l'exigence du grand livre sans que vous les lui expliquiez en prose. Le test *est* l'explication.

## Évaluations : juger les parties non déterministes

Les tests ne peuvent pas tout couvrir, car une grande partie du comportement de l'agent n'est pas déterministe. L'agent a-t-il emprunté un chemin sensé vers la réponse ? A-t-il choisi les bons outils ? La sortie finale est-elle réellement bonne, pas seulement syntaxiquement valide ? C'est ce que mesurent les **évaluations**.

Les évaluations sont vérifiées avec des jeux de données étiquetés, des rubriques de notation, et parfois un modèle jouant le rôle de juge. Il en existe deux types, et vous avez besoin des deux :

- **Évaluation de la sortie** — juge l'artefact final. Le code compile-t-il ? Les tests passent-ils ? Le résumé est-il exact ?
- **Évaluation de la trajectoire** — juge *comment l'agent y est arrivé*. A-t-il appelé les bons outils dans un ordre raisonnable, ou a-t-il tâtonné pour aboutir à un résultat passable ?

La trajectoire compte plus qu'il n'y paraît. Une sortie fluente qui a sauté ses étapes de vérification est *plus* dangereuse qu'une avec une erreur évidente, parce qu'elle dissimule le risque. Un agent qui a produit du code correct par hasard tout en ignorant la suite de tests produira inévitablement du code incorrect de la même façon.

## Une rubrique d'évaluation concrète

Pour un agent qui répond aux questions à partir de votre documentation, un ensemble d'évaluations est une liste de cas assortie d'une rubrique :

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

Chaque exécution note : a-t-il mentionné les faits requis, évité les faits interdits, et suivi le chemin d'outils attendu ? Un modèle juge peut évaluer la dimension plus subjective « cette réponse est-elle claire et correcte » selon une rubrique que vous rédigez. L'essentiel est que « bon » est maintenant défini explicitement et vérifié automatiquement — pas estimé à l'œil.

## Le volant de la qualité

Les tests et les évaluations atteignent leur pleine valeur quand on les connecte à une boucle qui s'amplifie :

1. **Évaluer** par rapport à votre suite de benchmarks.
2. **Diagnostiquer** les échecs en les regroupant par causes racines (pas en corrigeant les cas isolés).
3. **Optimiser** le prompt, la règle ou l'outil qui a causé le groupe.
4. **Vérifier** le correctif par rapport à une suite de régression pour qu'il reste en place.
5. **Surveiller** le trafic de production pour de nouveaux modes d'échec, et les réinjecter à l'étape 1.

Chaque tour de cette boucle fait démarrer le suivant depuis un niveau de référence plus élevé. C'est ainsi qu'un agent s'améliore de façon fiable au fil du temps sans changer le modèle sous-jacent.

## Mettre en place votre propre workflow

- [ ] Pour votre prochaine fonctionnalité, écrire les tests avant de laisser l'agent générer du code.
- [ ] Construire un petit ensemble d'évaluations — même dix cas — pour un comportement d'agent qui vous importe.
- [ ] Pour chaque cas d'évaluation, définir à la fois ce que la sortie doit contenir et le chemin d'outils attendu.
- [ ] Ajouter une suite de régression qui réexécute chaque correctif.
- [ ] Choisir un échec de production cette semaine, trouver son groupe de causes racines, et corriger la cause plutôt que le symptôme.
