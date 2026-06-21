---
id: production-agents
title: "Del 7 — Leverera produktionsagenter"
description: Från prototypskript till produktionsagent — beständigt minne, avgränsade behörigheter, evalueringstäckning och multi-agent-koordination.
sidebar_position: 9
keywords: [production agents, MCP, A2A, agent deployment, multi-agent]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Del 7 — Leverera produktionsagenter',
      description: 'Från prototypskript till produktionsagent — beständigt minne, avgränsade behörigheter, evalueringstäckning och multi-agent-koordination.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/production-agents',
      },
    })}
  </script>
</head>

# Del 7 — Leverera produktionsagenter

Allt hittills har handlat om att använda agenter för att bygga programvara. Den här delen handlar om när det du bygger *är* en agent — en kundtjänstbot, en forskningsassistent, ett internt övervakningsverktyg. Det är inte skript du kör en gång; de är produkter som betjänar riktiga användare, och de behöver mer under sig.

## Bestäm först vad du faktiskt bygger

Den enskilt mest användbara frågan innan du börjar:

- **Är detta ett skript?** En engångsautomation, ett personligt verktyg, en prototyp. Agenten är destinationen. En vanlig kodningsagent i din terminal räcker.
- **Är detta en produkt?** Något riktiga användare är beroende av. Agenten är nu produkten, och den behöver ett substrat under sig: egna verktyg, minne, utvärdering och driftsättningsinfrastruktur.

Att blanda ihop de två är hur prototyper levereras av misstag. Var explicit om vilken du bygger innan du skriver något.

## Vad en produktionsagent behöver som ett skript inte gör

När riktiga användare är beroende av agenten slutar fyra saker vara valfria:

- **Beständigt minne** mellan sessioner, så agenten inte börjar från noll varje gång.
- **Avgränsade behörigheter** på varje verktyg och datakälla, så agenten bara kan nå det den borde.
- **Evalueringstäckning** som körs i CI, så regressioner fångas innan de levereras (detta är del 3, tillämpad på agenten själv).
- **Observerbarhet** som spårar vad agenten faktiskt gjorde, så produktionsbeteende är granskningsbart (detta är del 5, tillämpad på agenten själv).

För ett engångsskript är inget av detta värt ansträngningen. För en produkt är att bygga det *efter* lansering istället för innan hur du hamnar med ett ounderhållbart, opålitligt system.

## Håll ett arbetsflöde från prototyp till produktion

Det skifte som gör detta praktiskt: samma terminalbaserade arbetsflöde som producerar en prototyp når nu hela vägen till en driftsatt produkt. Du lär dig inte en separat stack för att gå till produktion. Du beskriver vad du vill, och ett skills-paket (som från del 2) ger din befintliga kodningsagent hela livscykeln — scaffold, skriv, utvärdera, driftsätt, koppla upp observerbarhet — utan en ny SDK.

Loopen, från början till slut, ser ut som ett samtal:

```
# one-time setup of the skills bundle, then, in your coding agent:
> Build a support agent that answers questions from our docs.
> Evaluate it against the FAQ dataset.
> Deploy it to the runtime.
```

Bakom det scaffoldar agenten projektet från en mall, skriver koden, genererar en evalueringsuppsättning, kör den, driftsätter och rapporterar tillbaka. För dem som föredrar att köra direkt finns samma steg tillgängliga som vanliga CLI-kommandon. Resultatet: prototypen som körde på din laptop igår blir produktionsagenten som betjänar användare idag, utan en omskrivning.

## Gå multi-agent

När en agent inte räcker sker koordination via tre mekanismer, använda på olika skalor:

- **Delat sessionstillstånd** — för enkla fall där agenter bara behöver se samma kontext.
- **MCP (Model Context Protocol)** — standardsättet för agenter att komma åt verktyg och externa tjänster.
- **A2A (Agent2Agent)** — för en agent som delegerar arbete till en annan.

Dessa komponeras till vilket mönster som passar: en planerare som lämnar deluppgifter till specialister, parallella arbetare på olika delar av ett jobb, en granskaragent som kontrollerar en byggaregent. Flaskhalsen flyttar från att skriva implementeringen till att specificera vad varje agent ska göra och verifiera att den gjorde det — samma tema som resten av den här guiden, en nivå upp.

## Sätt upp ditt eget arbetsflöde

- [ ] För din nästa agent, skriv en mening: "detta är ett skript" eller "detta är en produkt." Låt det avgöra hur mycket substrat du bygger.
- [ ] Om det är en produkt, lägg till de fyra grundläggande sakerna: beständigt minne, avgränsade behörigheter, CI-evalueringar, körningsspårning.
- [ ] Använd ett skills-paket så bygg → utvärdera → driftsätt → observera stannar i ett arbetsflöde.
- [ ] Om du behöver flera agenter, börja med delat tillstånd; ta till MCP och A2A bara när koordinationen faktiskt kräver dem.
