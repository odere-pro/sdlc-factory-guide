---
id: team-standard
title: "Part 8: Team Standard बनाएँ"
description: Harness को version करें, demos पर नहीं evals पर gate लगाएँ, code review को reshape करें, और AI-first engineering org में judgment के लिए hire करें।
sidebar_position: 10
keywords: [team standard, engineering culture, CI gates, eval suite, hiring]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 8: Make It a Team Standard',
      description: 'Version the harness, gate on evals not demos, reshape code review, and hire for judgment in an AI-first engineering org.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/team-standard',
      },
    })}
  </script>
</head>

# Part 8: Team standard बनाएँ

पहले सात Parts में जो कुछ भी है वह एक developer के लिए काम करता है। जिस moment एक team शामिल होती है, एक extra failure mode सामने आता है: harness drift करता है। एक व्यक्ति की rule file एक बात कहती है, दूसरे की कुछ और, agent का behavior team में reproduce नहीं होता, और discipline चुपचाप erode होती है। यह Part workflow को एक shared, durable standard बनाने के बारे में है।

ध्यान में रखने का underlying principle: **AI उस engineering culture को amplify करता है जिसमें वह land करता है।** Strong tests, clear standards, और healthy review वाली team इन tools से dramatically ज़्यादा निकालती है। उनके बिना team problems produce करने में तेज़ हो जाती है। Standardize करने का point यह है कि अच्छी culture को least resistance का path बनाया जाए।

## Harness को code की तरह treat करें

Rule files, system prompts, eval suites, और skill libraries personal config नहीं हैं — ये shared infrastructure हैं। उन्हें exactly code की तरह treat करें:

- **Version करें** उन्हें project के साथ।
- **Pull requests में review करें**, किसी भी अन्य change की तरह।
- **Named owners assign करें**, ताकि उन्हें purpose से maintain किया जाए न कि rot होने दिया जाए।

इसके बिना, हर developer का agent थोड़ा अलग behave करता है और कोई किसी के results reproduce नहीं कर सकता।

## Demo पर नहीं, eval पर gate लगाएँ

एक working demo prove करता है कि एक agent *एक बार* succeed कर सकता है। एक passing eval suite prove करता है कि वह *reliably* succeed करता है। दोनों एक नहीं हैं, और demo की strength पर ship करना वह है जिससे unreliable agents production में पहुँचते हैं।

Eval coverage को shipping के लिए precondition बनाएँ, उसी तरह जैसे आप किसी service को test coverage पर gate करते। लेकिन clear rubric के बिना एक eval कुछ नहीं measure करता — तो define करें कि आप क्या score कर रहे हैं:

- Task success
- Tool-use quality
- Trajectory compliance
- Hallucination rate
- Response quality

एक CI gate इसे real बनाता है:

```yaml
# ci: block merge if the agent's eval suite regresses
agent-evals:
  run: eval-suite --rubric rubric.yaml --min-score 0.9
  on: [pull_request]
  required: true
```

## Generated code के लिए code review reshape करें

Generated code को human code जितनी scrutiny चाहिए, या उससे ज़्यादा — और reviewers को इसके specific failure modes जानने चाहिए। उन्हें hallucinated dependencies, thin error handling, और correctness gaps जो एक नज़र में ठीक लगते हैं (Part 5) ढूंढना सिखाएँ। Review checklist को उन patterns के लिए tune करें बजाय old human-code checklist को unchanged reuse करने के।

## Prototype/production line explicitly खींचें

Fast, loose exploration और disciplined production work दोनों valid हैं — लेकिन केवल तब जब सभी जानते हों कि कौन सा क्या है। Boundary को explicit बनाएँ:

- कौन से **repos** production बनाम sandbox हैं।
- कौन से **branches** को पूरी discipline चाहिए।
- कौन से **environments** में agent का output पहुँच सकता है।

जो teams इसे blurry छोड़ती हैं वे accidentally ship होने वाले prototypes produce करती हैं। एक written boundary exploration को fast और production को safe एक साथ रखती है।

## Harness एक बार बनाएँ, कई बार refine करें

Reusable prompts, skill libraries, tool connections, और eval harnesses projects में compound होते हैं। AI development से सबसे ज़्यादा निकालने वाली teams वे हैं जो इस shared harness को एक बार बनाती हैं और उसे बेहतर बनाती रहती हैं, बजाय इसके कि हर व्यक्ति अपना scratch से rebuild करे। इसे infrastructure की तरह treat करें: documented, maintained, deliberately improved।

## Judgment के लिए hire और promote करें

जैसे-जैसे implementation सस्ती होती है, bottleneck specification, evaluation, और architectural judgment की तरफ move होता है। अगले कुछ वर्षों में सबसे valuable engineers वे होंगे जो agents को well direct कर सकते हैं — न कि वे जो सबसे ज़्यादा code type कर सकते हैं। यह reflect करें कि आप लोगों को कैसे hire, level, और develop करते हैं: raw implementation speed से ऊपर specification skill, evaluation rigor, और system design को weight दें।

सबसे strong setups design से hybrid होते हैं: humans direction set करते हैं, agents implement करते हैं, और clear handoff protocols boundary govern करते हैं। Code review, on-call, और team structure सभी evolve होते हैं agents को participants की तरह treat करने के लिए, न कि केवल tools की तरह।

## अपना खुद का workflow तैयार करें

- [ ] Rule files, prompts, evals, और skills को repo में डालें; changes के लिए PR review require करें।
- [ ] Shared harness के लिए एक owner assign करें।
- [ ] एक CI gate जोड़ें जो merges block करे जब eval suite एक threshold से नीचे regress हो।
- [ ] Generated-code failure modes के लिए एक one-page review guide लिखें।
- [ ] Prototype-vs-production boundary document करें: repos, branches, environments।
- [ ] अपने अगले hiring loop में, केवल coding test नहीं, एक specification-and-evaluation exercise जोड़ें।

---

स्रोत: *The New SDLC With Vibe Coding* (Google) — https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
