---
id: verification
title: "Del 3 — Bygg verifiering"
description: Tester som det deterministiska kontraktet och evalueringar för icke-deterministiskt beteende — kvalitetssvänghjulet som förstärks med tiden.
sidebar_position: 5
keywords: [verification, testing, evals, quality, AI evaluation]
image: /img/og-image.png
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org/',
      '@type': 'TechArticle',
      headline: 'Del 3 — Bygg verifiering',
      description: 'Tester som det deterministiska kontraktet och evalueringar för icke-deterministiskt beteende — kvalitetssvänghjulet som förstärks med tiden.',
      author: { '@type': 'Person', name: 'Oleksandr Derechei' },
      datePublished: '2026-06-18',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://odere-pro.github.io/sdlc-factory-guide/docs/verification',
      },
    })}
  </script>
</head>

# Del 3 — Bygg verifiering

Här är den linje som avgör om du bedriver riktig ingenjörskonst eller bara chansar: **hur verifieras dina utdatan?** Om svaret är "jag kör det och det verkar fungera" håller du på med vibe coding, oavsett hur sofistikerade dina promptar är. Verifiering är den disciplin som gör AI-utdata pålitliga för produktionssatsningar.

Två mekanismer samverkar. Tester täcker det som är deterministiskt. Evalueringar täcker det som inte är det.

## Tester: det deterministiska kontraktet

Tester verifierar de delar av ditt system där en given indata måste producera en given utdata. Det är samma tester du ändå skulle skriva — men i ett AI-arbetsflöde tar de på sig ett andra jobb: **de kommunicerar avsikten till agenten mer precist än någon prompt.**

Ett test är en specifikation en maskin kan kontrollera. Ge agenten ett misslyckat test och "få det att passera", och du har gett den ett entydigt mål plus ett automatiskt sätt att veta när det är klart. Skriv dem därför *först*:

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

Agenten vet nu om tröskelregeln och redovisningskravet utan att du behöver förklara dem i prosa. Testet *är* förklaringen.

## Evalueringar: bedöma de icke-deterministiska delarna

Tester kan inte täcka allt, eftersom mycket agentbeteende inte är deterministiskt. Tog agenten en rimlig väg till svaret? Valde den rätt verktyg? Är det slutliga resultatet faktiskt bra, inte bara syntaktiskt giltigt? Det är vad **evalueringar** mäter.

Evalueringar kontrolleras med märkta datamängder, poängrubrics och ibland en modell som fungerar som domare. Det finns två varianter, och du behöver båda:

- **Utdatautvärdering** — bedömer den slutliga artefakten. Kompilerar koden? Passerar testerna? Är sammanfattningen korrekt?
- **Trajektorieutvärdering** — bedömer *hur den kom dit*. Anropade agenten rätt verktyg i rimlig ordning, eller famlade den sig fram till ett godkänt resultat?

Trajektorie spelar större roll än det ser ut. En flytande utdata som hoppade över verifieringsstegen är *farligare* än en med ett uppenbart fel, eftersom den döljer risken. En agent som råkade producera korrekt kod men ignorerade testsviten kommer så småningom att producera felaktig kod på samma sätt.

## Ett konkret evalueringsrubric

För en agent som svarar på frågor från din dokumentation är en evalueringsuppsättning en lista med fall plus ett rubric:

```yaml
- question: "How do I rotate an API key?"
  must_mention: ["settings page", "revoke old key", "24h grace period"]
  must_not: ["email support"]   # we have self-serve rotation now
  tool_path: ["search_docs"]    # should retrieve, not answer from memory

- question: "What's the refund window?"
  must_mention: ["30 days"]
  tool_path: ["search_docs"]
```

Varje körning poängsätts: nämnde den de obligatoriska fakta, undvek den de förbjudna, och följde den den förväntade verktygssökvägen? En modelldomare kan bedöma den mjukare "är det här svaret tydligt och korrekt" dimensionen mot ett rubric du skriver. Poängen är att "bra" nu är definierat explicit och kontrolleras automatiskt — inte bedöms med blotta ögat.

## Kvalitetssvänghjulet

Tester och evalueringar når sitt fulla värde när du kopplar dem i en loop som förstärks:

1. **Utvärdera** mot din benchmarksvit.
2. **Diagnostisera** fel genom att klustrera dem i grundorsaker (inte fixa enstaka problem).
3. **Optimera** prompten, regeln eller verktyget som orsakade klustret.
4. **Verifiera** att fixet håller mot en regressionssvit.
5. **Övervaka** produktionstrafik efter nya felmoder, och mata dem tillbaka till steg 1.

Varje varv i den här loopen gör att nästa börjar från en högre basnivå. Det är så en agent blir pålitligt bättre över tid utan att ändra modellen under den.

## Sätt upp ditt eget arbetsflöde

- [ ] För din nästa funktion, skriv testerna innan du låter agenten generera kod.
- [ ] Bygg en liten evalueringsuppsättning — även tio fall — för ett agentbeteende du bryr dig om.
- [ ] För varje evalueringsfall, definiera både vad utdatan måste innehålla och vilken verktygssökväg du förväntar dig.
- [ ] Lägg till en regressionssvit som kör om varje fix.
- [ ] Välj ett produktionsfel den här veckan, hitta dess grundorsaksklusters och fixa orsaken, inte symptomet.
