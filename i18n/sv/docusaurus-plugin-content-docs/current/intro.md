---
id: intro
title: Det agentiska ingenjörsarbetsflödet
description: En praktisk guide i åtta delar för att gå från ad hoc-AI-promptning till ett disciplinerat arbetsflöde du kan lita på i produktion.
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
      headline: 'Det agentiska ingenjörsarbetsflödet',
      description: 'En praktisk guide i åtta delar för att gå från ad hoc-AI-promptning till ett disciplinerat arbetsflöde du kan lita på i produktion.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/',
      },
    })}
  </script>
</head>

# Det agentiska ingenjörsarbetsflödet

En praktisk guide i åtta delar för att gå från ad hoc-AI-prompting till ett disciplinerat arbetsflöde du kan lita på i produktion. Varje del är fristående: läs den, kopiera exemplen och sätt upp den biten av ditt eget arbetsflöde.

Den röda tråden genom alla åtta: **ditt verkliga utdata är inte längre kod — det är systemet som producerar kod.** Modellen är en liten del av det systemet. Allt du bygger runt den (regler, kontext, tester, granskning, observerbarhet) avgör om utdatan är pålitlig.

## Serien

1. **[Sätt upp regelfilen](/rule-file)** — ge agenten den projektkännedom en ny teammedlem behöver.
2. **[Konstruera kontexten](/context-engineering)** — styr vad agenten ser, och när.
3. **[Bygg verifiering](/verification)** — tester och evalueringar som kontrakt med AI:n.
4. **[Kör arbetet](/running-the-work)** — dirigent kontra orkestratör, och var agenter passar in i din dag.
5. **[Granska och leverera](/review-and-ship)** — fånga de fel som "ser rätt ut."
6. **[Kontrollera kostnaden](/controlling-cost)** — total ägandekostnad och modellroutning.
7. **[Leverera produktionsagenter](/production-agents)** — från ett prototypskript till en produkt med substrat.
8. **[Gör det till en teamstandard](/team-standard)** — versionshantera harnessen, gate:a på evalueringar, anställ för omdöme.

## Hur du använder detta

- **Ensam utvecklare?** Delarna 1–6 räcker för att förändra ditt dagliga arbetsflöde. Börja med del 1.
- **Bygger du en AI-produkt?** Lägg till del 7.
- **Leder du ett team?** Delarna 1–8, med extra fokus på 3, 5 och 8.

---

Källa: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
