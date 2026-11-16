# Het Kippenkamp: website

Statische website (HTML, CSS, JavaScript) met één Vercel-functie voor de formulieren.
Er is **geen build-stap**: elke push naar GitHub wordt door Vercel gewoon online gezet.

## Pagina's
| Bestand | Pagina |
|---|---|
| `index.html` | Home |
| `aanbod.html` | Alle rassen, met filter (ook bereikbaar via `aanbod.html#kuikens` enz.) |
| `aanvragen.html` | Aanvraagformulier (product, ras, aantal, afhaaldatum) |
| `over-ons.html` | Over ons, met plaats voor eigen foto's |
| `contact.html` | Contactformulier, contactgegevens, uitleg afhalen |
| `privacy.html` | Privacyverklaring |
| `404.html` | Pagina niet gevonden |

## Alles aanpassen doe je in `data.js`
- **Contactgegevens** (`SITE`): `email`, `telefoon`, `whatsapp`, `plaats`. Wat leeg is, wordt nergens getoond.
  De WhatsApp-knoppen verschijnen vanzelf zodra je een nummer invult (cijfers met landcode, bv. `32470123456`).
- **Teksten**: slogan, introductie, "Waarom bij ons", "Over ons", stappen.
- **Rassen en prijzen** (`PRODUCTEN`): `prijs: 2.5` (of `null` = "Prijs op aanvraag"), `beschikbaar: false`,
  een eigen `status` ("Beschikbaar vanaf maart") of `opmerking` ("Vanaf 6 stuks").
- **Nieuw ras**: kopieer een blok in `PRODUCTEN`, geef het een nieuwe `id` en pas aan.
- **Kwartels zelf aanbieden**: vervang bij een kwartel `kuiken: null` door `kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" }`.
  De categorie "Kwartels" op de homepage linkt dan automatisch naar die rassen.

## Foto's
Alle plekken waar een foto komt, staan in `BEELDEN` en `PRODUCTEN` (`data.js`). Zolang een veld leeg is, staat er een tekening.
1. Zet je foto in de map `images/`, met een beschrijvende naam zonder spaties (bv. `marans-zwart-koper-hen.jpg`).
2. Vul het pad in, bv. `hero: "images/hero.jpg"` of `fotos: ["images/marans-hen.jpg", "images/marans-eitjes.jpg"]`.

Plekken: `hero` (groot beeld homepage), `intro`, `overOnsDavidDanielle`, `overOnsDieren`, `categorie.*`, en per ras `fotos`.
Bij meerdere foto's kan de bezoeker erdoor bladeren. Tip voor snelle laadtijd: JPG, ongeveer 1600 px breed voor het hoofdbeeld
en 1200 px voor de rest, liefst onder 300 kB (bv. via squoosh.app). Voor delen op sociale media vervang je `images/og-image.png` (1200 x 630) door je eigen afbeelding met dezelfde bestandsnaam.

## Formulieren laten werken (eenmalig instellen!)
De formulieren sturen via `api/aanvraag.js` een e-mail naar jou, met Resend (resend.com, gratis voor kleine volumes).
Zolang dit niet is ingesteld, toont de website een eerlijke foutmelding en wordt er **niets** verzonden.

1. Maak een Resend-account en maak een **API-key** aan.
2. Vercel, jouw project, **Settings > Environment Variables**, voeg toe:
   - `RESEND_API_KEY` = je API-key
   - `MAIL_TO` = het e-mailadres waar de aanvragen binnenkomen
3. **Redeploy** (Deployments > ... > Redeploy), anders worden de nieuwe variabelen niet gebruikt.

Let op: zonder eigen domein bij Resend kan de testafzender (`onboarding@resend.dev`) volgens Resend alleen mailen naar het e-mailadres van je Resend-account.
Gebruik dus eerst dat adres als `MAIL_TO`. Wil je naar een ander adres, voeg dan in Resend een eigen domein toe, verifieer het en zet ook `MAIL_FROM`
(bv. `Het Kippenkamp <aanvragen@jouwdomein.be>`). Voorbeeld in `.env.example`. Zet nooit sleutels in GitHub.

Als bezoeker antwoord geeft op een aanvraag, kan je gewoon op "Beantwoorden" klikken: het e-mailadres van de bezoeker staat als antwoordadres ingesteld.

## Eigen domeinnaam
Het webadres in canonical-links, delen op sociale media, `sitemap.xml` en `robots.txt` staat nu op `https://website-drab-three-77.vercel.app`.
Koppel je een eigen domein (Vercel > Settings > Domains), voer dan uit: `node tools/set-domein.mjs https://www.jouwdomein.be`
en zet daarna de wijzigingen op GitHub.

## Wat nog moet
Zie het overzicht van ontbrekende gegevens in de opleveringsmelding (contactgegevens, prijzen, foto's, teksten nakijken).
