---
id: controlling-cost
title: "Part 6: Cost नियंत्रित करें"
description: AI workflows में total cost of ownership — first-pass success, task के अनुसार model routing, और cost control के रूप में dynamic context।
sidebar_position: 8
keywords: [cost control, token economy, model routing, TCO, AI cost]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 6: Control Cost',
      description: 'Total cost of ownership in AI workflows — first-pass success, model routing by task, and dynamic context as cost control.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/controlling-cost',
      },
    })}
  </script>
</head>

# Part 6: Cost नियंत्रित करें

AI development के बारे में सामान्य सवाल है "हम कितनी तेज़ ship कर सकते हैं?" बेहतर सवाल है "इसे own करने में क्या लागत आती है?" Velocity असली economics छिपाती है। ईमानदार metric total cost of ownership है, और AI workflow में यह एक चीज़ से dominated है: token economy।

## तेज़ जाने का छिपा हुआ debt

Ad-hoc prompting लगभग मुफ्त लगता है — एक subscription और कुछ casual prompts, लगभग शून्य upfront cost। बिल बाद में आता है, और यह compound होता है:

- **Token burn.** Context window में huge unstructured files dump करना और model से अपनी unverified mistakes fix करने के लिए कहना, एक expensive retry loop बनाता है जिसकी first-pass success rate low होती है। हर failed attempt tokens spent for nothing है।
- **Maintenance tax.** Unstructured generated code में consistency की कमी होती है। छह महीने बाद, एक engineer "spaghetti" को reverse-engineer करने में दिन बिताता है जिसे किसी ने design नहीं किया।
- **Security remediation.** Evaluation harness के बिना, fast code generation fast vulnerability generation बन जाती है। Production में एक flaw ठीक करना उसे design time पर पकड़ने से कहीं ज़्यादा महँगा है।

Structured approach इसे invert करता है: आप schemas, tests, और context में upfront निवेश करते हैं, और प्रत्येक feature को ship करने और maintain करने की marginal cost sharply घटती है। बनाने की ज़्यादा लागत, own करने की बहुत कम लागत।

## Lever एक: first-pass success

सबसे सस्ता token वह है जो आप retry पर नहीं खर्च करते। एक dense, high-signal rule file (Part 1) और well-managed context (Part 2) agent की first-pass success rate बढ़ाते हैं, जो directly उन trial-and-error loops को कम करता है जो पैसे जलाते हैं। Context engineering केवल एक quality practice नहीं है — यह एक cost-control practice है। वही tight `CLAUDE.md` जो output improve करती है, spend भी कम करती है।

हर prompt में पूरा 100,000-token repository pass करना scale पर financially unviable है। जो relevant है वही retrieve करें; जो use करते हैं उसके लिए pay करें।

## Lever दो: task के अनुसार route करें

Ad-hoc workflow में, आप सब कुछ के लिए एक बड़ा frontier model उपयोग करते हैं — typo fix करने या boilerplate test generate करने के लिए premium prices pay करते हैं। एक designed workflow task complexity के अनुसार route करता है:

- **Architecture, hard design** → Frontier model — अधिकतम reasoning चाहिए
- **Initial complex implementation** → Frontier model — high-stakes, ambiguous
- **Test generation** → Small / cheap model — deterministic, well-specified
- **Code review (first pass)** → Small / cheap model — pattern matching
- **CI / monitoring checks** → Small / cheap model — repetitive, narrow

एक simple routing config इसे concrete बनाता है:

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

Multi-model mix orchestrate करना आपको output quality वहाँ बनाए रखने देता है जहाँ यह matter करती है, जबकि deterministic majority के काम की cost drive down होती है।

## Lever तीन: dynamic context और skills

इसे Part 2 से जोड़ें। सब कुछ statically load करने का मतलब है हर call पर उसके लिए pay करना। Task-specific knowledge को ऐसे skills में push करना जो माँग पर load हों — और tools को on-demand calls के through reach करना बजाय सब कुछ prompt में bake करने के — per-request payload छोटा रखता है। Scale पर, "सब कुछ हमेशा loaded" और "केवल जो ज़रूरी है" के बीच का अंतर एक viable cost structure और unviable के बीच का अंतर है।

## एक worked intuition

मान लीजिए rule file और कुछ skills में निवेश के बाद first-pass success 40% से 80% हो जाती है। Tasks जिन्हें पहले ~2.5 attempts चाहिए थे अब ~1.25 चाहिए। वही output के लिए आधे tokens — एक भी task को सस्ते model पर route किए बिना। ऊपर से routing stack करें (cheap models test-gen और review handle करते हैं, जो शायद आपके आधे calls हों) और OpEx curve sharply bend होती है।

## अपना खुद का workflow तैयार करें

- [ ] केवल speed measure करना बंद करें; shipped feature per token spend track करना शुरू करें।
- [ ] अपनी rule file को specifically first-pass success बढ़ाने और retry loops खत्म करने के लिए tighten करें।
- [ ] Model routing तैयार करें: test-gen, review, और CI के लिए cheap models; architecture और hard implementation के लिए frontier।
- [ ] Task-specific context को on-demand skills में डालें ताकि आप हर call पर उसके लिए pay न करें।
- [ ] पहले और बाद में cost-per-feature compare करें — upfront investment एक lower ongoing bill के रूप में दिखनी चाहिए।
