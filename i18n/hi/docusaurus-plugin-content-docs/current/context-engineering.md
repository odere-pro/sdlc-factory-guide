---
id: context-engineering
title: "Part 2 — Context Engineer करें"
description: Agent क्या देखता है और कब — static बनाम dynamic context, progressive disclosure के लिए skills, और cost-aware design।
sidebar_position: 4
keywords: [context engineering, dynamic context, skills, tokens, prompt design]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 2 — Engineer the Context',
      description: 'Control what the agent sees and when — static vs dynamic context, skills for progressive disclosure, and cost-aware design.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/context-engineering',
      },
    })}
  </script>
</head>

# Part 2 — Context engineer करें

Context engineering वह skill है जो fast AI output को *उपयोगी* AI output से अलग करती है। Part 1 का rule file उसका एक हिस्सा है। यह Part एक बड़े discipline के बारे में है: यह तय करना कि agent क्या देखता है, और कब।

मानसिक बदलाव यह है — "मैं इसे कैसे phrase करूँ ताकि model को अच्छे code के लिए मजबूर कर सकूँ?" से हटकर "एक नए teammate को अच्छा contribute करने के लिए क्या जानना होगा, और मैं उसे efficiently कैसे सौंपूँ?" की ओर।

## दो buckets: static और dynamic

Context का हर टुकड़ा दो buckets में से एक में आता है, और bucket चुनना एक असली engineering decision है जिसकी असली cost है।

**Static context** हमेशा load होता है, हर single request पर:

- System instructions
- Rule files (`CLAUDE.md` और उनके जैसे)
- Global memory और persona

यह reliable है — agent इसे कभी नहीं भूलता — लेकिन महँगा है, क्योंकि आप इसके हर token का हर call पर भुगतान करते हैं, चाहे current task को इसकी ज़रूरत हो या नहीं।

**Dynamic context** केवल ज़रूरत पड़ने पर load होता है:

- Task के हिसाब से trigger होने वाले skills
- Execution के दौरान pull किए गए tool results
- Search index से retrieve किए गए documents
- Conversation history का recent slice

यह efficient है — आप तभी pay करते हैं जब information वास्तव में relevant हो।

दोनों extremes पर trap: बहुत अधिक static context पैसे बर्बाद करता है और *signal को dilute करता है* (महत्वपूर्ण rules noise में डूब जाते हैं), जबकि बहुत कम का मतलब है agent उन चीज़ों को भूल जाता है जिनकी उसे ज़रूरत थी। Static/dynamic रेखा को किसी भी architectural decision की तरह treat करें — reviewed और versioned, accidental नहीं।

## Cost का त्वरित अंदाज़ा

मान लीजिए आपकी rule file 2,000 tokens की है और आप एक session में 50 requests करते हैं। यह अकेले rule file के 100,000 tokens हैं, 50 बार pay किए गए। अगर उस file का आधा हिस्सा reference material है जो केवल एक task के लिए relevant है, तो आप 49 requests पर पैसे जला रहे हैं जिन्हें इसकी ज़रूरत नहीं थी। उस आधे हिस्से को एक ऐसे skill में डालें जो माँग पर load हो और बाकी 49 के लिए cost गायब हो जाती है।

यही कारण है कि "static context dense और high-signal रखें" एक style preference नहीं है — यह एक line item है।

## Skills: dynamic context के लिए pattern

Dynamic bucket को manage करने का सबसे प्रभावी तरीका एक **skill** है: procedural knowledge का एक self-contained package जिसे agent केवल तब load करता है जब कोई task उससे match करता है।

Skills *progressive disclosure* के through काम करती हैं — तीन layers, lazily loaded:

1. Startup पर, agent केवल lightweight metadata देखता है (एक name और एक single-line description)।
2. जब कोई task match करता है, तो यह पूरी instructions load करता है।
3. केवल अगर उसे depth चाहिए तो यह heavy reference material pull करता है।

परिणाम: एक lightweight generalist agent दर्जनों specialist capabilities carry कर सकता है, जबकि केवल उस एक के लिए token cost pay करता है जिसे वह actively उपयोग कर रहा है।

एक minimal skill इस तरह दिखती है:

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

Agent इसे केवल तब पढ़ता है जब कोई task वास्तव में refunds का उल्लेख करता है। बाकी समय इसकी cost one-line description से ज़्यादा कुछ नहीं होती।

## Manage करने के लिए छह प्रकार के context

जब आप तय कर रहे हों कि क्या provide करना है, तो छह categories में सोचें। ज़्यादातर workflows बीच के चार में कम निवेश करते हैं।

- **Instructions** — agent का role, goals, और boundaries (आपकी rule file)।
- **Knowledge** — docs, architecture diagrams, domain data।
- **Memory** — अभी क्या हुआ (session), और project क्या है (long-term)।
- **Examples** — *आपके अपने codebase* से reference patterns, internet से generic नहीं।
- **Tools** — उन APIs और scripts की precise definitions जिन्हें agent call कर सकता है।
- **Guardrails** — hard constraints और safety rules।

"Examples" वाला point उल्लेखनीय है: आपके real code से खींचा गया एक example agent को तीन paragraphs के description से तेज़ आपका style सिखाता है।

## पूरा repo paste न करें

एक common failure है पूरे 100,000-token repository को prompt में डाल देना "ताकि उसके पास सब कुछ हो।" यह महँगा भी है और counterproductive भी — relevant signal दब जाता है। इसके बजाय current task के लिए matter करने वाली कुछ files retrieve करें, और agent को और माँगने दें। Whole-codebase awareness tool का काम है (indexing, retrieval), न कि कुछ जो आप हर prompt पर manually करें।

## अपना खुद का workflow तैयार करें

- [ ] अपने static context में जो कुछ भी है उसे list करें। प्रत्येक item के लिए पूछें: क्या *हर* task को इसकी ज़रूरत है?
- [ ] Task-specific material को rule file से बाहर skills में डालें।
- [ ] किसी एक recurring specialized task के लिए अपनी पहली skill लिखें (एक refund flow, एक migration pattern, एक report format)।
- [ ] अपने codebase से rule file या किसी skill में कुछ real examples जोड़ें।
- [ ] पूरी files paste करना बंद करें; retrieval को relevant चीज़ें surface करने दें।
