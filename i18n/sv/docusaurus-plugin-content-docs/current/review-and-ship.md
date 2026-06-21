---
id: review-and-ship
title: "Del 5: Granska och leverera"
description: Agent som förstahandsgranskare, granskningschecklista för genererad kod, commit-hooks och observerbarhet för AI-arbetsflöden.
sidebar_position: 7
keywords: [code review, shipping, observability, hooks, generated code]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Del 5: Granska och leverera',
      description: 'Agent som förstahandsgranskare, granskningschecklista för genererad kod, commit-hooks och observerbarhet för AI-arbetsflöden.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/review-and-ship',
      },
    })}
  </script>
</head>

# Del 5: Granska och leverera

När en agent skriver 80% av din kod blir du mer granskare än författare. Arbetet skiftar från att skriva till att bedöma — och bedömningen måste vara skarpare än den var, eftersom genererad kod misslyckas på tystare sätt än mänsklig kod.

## Låt agenten ta det första passet

Använd agenten som en förstahandsgranskare innan en människa tittar på något. Den är bra på det mekaniska lagret: fånga troliga buggar, stilöverträdelser, säkerhetslukt och prestandaproblem. Det rensar bort bruset så att den mänskliga granskaren kan ägna uppmärksamhet åt det som faktiskt behöver en människa — design, underhållbarhet, huruvida den här ändringen passar systemets riktning.

Uppdelningen är poängen. Förstahandsgranskning är mekanisk och kan delegeras. Slutgiltigt omdöme om design är det inte.

## Granska varje rad som levereras — med rätt misstänksamhet

Reflexen att lita på kod för att den körs är precis fel reflex för genererad kod. Granska varje rad som ska till produktion, och rikta din misstänksamhet mot de specifika sätt AI-utdata misslyckas på:

- **Var skeptisk mot smart kod.** Genererade lösningar söker ibland efter en elegant abstraktion där en tråkig var korrekt. Smart är en varningsflagga, inte en komplimang.
- **Bekräfta att importer är verkliga.** Modeller hallucinerar trovärdiga paketnamn. En import som ser rätt ut kan vara ett paket som inte finns — eller värre, ett skadligt ockuperat namn som en modell ofta hittar på.
- **Kontrollera felhantering mot realistiska fel.** Genererad kod tenderar att täcka den lyckliga vägen väl och felvägar dåligt. Fråga vad som händer när nätverksanropet tar för lång tid, indata är tom, raden saknas.

Kostnaden för att hoppa över detta är konkret: kod som ditt team inte förstår blir felsökningskostnad ditt team inte har råd med. Besparingarna från snabb generering försvinner första gången någon spenderar tre dagar på att rekonstruera ett smart block som ingen granskade.

## Hooks: låt maskinen genomdriva reglerna den glömmer

Vissa regler är för viktiga för att förlita sig på granskning för. Koda in dem som **hooks** — deterministisk kod som körs vid fasta punkter i livscykeln (före ett verktygsanrop, efter en filredigering, före en commit) och automatiskt blockerar dåliga åtgärder.

En pre-commit hook som vägrar att commita en hårdkodad hemlighet:

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
if git diff --cached | grep -E -i '(api[_-]?key|secret|password|token)\s*=\s*["'\''"][^"'\'']+'; then
  echo "Blocked: looks like a hard-coded secret. Remove it before committing."
  exit 1
fi
```

Hooks är där du lägger det en agent (eller en människa) "aldrig borde glömma men ofta gör." Till skillnad från en regel i en fil kan en hook inte argumenteras förbi.

## Observerbarhet: se vad agenten faktiskt gjorde

Du kan inte hantera det du inte kan se. När agenter tar på sig mer arbete, sätt upp observerbarhet så att du kan svara på "vad gjorde den, och varför?" Spåra:

- **Traces** av varje körning — den fullständiga sekvensen av steg och verktygsanrop.
- **Evalueringsresultat** över tid, så att kvalitetsregressioner syns tidigt.
- **Tokenkostnad och latens**, så ett arbetsflöde som tyst blivit dyrt syns.
- **Drift** — beteende som förändras över tid utan uppenbar orsak.

Utan detta är en felaktigt beteende agent en svart låda och ditt enda felsökningsverktyg är gissningar.

## Den underskattade vinsten: underhåll

Peka ditt nu kapabla arbetsflöde mot arbete du undvikit. Äldre kod som var "för riskabel att röra" för att bara dess ursprungliga författare förstod den är precis där en agent gör sig förtjänt: den kan läsa koden, inferera mönstren, hitta de relevanta filerna och göra ändringar som respekterar vad som finns.

Det låser upp arbete som tidigare aldrig hände för att det var för tråkigt och riskabelt: ramverksmigreringar, föråldrade API-uppdateringar, modernisering av gamla testsviter. En migrering som ingen ville lägga ett kvartal på blir en välspecificerad bakgrundsuppgift med en granskningsbar PR i slutet.

## Sätt upp ditt eget arbetsflöde

- [ ] Lägg till ett förstahandsgranskningssteg (agenten granskar diffen) före mänsklig granskning.
- [ ] Skriv en granskningschecklista för genererad kod: smarta abstraktioner, hallucinerade importer, svag felhantering.
- [ ] Lägg till minst en hook — börja med hemlighetsblockeraren ovan.
- [ ] Aktivera spårning för agentkörningar och watch tokenkostnad och evalueringspoäng över tid.
- [ ] Välj en "för riskabel att röra"-del av äldre kod och ge den till agenten som en avgränsad, granskningsbar uppgift.
