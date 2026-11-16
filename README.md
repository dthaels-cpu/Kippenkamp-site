# Het Kippenkamp

Statische website, geen build nodig.

## Aanpassen
Alles staat in `data.js`:
- contactgegevens en teksten bovenaan (`SITE`)
- producten, prijzen en beschikbaarheid in `PRODUCTEN`

Prijs invullen: `prijs: 2.5`. Prijs leeg laten: `prijs: null` (toont "Prijs op aanvraag").
Niet beschikbaar: `beschikbaar: false`.
Nieuw ras: kopieer een blok in `PRODUCTEN` en pas het aan.
Foto toevoegen: leg het bestand in een map `images/` en vul `foto: "images/naam.jpg"` in.
Kwartelkuikens aanbieden: vervang `kuiken: null` door `kuiken: { prijs: null, beschikbaar: true }`.

## Online zetten met Vercel
1. Zet deze map in een GitHub-repo (of gebruik `npx vercel` in deze map).
2. Op vercel.com: "Add New Project", kies de repo, Framework Preset "Other", niets invullen bij build, Deploy.
3. Domeinnaam koppelen via Project Settings, Domains.
