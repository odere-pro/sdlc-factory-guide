---
id: controlling-cost
title: "Del 6: Kontrollera kostnaden"
description: Total ägandekostnad i AI-arbetsflöden — förstaförsökssframgång, modellroutning efter uppgift och dynamisk kontext som kostnadskontroll.
sidebar_position: 8
keywords: [cost control, token economy, model routing, TCO, AI cost]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Del 6: Kontrollera kostnaden',
      description: 'Total ägandekostnad i AI-arbetsflöden — förstaförsökets-framgång, modellroutning efter uppgift och dynamisk kontext som kostnadskontroll.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/controlling-cost',
      },
    })}
  </script>
</head>

# Del 6: Kontrollera kostnaden

Den vanliga frågan om AI-utveckling är "hur snabbt kan vi leverera?" Den bättre frågan är "vad kostar det att äga detta?" Hastighet döljer den verkliga ekonomin. Det ärliga måttet är total ägandekostnad, och i ett AI-arbetsflöde domineras det av en sak: tokonekonomi.

## Den dolda skulden av att gå snabbt

Ad hoc-prompting ser nästan gratis ut — en prenumeration och några avslappnade promptar, nästan noll startkostnad. Räkningen anländer senare, och den förstärks:

- **Tokenförbränning.** Att dumpa stora ostrukturerade filer i kontextfönstret och be modellen fixa sina egna overifierade misstag skapar en dyr återförsöksloop med låg förstaförsöks-framgångsfrekvens. Varje misslyckat försök är tokens spenderade för ingenting.
- **Underhållsskatt.** Ostrukturerad genererad kod saknar konsekvens. Sex månader senare spenderar en ingenjör dagar på att rekonstruera "spaghettikod" som ingen designade.
- **Säkerhetsåtgärder.** Utan en evalueringsharness blir snabb kodgenerering snabb sårbarhetsgenerering. Att fixa ett fel i produktion kostar långt mer än att fånga det vid designtillfället.

Det strukturerade tillvägagångssättet vänder detta: du investerar i förväg i scheman, tester och kontext, och marginalkostnaden för att leverera och underhålla varje funktion sjunker kraftigt. Högre kostnad att bygga, mycket lägre kostnad att äga.

## Spak ett: förstaförsöks-framgång

Den billigaste token är den du inte spenderar på ett nytt försök. En tät, innehållsrik regelfil (del 1) och välhanterad kontext (del 2) höjer agentens förstaförsöks-framgångsfrekvens, vilket direkt minskar trial-and-error-looparna som bränner pengar. Kontextkonstruktion är inte bara en kvalitetspraxis — det är en kostnadskontrollpraxis. Samma tajta `CLAUDE.md` som förbättrar utdatan minskar också utgifterna.

Att skicka ett helt 100 000-token-repository i varje prompt är ekonomiskt ohållbart i skala. Hämta det som är relevant; betala för det du använder.

## Spak två: rutt efter uppgift

I ett ad hoc-arbetsflöde använder du en stor frontiermodell för allt — och betalar premiumpris för att fixa ett stavfel eller generera ett boilerplate-test. Ett designat arbetsflöde routar efter uppgiftskomplexitet:

- **Arkitektur, svår design** → Frontiermodell — behöver maximal resonering
- **Initial komplex implementering** → Frontiermodell — höga insatser, tvetydigt
- **Testgenerering** → Liten / billig modell — deterministisk, välspecificerad
- **Kodgranskning (första passet)** → Liten / billig modell — mönstermatchning
- **CI / övervakningskontroller** → Liten / billig modell — repetitiv, smal

En enkel routningskonfiguration gör detta konkret:

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

Att orkestrera en flermodells-mix låter dig hålla utdatakvaliteten där det spelar roll medan du pressar ner kostnaden för den deterministiska majoriteten av arbetet.

## Spak tre: dynamisk kontext och skills

Knyt an detta till del 2. Att ladda allt statiskt innebär att betala för det vid varje anrop. Att trycka uppgiftsspecifik kunskap till skills som laddas vid behov — och nå verktyg via anrop-på-begäran snarare än att baka in allt i prompten — håller nyttolastet per förfrågan litet. I skala är skillnaden mellan "allt alltid laddat" och "bara det som behövs" skillnaden mellan en livskraftig kostnadsstruktur och en ohållbar.

## En genomarbetad intuition

Anta att förstaförsöks-framgång går från 40% till 80% efter att du investerat i regelfilen och ett par skills. Uppgifter som brukade kräva ~2,5 försök behöver nu ~1,25. Det är hälften av tokens för samma utdata — innan du har routat en enda uppgift till en billigare modell. Lägg routning ovanpå (billiga modeller hanterar testgenerering och granskning, vilket kanske är hälften av dina anrop) och OpEx-kurvan böjer sig kraftigt.

## Sätt upp ditt eget arbetsflöde

- [ ] Sluta mäta bara hastighet; börja spåra tokenutgifter per levererad funktion.
- [ ] Skärp din regelfil specifikt för att höja förstaförsöks-framgång och döda återförsöksloops.
- [ ] Sätt upp modellroutning: billiga modeller för testgenerering, granskning och CI; frontier för arkitektur och svår implementering.
- [ ] Flytta uppgiftsspecifik kontext till on-demand skills så du inte betalar för det vid varje anrop.
- [ ] Jämför kostnad per funktion före och efter — den initiala investeringen bör synas som en lägre löpande räkning.
