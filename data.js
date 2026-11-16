/* =====================================================
   HIER PAS JE ALLES AAN: gegevens, teksten, prijzen en aanbod.
   Je hoeft de rest van de website niet aan te raken.

   Een leeg veld ("") of null betekent: dat onderdeel wordt op de
   website niet getoond. Er wordt dus nooit iets verzonnen.
   ===================================================== */

const SITE = {
  naam: "Het Kippenkamp",
  slogan: "Met liefde voor kippen en kwartels",
  ondertitel: "Broedeieren en eendagskuikens van kippen en kwartels",

  // Volledig webadres van de website (voor delen en zoekmachines).
  // Verandert dit later naar een eigen domein? Zie README, "Eigen domeinnaam".
  url: "https://website-drab-three-77.vercel.app",

  // ---- CONTACTGEGEVENS (vul aan, leeg = wordt niet getoond) ----
  email: "",               // bv. "naam@voorbeeld.be"
  telefoon: "",            // bv. "+32 470 00 00 00"
  whatsapp: "",            // alleen cijfers met landcode, zonder + of 0, bv. "32470000000"
  plaats: "",              // bv. "Wuustwezel"

  // ---- TEKSTEN ----
  heroTekst: "Bij Het Kippenkamp vind je broedeieren en kuikens van bijzondere kippenrassen en van kwartels. Vraag aan wat je zoekt en we bevestigen persoonlijk wat beschikbaar is.",

  introTitel: "Een kleine kippenhouderij met een grote liefde voor het dier",
  intro: [
    "Wij houden kippen en kwartels met oog voor mooie rassen en hun karakter. Je vindt bij ons broedeieren en kuikens, en je praat rechtstreeks met ons.",
    "Zoek je een rustige tuinkip, eitjes in bijzondere kleuren of je eerste kwartels? Vertel wat je zoekt, dan helpen we je verder."
  ],

  // "Waarom bij ons" op de homepage (icoon: ster, bericht, vink of kalender)
  waarom: [
    { icoon: "ster", titel: "Bijzondere rassen", tekst: "Van Orpington en Marans tot olijfleggers, Easter eggers en twee soorten kwartels." },
    { icoon: "bericht", titel: "Persoonlijk contact", tekst: "Je spreekt rechtstreeks met ons. Geen tussenpersoon, geen standaardantwoorden." },
    { icoon: "vink", titel: "Duidelijk over beschikbaarheid", tekst: "We bevestigen eerst wat beschikbaar is, voor je iets moet beslissen." },
    { icoon: "kalender", titel: "Afhalen op afspraak", tekst: "We spreken samen af wanneer je je broedeieren of kuikens komt ophalen." }
  ],

  // ---- OVER ONS (pagina "Over ons") ----
  overOnsIntro: "Het Kippenkamp draait om onze passie voor kippen en kwartels.",
  overOns: [
    { titel: "Onze passie", tekst: "We houden van kippen en kwartels: van hun karakter, hun kleuren en de eitjes die ze leggen, in bruin, blauw, groen of olijfkleurig." },
    { titel: "Bijzondere rassen", tekst: "We kiezen voor rassen met een eigen gezicht, zoals Orpington, Marans, Ameraucana en olijfleggers. Het volledige overzicht staat op de pagina Aanbod." },
    { titel: "Eigen dieren", tekst: "Het aanbod komt van onze eigen dieren. Daarom kunnen we je ook echt iets vertellen over de rassen die je overweegt." },
    { titel: "Verzorging", tekst: "Goede verzorging van onze dieren vinden we vanzelfsprekend." },
    { titel: "Persoonlijke aanpak", tekst: "Bij een aanvraag krijg je een persoonlijk antwoord van ons, met duidelijke afspraken over beschikbaarheid en afhalen." }
  ],

  // ---- BESTELLEN EN AFHALEN ----
  bestelInfo: "Stuur je aanvraag via het formulier, WhatsApp of mail. We bevestigen of het beschikbaar is en spreken samen af wanneer je alles kan ophalen.",
  stappen: [
    { titel: "Vraag aan", tekst: "Kies het ras en het aantal en geef een gewenste afhaaldatum door." },
    { titel: "Wij bevestigen", tekst: "We laten je weten wat beschikbaar is." },
    { titel: "Afhalen op afspraak", tekst: "We spreken samen af wanneer je alles komt ophalen." }
  ],

  // Eenheden die bij de prijs getoond worden
  eenheidBroedei: "ei",
  eenheidKuiken: "kuiken"
};

/* =====================================================
   FOTO'S OP DE WEBSITE
   Een leeg veld ("") toont een tekening als plaatsvervanger.
   Leg je eigen foto in de map "images" en vul het pad in, bv.
   hero: "images/hero.jpg"
   ===================================================== */
const BEELDEN = {
  hero: "",                       // groot beeld bovenaan de homepage (liggend, min. 1600 px breed)
  intro: "",                      // foto naast de voorstelling op de homepage
  overOnsDavidDanielle: "",       // foto van David en Danielle (pagina Over ons)
  overOnsDieren: "",              // foto van jullie dieren (pagina Over ons)
  categorie: {                    // beeld per categorie op de homepage (liggend, 4:3)
    broedeieren: "",
    kuikens: "",
    kwartelbroedeieren: "",
    kwartels: ""
  }
};

/* =====================================================
   CATEGORIEEN op de homepage en filters op de pagina Aanbod.
   soort: "kip" of "kwartel"  |  type: "broedei" of "kuiken"
   ===================================================== */
const CATEGORIEEN = [
  { id: "broedeieren", titel: "Broedeieren", tekst: "Broedeieren van kippenrassen, om zelf uit te broeden.", soort: "kip", type: "broedei", plaatshouder: "ei" },
  { id: "kuikens", titel: "Kippenkuikens", tekst: "Eendagskuikens van dezelfde rassen, op bestelling.", soort: "kip", type: "kuiken", plaatshouder: "kuiken" },
  { id: "kwartelbroedeieren", titel: "Kwartelbroedeieren", tekst: "Broedeieren van twee soorten kwartels.", soort: "kwartel", type: "broedei", plaatshouder: "ei" },
  { id: "kwartels", titel: "Kwartels", tekst: "Op zoek naar kwartels zelf? Vraag naar de mogelijkheden.", soort: "kwartel", type: "kuiken", plaatshouder: "kwartel" }
];

/* -----------------------------------------------------
   PRODUCTEN (de rassen)

   id:           korte naam zonder spaties of hoofdletters (voor links)
   soort:        "kip" of "kwartel"
   uitgelicht:   true = staat ook in "Een selectie van onze dieren" op de homepage
   omschrijving: korte tekst (mag leeg)
   kenmerken:    lijst met korte kenmerken, bv. ["Rustig", "Tam"] (mag leeg)
   eikleur:      bv. "Donkerbruin" (mag leeg)
   fotos:        lijst met foto's van het ras, bv. ["images/marans-hen.jpg"]
                 of met bijschrift: [{ src: "images/marans-hen.jpg", tekst: "Onze Marans-hen" }]

   broedei / kuiken (het product):
       prijs:        getal (bv. 2.5) of null  -> null toont "Prijs op aanvraag"
       beschikbaar:  true / false             -> false toont "Momenteel niet beschikbaar"
       status:       eigen tekst zoals "Beschikbaar vanaf maart" (mag leeg)
       opmerking:    extra uitleg zoals "Vanaf 6 stuks" (mag leeg)
       fotos:        extra foto's, enkel bij dit product (mag leeg)
     Zet het hele blok op null om dat product niet aan te bieden.
   ----------------------------------------------------- */

const PRODUCTEN = [
  // ---------- KWARTELS ----------
  {
    id: "jumbo-kleurenmix", soort: "kwartel", uitgelicht: true,
    naam: "Jumbo kleurenmix",
    omschrijving: "Grote kwartels in een mix van kleuren.",
    kenmerken: [], eikleur: "", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: null
  },
  {
    id: "ciladon", soort: "kwartel", uitgelicht: false,
    naam: "Ciladon",
    omschrijving: "",
    kenmerken: [], eikleur: "", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: null
  },

  // ---------- KIPPEN ----------
  {
    id: "orpington-goud-zwartgezoomd", soort: "kip", uitgelicht: true,
    naam: "Orpington goud-zwartgezoomd",
    omschrijving: "Rustige, tamme kippen met een gouden verenkleed en zwarte zoom.",
    kenmerken: ["Rustig", "Tam"], eikleur: "", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" }
  },
  {
    id: "orpington-50-50", soort: "kip", uitgelicht: false,
    naam: "Orpington 50/50",
    omschrijving: "Goud-zwartgezoomd of goud-blauwgezoomd. Je ontvangt een mix van beide.",
    kenmerken: [], eikleur: "", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" }
  },
  {
    id: "ameraucana", soort: "kip", uitgelicht: false,
    naam: "Ameraucana",
    omschrijving: "Bekend om hun blauwe eieren.",
    kenmerken: [], eikleur: "Blauw", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" }
  },
  {
    id: "marans-zwart-koper", soort: "kip", uitgelicht: true,
    naam: "Marans (zwart koper)",
    omschrijving: "Donkerbruine eieren, een mooie zwarte kip met koperkleurige hals.",
    kenmerken: [], eikleur: "Donkerbruin", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" }
  },
  {
    id: "olijfleggers", soort: "kip", uitgelicht: true,
    naam: "Olijfleggers",
    omschrijving: "Leggen eieren in een olijfgroene tint.",
    kenmerken: [], eikleur: "Olijfgroen", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" }
  },
  {
    id: "easter-eggers", soort: "kip", uitgelicht: false,
    naam: "Easter eggers",
    omschrijving: "Kleurrijke kippen die eieren leggen in verschillende tinten.",
    kenmerken: [], eikleur: "Verschillende tinten", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" }
  }
];
