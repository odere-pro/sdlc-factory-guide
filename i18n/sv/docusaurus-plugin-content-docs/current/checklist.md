---
id: checklist
title: Implementeringschecklista
description: Komplett handlingsorienterad checklista för att sätta upp ett agentiskt ingenjörsarbetsflöde — från regelfiler till teamstandarder.
sidebar_position: 2
keywords: [checklist, implementation, setup, agentic engineering, AI development]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Implementeringschecklista',
      description: 'Komplett handlingsorienterad checklista för att sätta upp ett agentiskt ingenjörsarbetsflöde — från regelfiler till teamstandarder.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/checklist',
      },
    })}
  </script>
</head>

# Agentisk ingenjörskonst — Implementeringschecklista

## Innehåll
1. [Sätt upp regelfilen](#1-sätt-upp-regelfilen)
2. [Konstruera kontexten](#2-konstruera-kontexten)
3. [Bygg verifiering](#3-bygg-verifiering)
4. [Kör arbetet](#4-kör-arbetet)
5. [Granska och leverera](#5-granska-och-leverera)
6. [Kontrollera kostnaden](#6-kontrollera-kostnaden)
7. [Leverera produktionsagenter](#7-leverera-produktionsagenter)
8. [Gör det till en teamstandard](#8-gör-det-till-en-teamstandard)

---

## 1. Sätt upp regelfilen

- [ ] Skapa en `CLAUDE.md` / `AGENTS.md` i repo-roten. Börja med 10 rader.
- [ ] Täck in fyra saker:
  - [ ] Stack och versioner
  - [ ] Konventioner (mappstruktur, namngivning, mönster du faktiskt använder)
  - [ ] Hårda regler som agenten aldrig får bryta (förbjudna paket, hantering av hemligheter, lagerindelning)
  - [ ] Arbetsflöde att följa före och efter kodgenerering
- [ ] Lägg till en ny regel varje gång agenten gör något du inte vill ska upprepas.
- [ ] Lista de verktyg agenten får anropa och när de ska användas (API:er, skript, DB-scheman).
- [ ] Fatta arkitekturbeslut själv; låt agenten implementera dem, inte välja dem.

## 2. Konstruera kontexten

- [ ] Bestäm vad som är **statiskt** (alltid laddat) kontra **dynamiskt** (laddat vid behov):
  - [ ] Statiskt: regelfiler, systeminstruktioner, globalt minne
  - [ ] Dynamiskt: skills, verktygsresultat, hämtade dokument, nylig historik
- [ ] Håll den statiska kontexten kort och innehållsrik. Skär bort allt agenten inte behöver vid varje anrop.
- [ ] Flytta återkommande know-how till skills som bara laddas när uppgiften matchar.
- [ ] Klistra aldrig in hela repot i prompten. Hämta det som är relevant.

## 3. Bygg verifiering

- [ ] Skriv tester innan du genererar funktionen. Testerna är specifikationen.
- [ ] Skriv evalueringar för de icke-deterministiska delarna:
  - [ ] Tog agenten en rimlig väg?
  - [ ] Valde den rätt verktyg?
  - [ ] Uppfyller utdatan kvalitetskraven?
- [ ] Kontrollera både resultatet (kompilerar, tester passerar) och trajektorin (hur det kom dit).
- [ ] Sätt upp återkopplingsloopen:
  - [ ] Kör mot en benchmarksvit
  - [ ] Klustrera fel efter grundorsak
  - [ ] Åtgärda prompten eller verktyget som orsakade dem
  - [ ] Kör en regressionssvit igen
  - [ ] Övervaka produktion efter nya fel

## 4. Kör arbetet

- [ ] Välj ett läge per uppgift:
  - [ ] **Dirigent** (realtid, i IDE:n) för komplex logik, felsökning, okänd kodbas
  - [ ] **Orkestratör** (asynkront, delegera och granska) för buggfixar, migreringar, testgenerering
- [ ] Välj agentplats per uppgift:
  - [ ] Editoragent — in-flow-redigeringar och förslag
  - [ ] Terminalagent — arbete med flera filer, kör-och-reagera
  - [ ] Bakgrundsagent — paragraf-spec-uppgifter du kan lämna
- [ ] Kör kodgenerering inuti en sandlåda, med enbart godkända verktyg.
- [ ] Hantera de sista 20% själv: edge cases, felhantering, integrationspunkter, affärslogik. Koden som "ser rätt ut" är där buggarna gömmer sig.

## 5. Granska och leverera

- [ ] Använd agenten som en första granskare (buggar, stil, säkerhet, prestanda).
- [ ] Granska varje rad som levereras:
  - [ ] Var skeptisk mot smart kod
  - [ ] Bekräfta att importerade paket är verkliga
  - [ ] Kontrollera felhantering mot realistiska fel
- [ ] Lägg till hooks vid commit/redigerings-punkter (t.ex. blockera commits med hårdkodade hemligheter).
- [ ] Aktivera observerbarhet: traces, evalueringsresultat, token/latens/kostnad, drift.
- [ ] Peka agenten mot äldre arbete du undvikit: omstruktureringar, migreringar, föråldrade API:er.

## 6. Kontrollera kostnaden

- [ ] Mät total ägandekostnad, inte bara hastighet.
- [ ] Höj första-försökets-framgång med en tät regelfil för att undvika upprepningsloops.
- [ ] Rutt modeller efter uppgift:
  - [ ] Frontiermodeller för arkitektur och svår implementering
  - [ ] Billiga modeller för testgenerering, granskning, CI-övervakning
- [ ] Använd dynamisk kontext och skills så du bara betalar för de tokens du behöver.

## 7. Leverera produktionsagenter

- [ ] Bestäm vad du bygger:
  - [ ] Ett skript — agenten är ändpunkten
  - [ ] En produkt för riktiga användare — agenten behöver ett substrat
- [ ] För produkter, lägg till: beständigt minne, avgränsade behörigheter, evalueringstäckning i CI, spårning av hela körningar.
- [ ] Använd ett skills-paket så din befintliga kodagent hanterar bygg → utvärdera → driftsätt → observera.
- [ ] För multi-agent-upplägg, koordinera via delat tillstånd, MCP för verktyg, A2A för delegering.

## 8. Gör det till en teamstandard

- [ ] Versionshantera regelfiler, promptar, evalueringssviter och skills. Granska dem i PR:er. Tilldela ägare.
- [ ] Gate:a leverans på en godkänd evalueringssvit med ett tydligt rubric, inte en fungerande demo.
- [ ] Träna granskare i hur genererad kod misslyckas.
- [ ] Gör prototype-kontra-produktion-gränsen explicit (vilka repos, grenar, miljöer).
- [ ] Bygg harnessen en gång och fortsätt förfina den.
- [ ] Anställ och befordra för omdöme: specifikation, utvärdering, arkitektur.

---

### Referens

Baserat på *The New SDLC With Vibe Coding* (Google):
https://www.kaggle.com/whitepaper-the-new-SDLC-with-vibe-coding
