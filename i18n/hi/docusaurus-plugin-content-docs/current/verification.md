---
id: verification
title: "Part 3 — Verification बनाएँ"
description: Deterministic contract के रूप में tests और non-deterministic behavior के लिए evals — quality flywheel जो compound होता है।
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 3 — Build Verification',
      description: 'Tests as the deterministic contract and evals for non-deterministic behavior — the quality flywheel that compounds.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/verification',
      },
    })}
  </script>
</head>

# Part 3 — Verification बनाएँ

यहाँ वह रेखा है जो तय करती है कि आप real engineering कर रहे हैं या बस जुआ खेल रहे हैं: **आपके outputs कैसे verify होते हैं?** अगर जवाब है "मैं चलाता हूँ और यह काम करता लगता है," तो आप vibe coding कर रहे हैं, चाहे आपके prompts कितने भी sophisticated हों। Verification वह discipline है जो AI output को production stakes पर भरोसेमंद बनाती है।

दो mechanisms मिलकर काम करते हैं। Tests वह cover करते हैं जो deterministic है। Evals वह cover करते हैं जो नहीं है।

## Tests: deterministic contract

Tests आपके system के उन हिस्सों को verify करते हैं जहाँ एक given input को एक given output produce करना ही चाहिए। ये वही tests हैं जो आप वैसे भी लिखते — लेकिन AI workflow में वे एक दूसरा काम भी करते हैं: **वे agent को किसी भी prompt से ज़्यादा precisely intent communicate करते हैं।**

एक test एक specification है जिसे machine check कर सकती है। Agent को एक failing test और "इसे pass करो" दें, और आपने उसे एक unambiguous target दे दिया, साथ में एक automatic तरीका यह जानने का कि काम कब हो गया। इसलिए उन्हें *पहले* लिखें:

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

Agent को अब threshold rule और ledger requirement prose में explain किए बिना पता है। Test *ही* explanation है।

## Evals: non-deterministic हिस्सों को judge करना

Tests हर चीज़ cover नहीं कर सकते, क्योंकि agent behavior का बहुत हिस्सा deterministic नहीं है। क्या agent ने answer तक पहुँचने के लिए sensible path लिया? क्या उसने सही tools चुने? क्या final output वास्तव में अच्छा है, सिर्फ syntactically valid नहीं? यही **evals** measure करते हैं।

Evals को labelled datasets, scoring rubrics, और कभी-कभी judge के रूप में काम करने वाले model से check किया जाता है। दो flavors हैं, और आपको दोनों चाहिए:

- **Output evaluation** — final artifact को judge करता है। क्या code compile होता है? क्या tests pass हैं? क्या summary accurate है?
- **Trajectory evaluation** — यह judge करता है कि *वह वहाँ कैसे पहुँचा*। क्या agent ने सही tools को reasonable order में call किया, या क्या वह भटका और किसी passing result पर ठोकर खाई?

Trajectory जितनी दिखती है उससे ज़्यादा matter करती है। एक fluent output जिसने अपने verification steps skip किए, वह obvious error वाले output से *ज़्यादा* dangerous है, क्योंकि यह risk छिपाता है। एक agent जिसने test suite को ignore करते हुए correct code produce किया, वह अंततः उसी तरह incorrect code produce करेगा।

## एक concrete eval rubric

आपके docs से सवालों का जवाब देने वाले agent के लिए, एक eval set cases और rubric की list है:

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

प्रत्येक run score करता है: क्या उसने required facts का उल्लेख किया, forbidden ones से बचा, और expected tool path follow किया? एक model judge आपके लिखे rubric के खिलाफ softer "क्या यह answer clear और correct है" dimension grade कर सकता है। बात यह है कि "अच्छा" अब explicitly define है और automatically check होता है — eyeballed नहीं।

## Quality flywheel

Tests और evals अपनी पूरी value तब हासिल करते हैं जब आप उन्हें एक ऐसे loop में wire करते हैं जो compound होता है:

1. **Evaluate** अपने benchmark suite के खिलाफ।
2. **Diagnose** failures को root causes में cluster करके (एक-एक fix करने के बजाय)।
3. **Optimize** वह prompt, rule, या tool जिसने cluster पैदा किया।
4. **Verify** fix को regression suite के खिलाफ ताकि यह fixed रहे।
5. **Monitor** production traffic में नए failure modes के लिए, और उन्हें step 1 में वापस feed करें।

इस loop का प्रत्येक turn अगले को एक ऊँचे baseline से शुरू करता है। इसी तरह एक agent underlying model बदले बिना time के साथ reliably बेहतर होता है।

## अपना खुद का workflow तैयार करें

- [ ] अपने अगले feature के लिए, agent को code generate करने देने से पहले tests लिखें।
- [ ] एक छोटा eval set बनाएँ — केवल दस cases — किसी एक agent behavior के लिए जिसकी आपको परवाह है।
- [ ] प्रत्येक eval case के लिए, output में क्या होना चाहिए और आप कौन सा tool path expect करते हैं, दोनों define करें।
- [ ] एक regression suite जोड़ें जो हर fix को re-run करे।
- [ ] इस हफ्ते एक production failure चुनें, उसका root-cause cluster ढूंढें, और symptom नहीं बल्कि cause ठीक करें।
