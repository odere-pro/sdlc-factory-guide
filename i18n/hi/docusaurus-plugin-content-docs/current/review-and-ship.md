---
id: review-and-ship
title: "Part 5 — Review करें और Ship करें"
description: First-pass reviewer के रूप में agent, generated code के लिए review checklist, commit hooks, और AI workflows के लिए observability।
sidebar_position: 7
keywords: [code review, shipping, observability, hooks, generated code]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 5 — Review and Ship',
      description: 'Agent as first-pass reviewer, review checklist for generated code, commit hooks, and observability for AI workflows.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/review-and-ship',
      },
    })}
  </script>
</head>

# Part 5 — Review करें और ship करें

जब एक agent आपका 80% code लिखता है, तो आप author से ज़्यादा reviewer बन जाते हैं। काम typing से judging की तरफ shift होता है — और judging उससे sharper होनी चाहिए जितनी पहले थी, क्योंकि generated code human code से अधिक चुप तरीकों से fail करता है।

## Agent को पहला pass लेने दें

किसी human के देखने से पहले agent को first-pass reviewer के रूप में उपयोग करें। यह mechanical layer में अच्छा है: likely bugs, style violations, security smells, और performance issues पकड़ना। यह noise clear करता है ताकि human reviewer अपना ध्यान वहाँ लगा सके जहाँ actually किसी human की ज़रूरत है — design, maintainability, यह change system की direction के साथ fit होती है या नहीं।

Split यही बात है। First-pass review mechanical है और delegate किया जा सकता है। Design के बारे में final judgment नहीं।

## हर वह line review करें जो ship हो — सही संदेह के साथ

Code इसलिए trust करने का reflex कि यह run होता है, generated code के लिए बिल्कुल गलत reflex है। हर वह line review करें जो production में जाएगी, और अपने संदेह को उन specific तरीकों पर aim करें जिनसे AI output fail करता है:

- **Clever code पर संदेह करें।** Generated solutions कभी-कभी एक slick abstraction के लिए reach करते हैं जहाँ एक boring वाला correct था। Clever एक flag है, compliment नहीं।
- **Confirm करें कि imports real हैं।** Models plausible-sounding packages hallucinate करते हैं। एक import जो सही लगता है वह एक ऐसा package हो सकता है जो exist नहीं करता — या बुरा, एक ऐसे नाम पर malicious squat जो model आमतौर पर invent करता है।
- **Realistic failures के खिलाफ error handling check करें।** Generated code happy path को अच्छी तरह cover करता है और failure paths को poorly। पूछें कि क्या होता है जब network call timeout होती है, input empty है, row missing है।

इसे skip करने की cost concrete है: ऐसा code जिसे आपकी team नहीं समझती वह debugging cost बन जाती है जो team afford नहीं कर सकती। Fast generation से बचत उस पहली बार में evaporate हो जाती है जब कोई तीन दिन एक clever block को reverse-engineer करने में बिता देता है जिसे किसी ने review नहीं किया।

## Hooks: machine को वे rules enforce करने दें जो वह भूल जाती है

कुछ rules review पर rely करने के लिए बहुत important हैं। उन्हें **hooks** के रूप में encode करें — deterministic code जो lifecycle में fixed points पर run होता है (tool call से पहले, file edit के बाद, commit से पहले) और बुरी actions को automatically block करता है।

एक pre-commit hook जो hard-coded secret commit करने से refuse करता है:

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'\''"][^"'\'']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

Hooks वहाँ हैं जहाँ आप वे चीज़ें डालते हैं जो agent (या कोई human) "कभी नहीं भूलना चाहिए लेकिन अक्सर भूल जाता है।" File में किसी rule के विपरीत, hook को बातों से नहीं टाला जा सकता।

## Observability: देखें agent ने वास्तव में क्या किया

आप जो देख नहीं सकते उसे manage नहीं कर सकते। जैसे-जैसे agents ज़्यादा काम लेते हैं, observability खड़ी करें ताकि आप "इसने क्या किया, और क्यों?" का जवाब दे सकें। Track करें:

- प्रत्येक run के **Traces** — steps और tool calls का पूरा sequence।
- समय के साथ **Eval results**, ताकि quality regressions जल्दी surface हों।
- **Token cost और latency**, ताकि एक workflow जो चुपचाप महँगी हो गई, दिखे।
- **Drift** — समय के साथ बिना किसी obvious cause के behavior shift होना।

इसके बिना, एक misbehaving agent एक black box है और आपका एकमात्र debugging tool अनुमान लगाना है।

## Underrated जीत: maintenance

अपने अब-capable workflow को उस काम पर point करें जिसे आप टालते रहे हैं। Legacy code जो "छूने के लिए बहुत risky था" क्योंकि केवल इसके original authors इसे समझते थे, ठीक वही है जहाँ एक agent अपनी value prove करता है: वह code पढ़ सकता है, patterns infer कर सकता है, relevant files ढूंढ सकता है, और ऐसे changes कर सकता है जो वहाँ जो है उसे respect करें।

यह ऐसा काम unlock करता है जो पहले कभी नहीं होता था क्योंकि यह बहुत tedious और risky था: framework migrations, deprecated-API updates, पुराने test suites को modernize करना। एक migration जिसे कोई एक quarter बिताना नहीं चाहता था, वह एक well-specified background task बन जाती है जिसके अंत में एक reviewable PR होती है।

## अपना खुद का workflow तैयार करें

- [ ] Human review से पहले एक first-pass review step जोड़ें (agent diff review करे)।
- [ ] Generated code के लिए एक review checklist लिखें: clever abstractions, hallucinated imports, weak error handling।
- [ ] कम से कम एक hook जोड़ें — ऊपर दिए secret-blocker से शुरू करें।
- [ ] Agent runs के लिए tracing चालू करें और समय के साथ token cost और eval scores देखें।
- [ ] एक "छूने के लिए बहुत risky" piece of legacy code चुनें और उसे agent को एक scoped, reviewable task के रूप में दें।
