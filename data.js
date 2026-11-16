/* =====================================================
   HIER PAS JE ALLES AAN: gegevens, teksten, prijzen en aanbod.
   Je hoeft de rest van de website niet aan te raken.

   Een leeg veld ("") of null betekent: dat onderdeel wordt op de
   website niet getoond. Er wordt dus nooit iets verzonnen.
   ===================================================== */

const SITE = {
  naam: "Het Kippenkamp",
  slogan: "Met liefde voor kippen en kwartels",
  ondertitel: "Broedeieren, kuikens en volwassen kippen en kwartels",

  // Volledig webadres van de website (voor delen en zoekmachines).
  // Verandert dit later naar een eigen domein? Zie README, "Eigen domeinnaam".
  url: "https://website-drab-three-77.vercel.app",

  // ---- CONTACTGEGEVENS (vul aan, leeg = wordt niet getoond) ----
  email: "info@hetkippenkamp.be",               // bv. "naam@voorbeeld.be"
  telefoon: "0494 59 82 86",         // bv. "+32 470 00 00 00"
  whatsapp: "32494598286",           // alleen cijfers met landcode, zonder + of 0, bv. "32470000000"
  plaats: "Wuustwezel",              // bv. "Wuustwezel"

  // ---- TEKSTEN ----
  heroTekst: "Bij Het Kippenkamp vind je broedeieren, kuikens en volwassen kippen en kwartels van bijzondere rassen. Vraag aan wat je zoekt en we bevestigen persoonlijk wat beschikbaar is.",

  introTitel: "Een kleine familiale kippenhouderij met een grote liefde voor het dier",
  intro: [
    "Wij zijn een samengesteld gezin met drie kinderen en een hele beestenboel. We houden kippen en kwartels met oog voor mooie rassen en hun karakter.",
    "Onze kuikens groeien binnen in huis op, midden in het gezinsleven. Zo zijn ze niet bang van mensen.",
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
  overOnsIntro: "Een gezin met een passie voor kippen en kwartels, en een hele beestenboel eromheen.",
  overOns: [
    { titel: "Onze passie", tekst: "We houden van kippen en kwartels: van hun karakter, hun kleuren en de eitjes die ze leggen, in bruin, blauw, groen of olijfkleurig." },
    { titel: "Waar de naam vandaan komt", tekst: "Het Kippenkamp komt heel eenvoudig van de Kampweg, de straat waar we wonen. En kippen spreekt voor zich." },
    { titel: "Een gezin met een beestenboel", tekst: "We zijn een samengesteld gezin met drie kinderen en een hele beestenboel. Naast kippen en kwartels hebben we ook konijnen, vogels en een hond." },
    { titel: "Dieren door elkaar", tekst: "Sommige van onze konijnen leven samen met kippen, en onze hond vertoeft soms gezellig tussen de kipjes." },
    { titel: "Kuikens die in huis opgroeien", tekst: "Onze kuikens groeien groot binnen in huis en worden echt betrokken bij het gezinsleven. Zo hebben ze geen schrik van mensen." },
    { titel: "Bijzondere rassen", tekst: "We kiezen voor rassen met een eigen gezicht, zoals Orpington, Marans, Ameraucana en olijfleggers. Het volledige overzicht staat bij het aanbod." },
    { titel: "Eigen dieren", tekst: "Het aanbod komt van onze eigen dieren. Daarom kunnen we je ook echt iets vertellen over de rassen die je overweegt." },
    { titel: "Persoonlijke aanpak", tekst: "Bij een aanvraag krijg je een persoonlijk antwoord van ons, met duidelijke afspraken over beschikbaarheid en afhalen." }
  ],

  // ---- BESTELLEN EN AFHALEN ----
  bestelInfo: "Stuur je aanvraag via het formulier, WhatsApp of mail. We bevestigen of het beschikbaar is en spreken samen af wanneer je alles kan ophalen.",
  stappen: [
    { titel: "Kies een ras", tekst: "Bekijk onze rassen en kies wat je zoekt: broedeieren, kuikens of volwassen dieren." },
    { titel: "Vraag aan", tekst: "Geef het aantal en een gewenste afhaaldatum door." },
    { titel: "Wij bevestigen", tekst: "We laten je weten wat beschikbaar is en spreken samen af wanneer je alles komt ophalen." }
  ],

  // Eenheden die bij de prijs getoond worden
  eenheidBroedei: "ei",
  eenheidKuiken: "kuiken",
  eenheidVolwassen: "dier"
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
    broedeieren: "images/broedeieren-broedmachine.jpg",
    kuikens: "images/kuikens-groep.jpg",
    volwassen: ""
  },
  kamp: [                         // "Impressie van ons kamp": slideshow met foto's van waar en hoe de dieren zitten
    { src: "images/kamp-binnen-kwartels-kippen.jpg", tekst: "Kwartels en kippen samen binnen in huis" },
    { src: "images/kamp-kippen-voeren.jpg", tekst: "Kippen en een konijn krijgen een wortel" },
    { src: "images/kamp-konijnen-sneeuw.jpg", tekst: "Konijnen en een kip samen in de sneeuw" },
    { src: "images/kamp-hond-kippen.jpg", tekst: "Onze hond tussen de kippen" },
    { src: "images/kamp-kuikens-huis.jpg", tekst: "Kuikens groeien op in huis" }
  ],
  categorieFotos: {               // extra foto's die bovenaan staan als je op Aanbod een categorie kiest
    broedeieren: [],              // bv. ["images/eieren-1.jpg", { src: "images/eieren-2.jpg", tekst: "Onze eieren" }]
    kuikens: [],
    volwassen: []
  }
};

/* =====================================================
   CATEGORIEEN: wat je bij ons kan aanvragen.
   Staan op de homepage en als filter op de pagina Aanbod.
   type: "broedei", "kuiken" of "volwassen" (zie bij de rassen hieronder)
   ===================================================== */
const CATEGORIEEN = [
  { id: "broedeieren", titel: "Broedeieren", tekst: "Broedeieren van onze kippen- en kwartelrassen, om zelf uit te broeden.", type: "broedei", plaatshouder: "ei" },
  { id: "kuikens", titel: "Kuikens", tekst: "Kuikens van onze kippen- en kwartelrassen, op bestelling.", type: "kuiken", plaatshouder: "kuiken" },
  { id: "volwassen", titel: "Volwassen kippen en kwartels", tekst: "Op zoek naar volwassen dieren? Vraag naar de mogelijkheden.", type: "volwassen", plaatshouder: "kip" }
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

   Wat je van dit ras kan aanvragen: broedei, kuiken en volwassen.
   Elk daarvan heeft:
       prijs:        getal (bv. 2.5) of null  -> null toont "Prijs op aanvraag"
       beschikbaar:  true / false             -> false toont "Momenteel niet beschikbaar"
       status:       eigen tekst zoals "Beschikbaar vanaf maart" (mag leeg)
       opmerking:    extra uitleg zoals "Vanaf 6 stuks" (mag leeg)
       fotos:        extra foto's, enkel bij dit product (mag leeg)
     Zet het hele blok op null om dat product bij dit ras niet aan te bieden.
     Volwassen dieren aanbieden? Vervang bij het ras  volwassen: null  door
       volwassen: { prijs: null, beschikbaar: true, status: "", opmerking: "" }
   ----------------------------------------------------- */

const PRODUCTEN = [
  // ---------- KWARTELS ----------
  {
    id: "jumbo-kleurenmix", soort: "kwartel", uitgelicht: true,
    naam: "Jumbo kleurenmix",
    omschrijving: "Grote kwartels in een mix van kleuren.",
    kenmerken: [], eikleur: "", fotos: [{ src: "images/jumbo-kleurenmix-kuiken.jpg", tekst: "Jumbo kleurenmix: kuiken en broedeieren" }],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    volwassen: null
  },
  {
    id: "celadon", soort: "kwartel", uitgelicht: false,
    naam: "Celadon",
    omschrijving: "",
    kenmerken: [], eikleur: "", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "", fotos: [{ src: "images/celadon.jpg", tekst: "Celadon-broedeieren met een kuiken" }] },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    volwassen: null
  },

  // ---------- KIPPEN ----------
  {
    id: "orpington-goud-zwartgezoomd", soort: "kip", uitgelicht: true,
    naam: "Orpington goud-zwartgezoomd",
    omschrijving: "Zuiver goud-zwartgezoomd, haan en hennen onverwant. 100% zuivere broedeieren.",
    kenmerken: [], eikleur: "", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "", fotos: [{ src: "images/orpington-goud-zwartgezoomd-kuikens.jpg", tekst: "Orpington goud-zwartgezoomd kuikens" }] },
    volwassen: null
  },
  {
    id: "orpington-kleurmix", soort: "kip", uitgelicht: false,
    naam: "Orpington kleurmix",
    omschrijving: "Een mix van kleurslagen. De hen is zwart-goudgezoomd, de haan zwart-blauwgezoomd. Haan en hennen zijn onverwant.",
    kenmerken: [], eikleur: "", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "Welke kleurslag er uit een ei komt en hoeveel van elk, weten we niet vooraf." },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "Bij kuikens is de kleurslag al te zien, dus daar weten we het zeker." },
    volwassen: null
  },
  {
    id: "ameraucana", soort: "kip", uitgelicht: false,
    naam: "Ameraucana",
    omschrijving: "Bekend om hun blauwe eieren.",
    kenmerken: [], eikleur: "Blauw", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    volwassen: null
  },
  {
    id: "marans-zwart-koper", soort: "kip", uitgelicht: true,
    naam: "Marans (zwart koper)",
    omschrijving: "Donkerbruine eieren, een mooie zwarte kip met koperkleurige hals.",
    kenmerken: [], eikleur: "Donkerbruin", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "", fotos: [{ src: "images/marans-kuiken.jpg", tekst: "Marans-kuiken" }] },
    volwassen: null
  },
  {
    id: "olijfleggers", soort: "kip", uitgelicht: true,
    naam: "Olijfleggers",
    omschrijving: "Leggen eieren in een olijfgroene tint.",
    kenmerken: [], eikleur: "Olijfgroen", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    volwassen: null
  },
  {
    id: "easter-eggers", soort: "kip", uitgelicht: false,
    naam: "Easter eggers",
    omschrijving: "Kleurrijke kippen die eieren leggen in verschillende tinten.",
    kenmerken: [], eikleur: "Verschillende tinten", fotos: [],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    volwassen: null
  }
];
