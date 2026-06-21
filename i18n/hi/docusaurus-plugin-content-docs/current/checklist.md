---
id: checklist
title: कार्यान्वयन चेकलिस्ट
description: Agentic engineering workflow तैयार करने के लिए पूरी actionable checklist — rule files से लेकर team standards तक।
sidebar_position: 2
keywords: [checklist, implementation, setup, agentic engineering, AI development]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'कार्यान्वयन चेकलिस्ट',
      description: 'Complete actionable checklist for setting up an agentic engineering workflow — from rule files to team standards.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/checklist',
      },
    })}
  </script>
</head>

# Agentic Engineering — कार्यान्वयन चेकलिस्ट

## विषय-सूची
1. [Rule file तैयार करें](#1-rule-file-तैयार-करें)
2. [Context engineer करें](#2-context-engineer-करें)
3. [Verification बनाएँ](#3-verification-बनाएँ)
4. [काम चलाएँ](#4-काम-चलाएँ)
5. [Review करें और ship करें](#5-review-करें-और-ship-करें)
6. [Cost नियंत्रित करें](#6-cost-नियंत्रित-करें)
7. [Production agents ship करें](#7-production-agents-ship-करें)
8. [Team standard बनाएँ](#8-team-standard-बनाएँ)

---

## 1. Rule file तैयार करें

- [ ] Repo root में `CLAUDE.md` / `AGENTS.md` बनाएँ। 10 lines से शुरुआत करें।
- [ ] चार चीज़ें cover करें:
  - [ ] Stack और versions
  - [ ] Conventions (folder structure, naming, वे patterns जो आप वाकई उपयोग करते हैं)
  - [ ] Hard rules जो agent को कभी नहीं तोड़नी चाहिए (forbidden packages, secrets handling, layering)
  - [ ] Code generate करने से पहले और बाद में follow करने का Workflow
- [ ] जब भी agent कुछ ऐसा करे जो आप दोबारा नहीं चाहते, एक नया rule जोड़ें।
- [ ] वे tools list करें जिन्हें agent call कर सकता है और उनका उपयोग कब करना है (APIs, scripts, DB schemas)।
- [ ] Architecture decisions खुद लें; agent को implement करने दें, choose नहीं करने दें।

## 2. Context engineer करें

- [ ] तय करें कि क्या **static** है (हमेशा load) बनाम **dynamic** (माँगने पर load):
  - [ ] Static: rule files, system instructions, global memory
  - [ ] Dynamic: skills, tool results, retrieved docs, recent history
- [ ] Static context छोटा और high-signal रखें। जो चीज़ agent को हर call में नहीं चाहिए, उसे हटाएँ।
- [ ] दोहराने योग्य know-how को skills में डालें जो केवल तब load हों जब task match करे।
- [ ] पूरा repo prompt में कभी paste न करें। जो relevant है वही retrieve करें।

## 3. Verification बनाएँ

- [ ] Feature generate करने से पहले tests लिखें। Tests ही spec हैं।
- [ ] Non-deterministic हिस्सों के लिए evals लिखें:
  - [ ] क्या agent ने sensible path लिया?
  - [ ] क्या उसने सही tools चुने?
  - [ ] क्या output quality bar को पूरा करता है?
- [ ] Result (compiles, tests pass) और trajectory (कैसे पहुँचा) दोनों जाँचें।
- [ ] Feedback loop तैयार करें:
  - [ ] Benchmark suite के खिलाफ run करें
  - [ ] Failures को root cause से cluster करें
  - [ ] उस prompt या tool को ठीक करें जिसने उन्हें पैदा किया
  - [ ] Regression suite दोबारा run करें
  - [ ] नई failures के लिए production monitor करें

## 4. काम चलाएँ

- [ ] प्रत्येक task के लिए एक mode चुनें:
  - [ ] **Conductor** (real-time, in-IDE) — complex logic, debugging, अपरिचित code के लिए
  - [ ] **Orchestrator** (async, delegate and review) — bug fixes, migrations, test generation के लिए
- [ ] प्रत्येक task के लिए agent location चुनें:
  - [ ] Editor agent — in-flow edits और suggestions
  - [ ] Terminal agent — multi-file work, run-and-react
  - [ ] Background agent — paragraph-spec tasks जिन्हें आप छोड़ सकते हैं
- [ ] Code generation sandbox के अंदर, केवल approved tools का उपयोग करके चलाएँ।
- [ ] अंतिम 20% खुद संभालें: edge cases, error handling, integration points, business logic। जो code "सही लगता है" वहीं bugs छिपे होते हैं।

## 5. Review करें और ship करें

- [ ] Agent को first-pass reviewer के रूप में उपयोग करें (bugs, style, security, performance)।
- [ ] हर वह line review करें जो ship हो:
  - [ ] Clever code पर संदेह करें
  - [ ] Confirm करें कि imported packages असली हैं
  - [ ] Realistic failures के लिए error handling जाँचें
- [ ] Commit/edit points पर hooks जोड़ें (जैसे hard-coded secrets वाले commits block करें)।
- [ ] Observability चालू करें: traces, eval results, token/latency/cost, drift।
- [ ] Agent को उस legacy work पर लगाएँ जिसे आप टालते रहे हैं: refactors, migrations, deprecated APIs।

## 6. Cost नियंत्रित करें

- [ ] केवल speed नहीं, total cost of ownership मापें।
- [ ] Retry loops से बचने के लिए tight rule file से first-pass success बढ़ाएँ।
- [ ] Task के अनुसार models route करें:
  - [ ] Architecture और कठिन implementation के लिए frontier models
  - [ ] Test generation, review, CI monitoring के लिए सस्ते models
- [ ] Dynamic context और skills उपयोग करें ताकि आप केवल वे tokens के लिए pay करें जिनकी ज़रूरत है।

## 7. Production agents ship करें

- [ ] तय करें कि आप क्या बना रहे हैं:
  - [ ] एक script — agent ही endpoint है
  - [ ] Real users के लिए एक product — agent को substrate चाहिए
- [ ] Products के लिए जोड़ें: persistent memory, scoped permissions, CI में eval coverage, full-run tracing।
- [ ] Skills bundle उपयोग करें ताकि आपका मौजूदा coding agent build → evaluate → deploy → observe संभाल सके।
- [ ] Multi-agent setups के लिए, shared state से coordinate करें, tools के लिए MCP, delegation के लिए A2A।

## 8. Team standard बनाएँ

- [ ] Rule files, prompts, eval suites, और skills को version करें। PRs में review करें। Owners assign करें।
- [ ] Shipping को passing eval suite पर gate करें जिसमें clear rubric हो, working demo पर नहीं।
- [ ] Reviewers को सिखाएँ कि generated code कैसे fail करता है।
- [ ] Prototype-vs-production boundary स्पष्ट करें (कौन से repos, branches, environments)।
- [ ] Harness एक बार बनाएँ और उसे लगातार refine करते रहें।
- [ ] Judgment के लिए hire और promote करें: specification, evaluation, architecture।

---

### संदर्भ

*The New SDLC With Vibe Coding* (Google) पर आधारित:
https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
