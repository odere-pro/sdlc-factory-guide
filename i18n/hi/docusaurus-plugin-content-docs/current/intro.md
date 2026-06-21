---
id: intro
title: Agentic Engineering Workflow
description: Ad-hoc AI prompting से एक ऐसे disciplined workflow की ओर जाने का व्यावहारिक, आठ-भागों वाला गाइड जिस पर आप production में भरोसा कर सकते हैं।
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
      headline: 'The Agentic Engineering Workflow',
      description: 'A practical, eight-part guide to moving from ad-hoc AI prompting to a disciplined workflow you can rely on in production.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/',
      },
    })}
  </script>
</head>

# Agentic Engineering Workflow

Ad-hoc AI prompting से एक ऐसे disciplined workflow की ओर जाने का व्यावहारिक, आठ-भागों वाला गाइड जिस पर आप production में भरोसा कर सकते हैं। प्रत्येक भाग स्वतंत्र है: इसे पढ़ें, उदाहरण कॉपी करें, और अपने workflow का वह हिस्सा तैयार करें।

इन आठों भागों में एक सूत्र है: **आपका असली output अब code नहीं है — वह system है जो code बनाता है।** Model उस system का एक छोटा-सा हिस्सा है। उसके आस-पास जो कुछ आप बनाते हैं (rules, context, tests, review, observability) — वही तय करता है कि output भरोसेमंद है या नहीं।

## श्रृंखला

1. **[Rule file तैयार करें](/rule-file)** — agent को वह project knowledge दें जो किसी नए teammate को चाहिए होती है।
2. **[Context engineer करें](/context-engineering)** — agent क्या देखता है और कब, इसे नियंत्रित करें।
3. **[Verification बनाएँ](/verification)** — AI के साथ contract के रूप में tests और evals।
4. **[काम चलाएँ](/running-the-work)** — conductor बनाम orchestrator, और agents आपके दिन में कहाँ फिट होते हैं।
5. **[Review करें और ship करें](/review-and-ship)** — वे विफलताएँ पकड़ें जो "सही लगती हैं।"
6. **[Cost नियंत्रित करें](/controlling-cost)** — total cost of ownership और model routing।
7. **[Production agents ship करें](/production-agents)** — prototype script से substrate वाले product तक।
8. **[Team standard बनाएँ](/team-standard)** — harness को version करें, evals पर gate लगाएँ, judgment के लिए hire करें।

## इसका उपयोग कैसे करें

- **अकेले developer हैं?** Parts 1–6 आपके daily workflow को बदलने के लिए पर्याप्त हैं। Part 1 से शुरू करें।
- **AI product बना रहे हैं?** Part 7 भी जोड़ें।
- **Team lead कर रहे हैं?** Parts 1–8, जिसमें 3, 5, और 8 पर विशेष ध्यान दें।

---

स्रोत: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
