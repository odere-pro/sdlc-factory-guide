---
id: running-the-work
title: "Part 4 — काम चलाएँ"
description: Conductor बनाम orchestrator modes और agents कहाँ fit होते हैं — editor, terminal, और background — साथ ही 80% problem।
sidebar_position: 6
keywords: [agent modes, conductor, orchestrator, sandbox, code generation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 4 — Run the Work',
      description: 'Conductor vs orchestrator modes and where agents fit — editor, terminal, and background — plus the 80% problem.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/running-the-work',
      },
    })}
  </script>
</head>

# Part 4 — काम चलाएँ

आपके पास rule file है, engineered context है, और verification in place है। अब आप वास्तव में काम करते हैं। दो सवाल तय करते हैं कि यह कितना अच्छा जाएगा: आप किस *mode* में हैं, और task के लिए कौन सा *प्रकार* का agent fit होता है।

## दो modes: conductor और orchestrator

ज़्यादातर developers पूरे दिन दो modes के बीच move करते हैं। इन्हें अलग-अलग skills चाहिए, और task के लिए गलत mode का उपयोग frustration का एक common source है।

**Conductor mode** real-time, hands-on है। आप editor में हैं, code appear होते देख रहे हैं, prompts और corrections से steer कर रहे हैं, fine-grained control बनाए रख रहे हैं। आप हर बदलाव को जैसे-जैसे वह होता है समझते हैं।

- के लिए सबसे अच्छा: complex logic, tricky debugging, unfamiliar codebases — जहाँ भी आपको हर step समझना हो।
- Risk: अगर आप हर keystroke direct करते हैं, *आप* bottleneck बन जाते हैं और speed-up गायब हो जाती है।

**Orchestrator mode** asynchronous और higher-level है। आप एक goal define करते हैं, उसे agent को सौंपते हैं, और outcome review करते हैं — keystrokes नहीं। Agents background में, parallel में, codebase के अलग-अलग हिस्सों पर run कर सकते हैं।

- के लिए सबसे अच्छा: well-specified work — bug fixes, migrations, test generation, features जो एक established pattern follow करती हैं।
- The catch: इसे upfront ज़्यादा discipline चाहिए, कम नहीं। आपको delegate करने से पहले एक precise spec लिखना होगा। Payoff पहले task पर नहीं, दूसरे पर मिलता है।

Orchestrator mode syntax fluency से अलग एक skill set reward करता है:

- **Specification** — task को इतने precisely define करना कि agent बिना अनुमान लगाए execute कर सके।
- **Decomposition** — बड़े काम को agent-sized units में तोड़ना।
- **Evaluation** — output quality को जल्दी judge करना।
- **System design** — वे constraints और feedback loops बनाना जो agents को productive रखते हैं।

## आपके दिन में agents के तीन स्थान

उसी तस्वीर को अलग तरीके से काटते हुए, agents तीन locations पर दिखते हैं। ज़्यादातर लोग तीनों उपयोग करते हैं।

- **Editor में** — inline completion और in-place chat, whole-codebase awareness के साथ। यहाँ आप flow में रहते हैं। (Copilot, Cursor, Windsurf, JetBrains AI.)
- **Terminal में** — आप agent launch करते हैं, उसे plain language में एक goal देते हैं, और उसे files में काम करने, tools और tests run करने, और results पर react करने देते हैं। यहाँ serious hands-on काम होता है। (Claude Code, Codex CLI, और similar.)
- **Background में** — agent autonomously एक sandbox में run करता है, कभी-कभी घंटों के लिए, और बाद में review करने के लिए एक pull request वापस देता है। (Jules, Copilot agent mode, Cursor background agents.)

Mapping एक बार देखने के बाद intuitive है: editor agents *जब आप लिख रहे हों* तब fit होते हैं; terminal agents *multi-file exploration और run-and-react* के लिए fit हैं; background agents *किसी भी चीज़ के लिए जिसे आप एक paragraph में describe कर सकते हैं और छोड़ सकते हैं*। सही शुरुआती point task है, न कि वह tool जो सबसे ज़्यादा autonomy claim करता है।

## Sandbox के अंदर run करें

जब agent code execute करता है — tests run करना, fix try करना, files पढ़ना — तो उसे tools और access के एक defined, limited set के साथ एक isolated sandbox के अंदर करना चाहिए। यही autonomous "think → act → observe" loop को safe बनाता है: agent चीज़ें try कर सकता है और fail हो सकता है बिना किसी ऐसी चीज़ को छुए जो उसे नहीं छूनी चाहिए।

## 80% problem (जहाँ यह गलत होता है)

एक agent एक feature का लगभग 80% तेज़ी से generate करेगा। बाकी 20% — edge cases, error handling, integration points, subtle correctness — को deep context चाहिए जो model के पास आमतौर पर नहीं होता। और यहीं production failures रहती हैं।

खतरा बदल गया है। शुरुआती AI errors obvious syntax mistakes थे। आज की errors *conceptual* हैं: business logic के बारे में एक गलत assumption, एक missed edge case, एक architectural choice जो चुपचाप maintenance debt pile करती जाती है। उन्हें पकड़ना मुश्किल है क्योंकि **code सही लगता है और basic tests भी pass कर सकता है।**

Concretely:

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)
```

जो 20% missing है वह सब कुछ है जो agent ने नहीं पूछा: क्या `percent` 100 से ज़्यादा हो सकता है? क्या `price` एक integer cents value है या float? कौन सी currency rounding लागू होती है? क्या 100% discount बिल्कुल allowed होनी चाहिए, या यह upstream कोई bug signal करता है? इनमें से कोई भी code में visible नहीं है — ये business rules हैं जो आपके पास हैं और model के पास नहीं।

जो developers अच्छा करते हैं वे सब कुछ accept करके तेज़ जाने की कोशिश नहीं करते। वे well-specified 80% के लिए agent का उपयोग करते हैं और उस 20% पर अपना ध्यान लगाते हैं जिसे judgment चाहिए।

## अपना खुद का workflow तैयार करें

- [ ] किसी task से पहले, consciously conductor या orchestrator चुनें — और notice करें कि आप कब ऐसा काम conduct कर रहे हैं जो आपको delegate करना चाहिए था।
- [ ] Agent location को task से match करें: in-flow के लिए editor, multi-file के लिए terminal, walk-away के लिए background।
- [ ] सुनिश्चित करें कि code execution scoped access के साथ sandbox में हो।
- [ ] हर feature के लिए, 20% लिख लें — edge cases और business rules — और उन lines को खुद review करें, भले ही tests pass हों।
