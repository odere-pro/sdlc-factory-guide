---
id: context-engineering
title: "Del 2 — Konstruera kontexten"
description: Styr vad agenten ser och när — statisk kontra dynamisk kontext, skills för progressiv avslöjning och kostnadsmedveten design.
sidebar_position: 4
keywords: [context engineering, dynamic context, skills, tokens, prompt design]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Del 2 — Konstruera kontexten',
      description: 'Styr vad agenten ser och när — statisk kontra dynamisk kontext, skills för progressiv avslöjning och kostnadsmedveten design.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/context-engineering',
      },
    })}
  </script>
</head>

# Del 2 — Konstruera kontexten

Kontextkonstruktion är den färdighet som skiljer snabb AI-utdata från *användbar* AI-utdata. Regelfilen från del 1 är en del av den. Den här delen handlar om den större disciplinen: att bestämma vad agenten ser, och när.

Det mentala skiftet är bort från "hur formulerar jag detta för att lura modellen till bra kod?" och mot "vad skulle en ny teammedlem behöva veta för att bidra väl, och hur överlämnar jag det effektivt?"

## De två hinkarna: statisk och dynamisk

Varje bit kontext hamnar i en av två hinkar, och att välja hink är ett verkligt ingenjörsbeslut med en verklig kostnad.

**Statisk kontext** laddas alltid, vid varje enskild förfrågan:

- Systeminstruktioner
- Regelfiler (`CLAUDE.md` och liknande)
- Globalt minne och persona

Den är pålitlig — agenten glömmer den aldrig — men dyr, eftersom du betalar för varje token av den vid varje anrop, oavsett om den aktuella uppgiften behöver den.

**Dynamisk kontext** laddas bara när den behövs:

- Skills som utlöses av den aktuella uppgiften
- Verktygsresultat som hämtas under körning
- Dokument som hämtas från ett sökindex
- Den senaste delen av konversationshistoriken

Den är effektiv — du betalar bara när informationen faktiskt är relevant.

Fällan i båda ytterligheterna: för mycket statisk kontext slösar pengar och *urvattnar signalen* (de viktiga reglerna drunknar i brus), medan för lite innebär att agenten glömmer saker den behövde. Behandla gränsen statisk/dynamisk som vilket annat arkitekturbeslut som helst — granskad och versionshantererad, inte slumpartad.

## En snabb kostnadsintuition

Säg att din regelfil är 2 000 tokens och du gör 50 förfrågningar i en session. Det är 100 000 tokens regelfil ensam, betald 50 gånger om. Om hälften av den filen är referensmaterial som bara är relevant för en uppgift, bränner du pengar på 49 förfrågningar som inte behövde det. Flytta den halvan till en skill som laddas vid behov, och kostnaden försvinner för de andra 49.

Det är därför "håll statisk kontext tät och innehållsrik" inte är en stilpreferens — det är en budgetpost.

## Skills: mönstret för dynamisk kontext

Det mest effektiva sättet att hantera den dynamiska hinken är en **skill**: ett självständigt paket med procedurell kunskap som agenten bara laddar när en uppgift matchar den.

Skills fungerar genom *progressiv avslöjning* — tre lager, laddade lata:

1. Vid uppstart ser agenten bara lättviktig metadata (ett namn och en enrads-beskrivning).
2. När en uppgift matchar laddar den de fullständiga instruktionerna.
3. Bara om den behöver djupet hämtar den tungt referensmaterial.

Resultatet: en lättviktig generalistagent kan bära dussintals specialistförmågor medan den bara betalar tokenkostnaden för den den aktivt använder.

En minimal skill ser ut så här:

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

Agenten läser detta bara när en uppgift faktiskt nämner återbetalningar. Resten av tiden kostar det ingenting förutom enrads-beskrivningen.

## De sex typerna av kontext att hantera

När du bestämmer vad du ska tillhandahålla, tänk i sex kategorier. De flesta arbetsflöden underinvesterar i de fyra i mitten.

- **Instruktioner** — agentens roll, mål och gränser (din regelfil).
- **Kunskap** — dokumentation, arkitekturdiagram, domändata.
- **Minne** — vad som just hände (session), och vad projektet handlar om (lång sikt).
- **Exempel** — referensmönster *från din egen kodbas*, inte generiska sådana från internet.
- **Verktyg** — exakta definitioner av de API:er och skript agenten kan anropa.
- **Skyddsräcken** — hårda begränsningar och säkerhetsregler.

"Exempel"-punkten är värd att lyfta fram: ett enda exempel hämtat från din riktiga kod lär agenten din stil snabbare än tre stycken beskrivning.

## Klistra inte in hela repot

Ett vanligt misslyckande är att dumpa ett helt 100 000-token-repository i prompten "så att det har allt." Det är både dyrt och kontraproduktivt — den relevanta signalen begravs. Hämta de få filer som är viktiga för den aktuella uppgiften istället och låt agenten be om mer. Hela-kodbas-medvetenhet är verktygets jobb (indexering, hämtning), inte något du gör manuellt varje prompt.

## Sätt upp ditt eget arbetsflöde

- [ ] Lista allt som för närvarande finns i din statiska kontext. Fråga för varje post: behöver *varje* uppgift detta?
- [ ] Flytta uppgiftsspecifikt material ut ur regelfilen och in i skills.
- [ ] Skriv din första skill för en återkommande specialiserad uppgift (ett återbetalningsflöde, ett migreringsmönster, ett rapportformat).
- [ ] Lägg till några verkliga exempel från din kodbas i regelfilen eller en skill.
- [ ] Sluta klistra in hela filer; låt hämtning lyfta fram det som är relevant.
