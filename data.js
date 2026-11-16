/* =====================================================
   HIER PAS JE ALLES AAN: gegevens, prijzen en aanbod.
   Je hoeft niets anders te wijzigen.
   ===================================================== */

const SITE = {
  naam: "Het Kippenkamp",
  slogan: "Broedeieren en eendagskuikens van kippen en kwartels",

  // Contactgegevens (vul aan)
  email: "info@hetkippenkamp.be",
  telefoon: "",            // bv. "+32 400 00 00 00"
  whatsapp: "",            // alleen cijfers met landcode, bv. "32400000000"
  plaats: "",              // bv. "Wuustwezel"

  // Teksten
  overOns: [
    "Welkom bij Het Kippenkamp. Wij houden kippen en kwartels met oog voor mooie rassen, gezonde dieren en rustige omgang.",
    "Of je nu een paar kippen in de tuin wil, je eerste kwartels zoekt of gewoon graag zelf eitjes uitbroedt: bij ons vind je broedeieren en eendagskuikens van rassen waar we zelf achter staan."
  ],
  watWeDoen: [
    { titel: "Broedeieren", tekst: "Bevruchte eieren van onze eigen dieren, om zelf uit te broeden." },
    { titel: "Eendagskuikens", tekst: "Kuikens op bestelling, zodat je ze meteen in je eigen hok kan zetten." },
    { titel: "Advies", tekst: "Twijfel je over een ras of over het uitbroeden? Stel gerust je vraag." }
  ],

  // Hoe bestellen/ophalen werkt (vrije tekst, mag leeg)
  bestelInfo: "Reserveer via mail of telefoon. We bevestigen beschikbaarheid en spreken af wanneer je alles kan ophalen.",

  // Eenheden die bij de prijs getoond worden
  eenheidBroedei: "ei",
  eenheidKuiken: "kuiken"
};

/* -----------------------------------------------------
   PRODUCTEN
   soort:    "kip" of "kwartel"
   broedei / kuiken:
       prijs: getal (bv. 2.5) of null  -> null toont "Prijs op aanvraag"
       beschikbaar: true / false       -> false toont "Momenteel niet beschikbaar"
     Zet het hele blok op null om dat product niet te tonen
     (bv. kuiken: null als je het niet aanbiedt).
   foto: optioneel, bv. "images/orpington.jpg" (leg het bestand in de map images)
   ----------------------------------------------------- */

const PRODUCTEN = [
  // ---------- KWARTELS ----------
  {
    soort: "kwartel",
    naam: "Jumbo kleurenmix",
    omschrijving: "Grote kwartels in een mix van kleuren.",
    foto: "",
    broedei: { prijs: null, beschikbaar: true },
    kuiken: null
  },
  {
    soort: "kwartel",
    naam: "Ciladon",
    omschrijving: "",
    foto: "",
    broedei: { prijs: null, beschikbaar: true },
    kuiken: null
  },

  // ---------- KIPPEN ----------
  {
    soort: "kip",
    naam: "Orpington goud-zwartgezoomd",
    omschrijving: "Rustige, tamme kippen met een gouden verenkleed en zwarte zoom.",
    foto: "",
    broedei: { prijs: null, beschikbaar: true },
    kuiken: { prijs: null, beschikbaar: true }
  },
  {
    soort: "kip",
    naam: "Orpington 50/50",
    omschrijving: "Goud-zwartgezoomd of goud-blauwgezoomd. Je ontvangt een mix van beide.",
    foto: "",
    broedei: { prijs: null, beschikbaar: true },
    kuiken: { prijs: null, beschikbaar: true }
  },
  {
    soort: "kip",
    naam: "Ameraucana",
    omschrijving: "Bekend om hun blauwe eieren.",
    foto: "",
    broedei: { prijs: null, beschikbaar: true },
    kuiken: { prijs: null, beschikbaar: true }
  },
  {
    soort: "kip",
    naam: "Marans (zwart koper)",
    omschrijving: "Donkerbruine eieren, een mooie zwarte kip met koperkleurige hals.",
    foto: "",
    broedei: { prijs: null, beschikbaar: true },
    kuiken: { prijs: null, beschikbaar: true }
  },
  {
    soort: "kip",
    naam: "Olijfleggers",
    omschrijving: "Leggen eieren in een olijfgroene tint.",
    foto: "",
    broedei: { prijs: null, beschikbaar: true },
    kuiken: { prijs: null, beschikbaar: true }
  },
  {
    soort: "kip",
    naam: "Easter eggers",
    omschrijving: "Kleurrijke kippen die eieren leggen in verschillende tinten.",
    foto: "",
    broedei: { prijs: null, beschikbaar: true },
    kuiken: { prijs: null, beschikbaar: true }
  }
];
