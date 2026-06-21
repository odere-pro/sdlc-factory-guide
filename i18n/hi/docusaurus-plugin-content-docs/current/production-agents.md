---
id: production-agents
title: "Part 7 — Production Agents Ship करें"
description: Prototype script से production agent तक — persistent memory, scoped permissions, eval coverage, और multi-agent coordination।
sidebar_position: 9
keywords: [production agents, MCP, A2A, agent deployment, multi-agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Part 7 — Ship Production Agents',
      description: 'From prototype script to production agent — persistent memory, scoped permissions, eval coverage, and multi-agent coordination.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/production-agents',
      },
    })}
  </script>
</head>

# Part 7 — Production agents ship करें

अब तक सब कुछ software बनाने के लिए agents का उपयोग करने के बारे में था। यह Part उस बारे में है जब आप जो बना रहे हैं *वह खुद* एक agent है — एक customer support bot, एक research assistant, एक internal monitoring tool। ये एक बार run होने वाले scripts नहीं हैं; ये products हैं जो real users serve करते हैं, और उन्हें नीचे और भी चाहिए।

## पहले, तय करें कि आप वास्तव में क्या बना रहे हैं

शुरू करने से पहले सबसे useful सवाल:

- **क्या यह एक script है?** एक one-off automation, एक personal tool, एक prototype। Agent destination है। आपके terminal में एक regular coding agent काफी है।
- **क्या यह एक product है?** कुछ जिस पर real users निर्भर करते हैं। Agent अब product है, और उसे नीचे एक substrate चाहिए: उसके अपने tools, memory, evaluation, और deployment infrastructure।

दोनों को mix करना वह है जिससे prototypes accidentally ship होते हैं। कुछ भी लिखने से पहले explicitly तय करें कि आप कौन सा बना रहे हैं।

## एक production agent को script से ज़्यादा क्या चाहिए

जब real users agent पर निर्भर करते हैं, तो चार चीज़ें optional नहीं रहतीं:

- **Persistent memory** sessions में, ताकि agent हर बार शून्य से शुरू न करे।
- **Scoped permissions** हर tool और data source पर, ताकि agent केवल वही reach कर सके जो उसे करना चाहिए।
- **Eval coverage** CI में running, ताकि regressions ship होने से पहले पकड़े जाएँ (यह Part 3 है, agent पर ही apply)।
- **Observability** जो trace करे कि agent ने वास्तव में क्या किया, ताकि production behavior auditable हो (यह Part 5 है, agent पर ही apply)।

एक one-off script के लिए इनमें से कुछ भी effort के लायक नहीं। किसी product के लिए, इसे launch के बाद बजाय पहले बनाना वह है जिससे आप एक unmaintainable, untrustworthy system के साथ end up करते हैं।

## Prototype से production तक एक workflow रखें

जो shift इसे practical बनाती है: वही terminal-based workflow जो एक prototype produce करती है अब एक deployed product तक reach करती है। Production में जाने के लिए आप कोई separate stack नहीं सीखते। आप describe करते हैं कि आप क्या चाहते हैं, और एक skills bundle (Part 2 की तरह) आपके existing coding agent को पूरा lifecycle देता है — scaffold, write, evaluate, deploy, observability wire up — बिना किसी नए SDK के।

Loop, end to end, एक conversation की तरह दिखता है:

```
# one-time setup of the skills bundle, then, in your coding agent:
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

इसके पीछे, agent template से project scaffold करता है, code लिखता है, एक eval set generate करता है, उसे run करता है, deploy करता है, और report करता है। जो लोग directly drive करना prefer करते हैं, उनके लिए वही steps plain CLI commands के रूप में available हैं। परिणाम: वह prototype जो कल आपके laptop पर run हुआ, आज users serve करने वाला production agent बन जाता है, बिना rewrite के।

## Multi-agent की ओर जाना

जब एक agent काफी नहीं होता, coordination तीन mechanisms के through होता है, अलग-अलग scales पर उपयोग किए जाते हैं:

- **Shared session state** — simple cases के लिए जहाँ agents को बस एक ही context देखना है।
- **MCP (Model Context Protocol)** — standard तरीका agents के tools और external services access करने का।
- **A2A (Agent2Agent)** — एक agent द्वारा दूसरे को काम delegate करने के लिए।

ये जो भी pattern fit करे उसमें compose होते हैं: एक planner specialists को subtasks सौंपता है, एक job के अलग-अलग हिस्सों पर parallel workers, एक builder agent को check करने वाला reviewer agent। Bottleneck implementation लिखने से specification करने की तरफ move होता है — प्रत्येक agent को क्या करना चाहिए और उसने किया या नहीं verify करना — इस guide के बाकी हिस्से का same theme, एक level ऊपर।

## अपना खुद का workflow तैयार करें

- [ ] अपने अगले agent के लिए, एक वाक्य लिखें: "यह एक script है" या "यह एक product है।" उसे decide करने दें कि आप कितना substrate बनाते हैं।
- [ ] अगर यह एक product है, तो चार essentials जोड़ें: persistent memory, scoped permissions, CI evals, run tracing।
- [ ] एक skills bundle उपयोग करें ताकि build → evaluate → deploy → observe एक ही workflow में रहे।
- [ ] अगर आपको multiple agents चाहिए, shared state से शुरू करें; MCP और A2A केवल तब reach करें जब coordination actually उन्हें require करे।
