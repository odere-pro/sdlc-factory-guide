---
id: running-the-work
title: "Del 4 — Kör arbetet"
description: Dirigent- kontra orkestratörläge och var agenter passar — editor, terminal och bakgrund — samt 80%-problemet.
sidebar_position: 6
keywords: [agent modes, conductor, orchestrator, sandbox, code generation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Del 4 — Kör arbetet',
      description: 'Dirigent- kontra orkestratörläge och var agenter passar — editor, terminal och bakgrund — samt 80%-problemet.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/running-the-work',
      },
    })}
  </script>
</head>

# Del 4 — Kör arbetet

Du har en regelfil, konstruerad kontext och verifiering på plats. Nu gör du faktiskt arbetet. De två frågorna som avgör hur väl det går: vilket *läge* befinner du dig i, och vilken *typ* av agent passar uppgiften.

## Två lägen: dirigent och orkestratör

De flesta utvecklare rör sig mellan två lägen under dagen. De kräver olika färdigheter, och att använda fel läge för uppgiften är en vanlig källa till frustration.

**Dirigentläge** är realtid, hands-on. Du är i editorn, ser kod dyka upp, styr med promptar och korrigeringar och behåller finkornad kontroll. Du förstår varje ändring allteftersom den görs.

- Bäst för: komplex logik, knepig felsökning, okända kodbaser — varhelst du behöver förstå varje steg.
- Risken: om du styr varje tangenttryckning blir *du* flaskhalsen och hastighetsvinsten försvinner.

**Orkestratörläge** är asynkront och på högre nivå. Du definierar ett mål, överlämnar det till en agent och granskar resultatet — inte tangenttryckningarna. Agenter kan köra i bakgrunden, parallellt, på olika delar av kodbasen.

- Bäst för: välspecificerat arbete — buggfixar, migreringar, testgenerering, funktioner som följer ett etablerat mönster.
- Fällan: det kräver *mer* disciplin i förväg, inte mindre. Du måste skriva en precis specifikation innan du kan delegera. Utdelningen kommer på den andra uppgiften, inte den första.

Orkestratörläget belönar en annan färdighetsuppsättning än syntaxfluens:

- **Specifikation** — definiera uppgiften tillräckligt precist för att en agent ska kunna utföra den utan att gissa.
- **Dekomposition** — bryt ner stort arbete i agentanpassade enheter.
- **Utvärdering** — bedöm utdatakvalitet snabbt.
- **Systemdesign** — bygg de begränsningar och återkopplingsloopar som håller agenter produktiva.

## Tre platser där agenter passar in i din dag

Samma bild klippt på ett annat sätt: agenter dyker upp på tre platser. De flesta använder alla tre.

- **I editorn** — inlineifyllning och in-place-chatt, med hela-kodbas-medvetenhet. Det är här du stannar i flödet. (Copilot, Cursor, Windsurf, JetBrains AI.)
- **I terminalen** — du startar agenten, ger den ett mål på vanligt språk och låter den arbeta över filer, köra verktyg och tester och reagera på resultat. Det är här seriöst hands-on-arbete sker. (Claude Code, Codex CLI och liknande.)
- **I bakgrunden** — agenten kör autonomt i en sandlåda, ibland i timmar, och lämnar tillbaka en pull request att granska senare. (Jules, Copilot agent mode, Cursor background agents.)

Mappningen är intuitiv när man väl ser den: editoragenter passar *medan du skriver*; terminalagenter passar *arbete med flera filer och kör-och-reagera*; bakgrundsagenter passar *allt du kan beskriva i ett stycke och gå ifrån*. Rätt startpunkt är uppgiften, inte vilket verktyg som påstår sig ha mest autonomi.

## Kör inuti en sandlåda

När agenten kör kod — kör tester, provar en fix, läser filer — bör det ske inuti en isolerad sandlåda med en definierad, begränsad uppsättning verktyg och åtkomst. Det är detta som gör den autonoma "tänk → agera → observera"-loopen säker: agenten kan prova saker och misslyckas utan att röra något den inte borde.

## 80%-problemet (där det går fel)

En agent kommer att generera ungefär 80% av en funktion snabbt. De återstående 20% — edge cases, felhantering, integrationspunkter, subtil korrekthet — behöver djup kontext som modellen vanligtvis saknar. Och det är precis där produktionsfel lever.

Faran har skiftat. Tidiga AI-fel var uppenbara syntaxmisstag. Dagens fel är *konceptuella*: ett felaktigt antagande om affärslogik, ett missat edge case, ett arkitekturval som tyst ackumulerar underhållsskuld. De är svåra att fånga just för att **koden ser rätt ut och kanske till och med passerar grundläggande tester.**

Konkret:

```python
# The agent's 80%: looks correct, passes the happy-path test
def apply_discount(price, percent):
    return price * (1 - percent / 100)
```

De saknade 20% är allt agenten inte visste att fråga: Kan `percent` överstiga 100? Är `price` ett heltalsvärde i ören eller ett flyttal? Vilken valutaavrundning gäller? Ska en 100%-rabatt tillåtas alls, eller signalerar det ett fel uppströms? Inget av detta är synligt i koden — det är affärsregler du bär och modellen inte gör.

De utvecklare som klarar sig bra försöker inte gå snabbare genom att acceptera allt. De använder agenten för de välspecificerade 80% och ägnar sin egen uppmärksamhet åt de 20% som kräver omdöme.

## Sätt upp ditt eget arbetsflöde

- [ ] Välj medvetet dirigent eller orkestratör innan en uppgift — och lägg märke till när du dirigerar arbete du borde ha delegerat.
- [ ] Matcha agentplatsen med uppgiften: editor för in-flow, terminal för flera filer, bakgrund för gå-ifrån.
- [ ] Se till att kodkörning sker i en sandlåda med avgränsad åtkomst.
- [ ] För varje funktion, skriv ner de 20% — edge cases och affärsregler — och granska dessa rader själv, även om tester passerar.
