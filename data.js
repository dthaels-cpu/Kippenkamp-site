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
  // Sociale media: plak hier de volledige link (bv. "https://www.facebook.com/hetkippenkamp").
  // Leeg laten = niet getoond. Ingevuld = verschijnt onderaan elke pagina bij "Volg ons" en op Contact.
  social: { facebook: "", instagram: "", tiktok: "", youtube: "" },
  plaats: "Wuustwezel",              // bv. "Wuustwezel"

  // ---- TEKSTEN ----
  heroTekst: "Welkom bij ons thuis! Hier vind je broedeieren, kuikens en volwassen kippen en kwartels van bijzondere rassen. Kies hieronder het ras dat je aanspreekt.",

  introTitel: "Een gezin met een hart voor kippen, kwartels en alles wat erbij rondloopt",
  intro: [
    "Wij zijn een gezin met drie kinderen en een hele beestenboel. Het Kippenkamp is geen kwekerij op grote schaal: bij ons telt het geluk van de dieren en de tevredenheid van onze klanten, niet het aantal.",
    "Onze kuikens groeien binnen in huis op, midden in het gezinsleven. Zo zijn ze niet bang van mensen en komen ze als echte huisdieren bij je terecht.",
    "Zoek je een rustige tuinkip, eitjes in bijzondere kleuren of je eerste kwartels? Vertel wat je zoekt, dan helpen we je graag verder."
  ],

  // "Waarom bij ons" op de homepage (icoon: ster, bericht, vink of kalender)
  waarom: [
    { icoon: "ster", titel: "Het geluk van onze dieren", tekst: "Onze dieren staan voorop. Ze leven samen met ons gezin, tussen de konijnen, de hond en de kinderen." },
    { icoon: "kalender", titel: "Thuis opgegroeid", tekst: "Onze kuikens groeien op in huis en zijn gewend aan mensen. Ze hebben geen schrik van jou." },
    { icoon: "bericht", titel: "Persoonlijk contact", tekst: "Je praat rechtstreeks met ons, geen tussenpersoon. We nemen de tijd om al je vragen te beantwoorden." },
    { icoon: "vink", titel: "Tevreden klanten", tekst: "We zijn pas blij als jij dat bent. We zeggen eerlijk wat beschikbaar is, zonder grote beloftes." }
  ],

  // ---- OVER ONS (pagina "Over ons") ----
  overOnsIntro: "Een gezin met een passie voor kippen en kwartels, en een hele beestenboel eromheen.",
  overOns: [
    { titel: "Onze passie", tekst: "We houden van kippen en kwartels: van hun karakter, hun kleuren en de eitjes die ze leggen, in bruin, blauw, groen of olijfkleurig." },
    { titel: "Geen massabedrijf", tekst: "Bij ons telt het geluk van de dieren en de tevredenheid van onze klanten, niet het aantal. We houden het klein, zodat elk dier de aandacht krijgt die het verdient." },
    { titel: "Dieren door elkaar", tekst: "Sommige van onze konijnen leven samen met kippen, en onze hond vertoeft soms gezellig tussen de kipjes." },
    { titel: "Kuikens die in huis opgroeien", tekst: "Onze kuikens groeien groot binnen in huis en worden echt betrokken bij het gezinsleven. Zo hebben ze geen schrik van mensen." },
    { titel: "Bijzondere rassen", tekst: "We kiezen voor rassen met een eigen gezicht, zoals Orpington, Marans, Ameraucana en olijfleggers. Het volledige overzicht staat bij het aanbod." },
    { titel: "Eigen dieren", tekst: "Het aanbod komt van onze eigen dieren. Daarom kunnen we je ook echt iets vertellen over de rassen die je overweegt." },
    { titel: "Net begonnen, altijd aan het bijleren", tekst: "We zijn net gestart en leren elke dag bij. Heb je een suggestie, een tip of een opmerking? Die is meer dan welkom." },
    { titel: "Persoonlijke aanpak", tekst: "Bij een aanvraag krijg je een persoonlijk antwoord van ons, met duidelijke afspraken over beschikbaarheid en afhalen." }
  ],

  // ---- BESTELLEN EN AFHALEN ----
  bestelInfo: "Stuur je aanvraag via het formulier, WhatsApp of mail. We bevestigen persoonlijk of het beschikbaar is en spreken samen af wanneer je het bij ons komt ophalen.",
  stappen: [
    { titel: "Kies een ras", tekst: "Bekijk onze rassen en kies wat je zoekt: broedeieren, kuikens of volwassen dieren." },
    { titel: "Vraag aan", tekst: "Geef het aantal door." },
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
  hero: "images/hero.jpg",                     // groot beeld bovenaan de homepage (liggend, min. 1600 px breed)
  intro: "",                      // foto naast de voorstelling op de homepage
  overOnsDavidDanielle: "",       // foto van David en Danielle (pagina Over ons)
  overOnsDieren: "",              // foto van jullie dieren (pagina Over ons)
  categorie: {                    // beeld per categorie op de homepage (liggend, 4:3)
    broedeieren: "images/broedeieren-broedmachine.jpg",
    kuikens: "images/kuikens-groep.jpg",
    volwassen: ""
  },
  eieren: [                       // "Onze eieren": slideshow op de homepage met de eikleuren die we hebben
    { src: "images/eieren-kleuren-gras.jpg", tekst: "Eieren in verschillende kleuren in het gras" },
    { src: "images/eieren-mand.jpg", tekst: "Een mand vol kip- en kwarteleieren in alle kleuren" },
    { src: "images/eieren-schaal.jpg", tekst: "Onze eierschaal vol kleuren" },
    { src: "images/eieren-gespikkeld.jpg", tekst: "Een gespikkeld ei" },
    { src: "images/eieren-in-handen.jpg", tekst: "Eieren in verschillende kleuren in twee handen" },
    { src: "images/eieren-donkerbruin.jpg", tekst: "Een diep donkerbruin ei in een hand" },
    { src: "images/eieren-nest-stro.jpg", tekst: "Vier eieren in het stro, in verschillende kleuren" },
    { src: "images/eieren-vijf-kleuren.jpg", tekst: "Vijf eieren in wit, blauw, groen, crème en donkerbruin" }
  ],
  kamp: [                         // "Impressie van ons kamp": slideshow met foto's van waar en hoe de dieren zitten
    { src: "images/kamp-binnen-kwartels-kippen.jpg", tekst: "Kwartels en kippen samen binnen in huis" },
    { src: "images/kamp-kippen-voeren.jpg", tekst: "Kippen en een konijn krijgen een wortel" },
    { src: "images/kamp-konijnen-sneeuw.jpg", tekst: "Konijnen en een kip samen in de sneeuw" },
    { src: "images/kamp-hond-kippen.jpg", tekst: "Onze hond tussen de kippen" },
    { src: "images/kamp-kuikens-huis.jpg", tekst: "Kuikens groeien op in huis" },
    { src: "images/kamp-hond-kuiken.jpg", tekst: "Onze hond en een kuiken samen op de deken" },
    { src: "images/kamp-kuiken-knuffel.jpg", tekst: "Een kuiken wordt even vastgehouden" },
    { src: "images/kamp-kippen-tuin.jpg", tekst: "De kippen scharrelen in de tuin" },
    { src: "images/kamp-kuiken-op-vinger.jpg", tekst: "Een kuiken zit op een vinger" },
    { src: "images/kamp-kuikens-op-tapijt.jpg", tekst: "Kuikens in huis op het tapijt" },
    { src: "images/kamp-twee-kuikens-deken.jpg", tekst: "Twee kuikens samen op een deken" },
    { src: "images/kamp-kuikens-stro.jpg", tekst: "Kuikens in het stro" }
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
// Oude links (en oude rasnamen) die naar een ander ras doorverwijzen
const RAS_ALIAS = { ciladon: "celadon", "orpington-goud-zwartgezoomd": "orpington", "orpington-kleurmix": "orpington" };

const CATEGORIEEN = [
  { id: "broedeieren", titel: "Broedeieren", tekst: "Voor wie graag zelf de broedmachine laat draaien en het hele avontuur van ei tot kuiken wil beleven.", type: "broedei", plaatshouder: "ei", kort: "Zelf aan de slag met de broedmachine." },
  { id: "kuikens", titel: "Kuikens", tekst: "Kleine bolletjes dons die uitgroeien tot prachtige, imposante kippen.", type: "kuiken", plaatshouder: "kuiken", kort: "Kleine bolletjes dons die uitgroeien tot mooie kippen." },
  { id: "volwassen", titel: "Volwassen kippen en kwartels", tekst: "Voor wie liever meteen een paar mooie dieren aan zijn of haar toom toevoegt.", type: "volwassen", plaatshouder: "kip", kort: "Jonge en volwassen dieren voor je eigen groep." }
];

/* -----------------------------------------------------
   PRODUCTEN (de rassen)

   id:           korte naam zonder spaties of hoofdletters (voor links)
   soort:        "kip" of "kwartel"
   uitgelicht:   true = staat ook in "Een selectie van onze dieren" op de homepage
   omschrijving: korte tekst (mag leeg)
   kenmerken:    lijst met korte kenmerken, bv. ["Rustig", "Tam"] (mag leeg)
   eikleur:      bv. "Donkerbruin" (mag leeg)
   uitleg:       lijst met korte alinea's over het ras, op de rassenpagina
   kenmerken:    korte labels, bv. ["Rustig en tam"]
   fotos:        lijst met foto's van het ras, bv. ["images/marans-hen.jpg"]
                 onderschrift (alleen als je het zelf wil): [{ src: "images/marans-hen.jpg", bijschrift: "Onze Marans-hen" }]
                 "tekst" is enkel de alt-tekst en wordt nergens als onderschrift getoond.

   Wat je van dit ras kan aanvragen: broedei, kuiken en volwassen.
   Elk daarvan heeft:
       prijs:        getal (bv. 2.5) of null  -> null toont "Prijs op aanvraag"
       beschikbaar:  true / false             -> false toont "Momenteel niet beschikbaar"
       status:       eigen tekst zoals "Beschikbaar vanaf maart" (mag leeg)
       opmerking:    extra uitleg zoals "Vanaf 6 stuks" (mag leeg)
       keuze:        extra keuzevak in het aanvraagformulier, bv.
                     keuze: { label: "Kleurslag", opties: ["Zwart goudgezoomd", "Blauw en goud (fokproject)"] }
       fotos:        extra foto's, enkel bij dit product (mag leeg)
     Zet het hele blok op null om dat product bij dit ras niet aan te bieden.
     Volwassen dieren aanbieden? Vervang bij het ras  volwassen: null  door
       volwassen: { prijs: null, beschikbaar: true, status: "", opmerking: "" }
   ----------------------------------------------------- */

const PRODUCTEN = [
  // ---------- KWARTELS ----------
  {
    id: "jumbo-kleurenmix", soort: "kwartel", uitgelicht: true,
    naam: "Japanse jumbo kleurenmix",
    omschrijving: "Grote kwartels in een mix van kleuren.",
    kenmerken: ["Grotere kwartel", "Verschillende kleuren", "Gevlekte eitjes"], eikleur: "Licht met bruine vlekjes", fotos: [{ src: "images/japanse-jumbo-kleurenmix.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-1.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-2.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-3.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-4.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-5.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-6.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-7.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-8.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-9.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-10.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-11.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-12.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-13.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-14.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-15.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kwartels-16.jpg", tekst: "Japanse jumbo kleurenmix kwartels" }, { src: "images/jumbo-kleurenmix-kuiken.jpg", tekst: "Jumbo kleurenmix: kuiken en broedeieren" }],
    uitleg: [
      "Japanse jumbo-kwartels zijn wat groter en steviger dan gewone kwartels. In onze mix zitten verschillende kleuren, dus geen twee kwartels zien er precies hetzelfde uit.",
      "Ze leggen kleine eitjes met bruine vlekjes. Kwartels blijven klein en nemen weinig ruimte in, een mooie manier om met dieren te beginnen."
    ],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    volwassen: null
  },
  {
    id: "celadon", soort: "kwartel", uitgelicht: false,
    naam: "Japanse celadon",
    omschrijving: "Kwartels met blauwe eitjes.",
    kenmerken: ["Blauwe eitjes", "Kleine kwartel"], eikleur: "Blauw", fotos: [],
    uitleg: [
      "Japanse celadon-kwartels zijn bekend om hun blauwe eitjes. Dat is bijzonder, want de meeste kwartels leggen bruin gevlekte eitjes.",
      "Net als andere kwartels blijven ze klein en nemen ze weinig ruimte in."
    ],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "", fotos: [{ src: "images/celadon.jpg", tekst: "Japanse celadon-broedeieren met een kuiken" }] },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    volwassen: null
  },

  // ---------- KIPPEN ----------
  {
    id: "orpington", soort: "kip", uitgelicht: true,
    naam: "Orpington",
    omschrijving: "Een kip met karakter, formaat en een gouden randje 🐓",
    kenmerken: ["Rustig en vriendelijk", "Zachte, volle veren", "Lichtbruine eieren"], eikleur: "Lichtbruin",
    fotos: [
      { src: "images/orpington-zwart-goudgezoomd-1.jpg", tekst: "Orpington zwart goudgezoomd hen" },
      { src: "images/orpington-zwart-goudgezoomd-2.jpg", tekst: "Twee Orpington zwart goudgezoomd hennen" },
      { src: "images/orpington-zwart-goudgezoomd-3.jpg", tekst: "Orpington zwart goudgezoomd hennen op de grond" },
      { src: "images/orpington-zwart-goudgezoomd-4.jpg", tekst: "Orpington zwart goudgezoomd haan en hennen, met onze hond op de achtergrond" },
      { src: "images/orpington-zwart-goudgezoomd-5.jpg", tekst: "Orpington zwart goudgezoomd haan" },
      { src: "images/orpington-zwart-goudgezoomd-6.jpg", tekst: "Orpington zwart goudgezoomd hen tussen het groen" },
      { src: "images/orpington-zwart-goudgezoomd-7.jpg", tekst: "Orpington zwart goudgezoomd haan en hennen in de sneeuw" },
      { src: "images/orpington-zwart-goudgezoomd-8.jpg", tekst: "Orpington zwart goudgezoomd haan in de zon" },
      { src: "images/orpington-zwart-goudgezoomd-9.jpg", tekst: "Orpington zwart goudgezoomd haan van opzij" }
    ],
    uitleg: [
      "De Orpington is dé ultieme knuffelkip voor in de achtertuin: een grote, zachtaardige, heerlijk fluffy kip met een indrukwekkende verschijning en een karakter om verliefd op te worden.",
      "Met hun ronde, volle bouw en overvloedige, zachte bevedering zijn het echte blikvangers. Ze staan bekend om hun rustige, vriendelijke karakter en hun ontspannen manier van scharrelen. Een beetje de labrador onder de kippen!",
      "Bij Het Kippenkamp hebben we een bijzondere liefde voor de Orpington, en dan vooral voor de prachtige combinatie van goud met zwart of blauw."
    ],
    karakter: {
      titel: "Het karakter",
      intro: "Orpingtons zijn niet alleen mooi om te zien, maar ook bijzonder aangename tuinbewoners.",
      punten: [
        ["Rustig en vriendelijk", "het zijn doorgaans zachtaardige kippen die graag op hun gemak rondscharrelen."],
        ["Makkelijk tam te maken", "met wat lekkers uit de hand winnen ze vaak snel vertrouwen. Sommige dieren laten zich zelfs graag aaien of oppakken."],
        ["Grote, rustige verschijning", "door hun forse bouw en volle bevedering hebben ze een heel eigen uitstraling."],
        ["Gezellige tuinbewoners", "ze houden ervan om rustig rond te scharrelen en hun omgeving te ontdekken."]
      ],
      slot: "Zoals bij ieder ras blijft het karakter natuurlijk afhankelijk van het individuele dier en de manier waarop het wordt grootgebracht."
    },
    afsluiter: "Een Orpington is misschien gewoon een kip… tot je er eentje hebt. Dan begrijp je meteen waarom je er nooit genoeg van hebt! ❤️",
    kleurslagen: [
      { naam: "Zwart goudgezoomd", tekst: [
        "De zwart goudgezoomde Orpington is een echte klassieker. De warme goudkleurige veren met hun contrasterende zwarte zoom zorgen voor een prachtig geschubd patroon.",
        "Wanneer het zonlicht op hun verenkleed valt, komt de tekening helemaal tot leven. Een stijlvolle, warme kleurslag die bij ons een bijzonder plekje heeft."
      ] },
      { naam: "Blauw en goud: een bijzonder fokproject", tekst: [
        "Ook de combinatie van blauw en goud heeft onze interesse gewekt. Daarom starten we met een kleine experimentele fokgroep.",
        "Hiervoor zetten we een jonge blauwgekleurde haan, afkomstig uit goudgezoomde ouderdieren, in bij onze zwart goudgezoomde hennen.",
        "De combinatie van de blauwgrijze kleur met warme goudtinten biedt interessante mogelijkheden. We zijn vooral benieuwd naar de kleuren, tekeningen en eigenschappen die uit deze kruising zullen voortkomen.",
        "Dit is voor ons een nieuw fokproject waarin we stap voor stap willen ontdekken welke mogelijkheden er zijn. Daarbij blijven het typische Orpington-type, een goede bouw, volle bevedering en een mooie tekening belangrijke aandachtspunten."
      ] }
    ],
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "Kies je kleurslag. Bij het fokproject blauw en goud weten we vooraf niet welke kleuren er uit de eieren komen.", keuze: { label: "Kleurslag", opties: ["Zwart goudgezoomd", "Blauw en goud (fokproject)"] } },
    kuiken: {
      prijs: null, beschikbaar: true, status: "", opmerking: "Bij kuikens is de kleur al te zien. Geef je voorkeur door, dan bevestigen we wat er beschikbaar is.", keuze: { label: "Kleurslag", opties: ["Zwart goudgezoomd", "Blauw en goud (fokproject)"] },
      fotos: [
        { src: "images/orpington-goud-zwartgezoomd-kuikens.jpg", tekst: "Orpington zwart goudgezoomd kuikens" },
        { src: "images/orpington-kleurmix-kuiken.jpg", tekst: "Orpington kuiken" }
      ]
    },
    volwassen: null
  },
  {
    id: "ameraucana", soort: "kip", uitgelicht: false,
    naam: "Ameraucana",
    omschrijving: "Maak kennis met onze Ameraucana's: Amerikaanse charme en bijzondere eikleuren! 🐓",
    kenmerken: ["Groene tot blauwgroene eieren", "Baardje en bakkebaarden", "Kleurslagen: zwart en ermine"], eikleur: "Helder groen tot blauwgroen",
    fotos: [
      { src: "images/ameraucana-1.jpg", tekst: "Ameraucana's in de kleurslagen ermine en zwart" },
      { src: "images/ameraucana-2.jpg", tekst: "Twee Ameraucana ermine jonge dieren in het stro" },
      { src: "images/ameraucana-3.jpg", tekst: "Ameraucana ermine met zichtbare wangen" },
      { src: "images/ameraucana-4.jpg", tekst: "Ameraucana ermine jong dier" },
      { src: "images/ameraucana-5.jpg", tekst: "Ameraucana's: een ermine en een zwarte hen" },
      { src: "images/ameraucana-6.jpg", tekst: "Ameraucana ermine hen op onderzoek" },
      { src: "images/ameraucana-7.jpg", tekst: "Ameraucana's in de kleurslagen ermine en zwart, scharrelend in de tuin" },
      { src: "images/ameraucana-8.jpg", tekst: "Ameraucana's in de kleurslagen ermine en zwart, samen in de tuin" }
    ],
    uitleg: [
      "Bij Het Kippenkamp zijn we stiekem een beetje verliefd op de Ameraucana! Dit bijzondere ras komt oorspronkelijk uit Amerika en verovert ook hier steeds meer harten. Met hun volle baardjes, wangen en levendige, nieuwsgierige uitstraling zijn het echte blikvangers in de ren.",
      "Niet te verwarren met de Araucana! De namen lijken sterk op elkaar, maar de Ameraucana en de Araucana zijn toch echt twee verschillende rassen. Waar de Araucana oorspronkelijk uit Zuid-Amerika komt en vaak staartloos is of oorpluimen heeft, heeft de Amerikaanse Ameraucana altijd een mooie volle staart, een karakteristieke baard en bakkebaarden, en geen oorpluimen. Een stuk robuuster en met een geheel eigen charme!",
      "Verrassing in het legnest 🥚✨ Wat maakt de Ameraucana nu zo onweerstaanbaar? Natuurlijk die prachtige, gekleurde eieren! Bij onze groep ligt het accent op heldere groene tot blauwgroene tinten, elke keer weer een klein cadeautje als je het legnest opentrekt.",
      "Binnen onze eigen Ameraucana-groep werken wij gericht met de sprekende kleurslagen Ermine (wit met zwarte tekening) en Zwart. En net als bij onze andere rassen kijken we daarbij altijd naar gezonde, sterke dieren met een fijne bouw en een prettig, rustig karakter.",
      "Bovendien vormen onze Ameraucana's een belangrijke schakel voor onze toekomstige F1-olijfleggers én Easter Eggers!"
    ],
    karakter: {
      titel: "Bij Het Kippenkamp kan je (afhankelijk van het seizoen en onze eigen fokselectie) terecht voor",
      intro: "",
      punten: [
        ["Broedeieren", "voor wie zelf deze bijzondere Amerikaanse kleurleggers wil uitbroeden."],
        ["Kuikens", "donzige bolletjes met vaak al direct die schattige wangen!"],
        ["Jonge en volwassen dieren", "voor wie graag een eigen toompje wil starten."]
      ],
      slot: "Wil jij zelf kennismaken met dit bijzondere Amerikaanse ras en die prachtige groene eitjes in je eierdoosje? Neem gerust contact met ons op."
    },
    afsluiter: "Onze Ameraucana's: Amerikaanse roots, volle baardjes, prachtige kleurslagen én elke dag een vleugje kleur in het nest! ❤️",
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "", keuze: { label: "Kleurslag", opties: ["Zwart", "Ermine (wit met zwarte tekening)"] } },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "", keuze: { label: "Kleurslag", opties: ["Zwart", "Ermine (wit met zwarte tekening)"] }, fotos: [{ src: "images/ameraucana-kuikens.jpg", tekst: "Ameraucana kuikens" }] },
    volwassen: { prijs: null, beschikbaar: true, status: "", opmerking: "Jonge en volwassen dieren, bv. om een eigen toompje te starten." }
  },
  {
    id: "marans-zwart-koper", soort: "kip", uitgelicht: true,
    naam: "Marans (zwart koper)",
    omschrijving: "Maak kennis met onze Marans: Tony en zijn dames! 🐓",
    kenmerken: ["Donkerbruine eieren", "Zwart met koperen hals"], eikleur: "Donkerbruin",
    fotos: [
      { src: "images/marans-tony-1.jpg", tekst: "Tony, onze Marans zwart koper haan" },
      { src: "images/marans-tony-2.jpg", tekst: "Tony, onze Marans-haan, van opzij" },
      { src: "images/marans-tony-3.jpg", tekst: "Tony aan het scharrelen" },
      { src: "images/marans-4.jpg", tekst: "Tony met zijn dames in de ren" },
      { src: "images/marans-5.jpg", tekst: "Tony zoekt voer tussen de blaadjes" },
      { src: "images/marans-6.jpg", tekst: "Marans hen in de sneeuw" },
      { src: "images/marans-7.jpg", tekst: "Marans en andere kippen in de sneeuw" },
      { src: "images/marans-8.jpg", tekst: "Marans zwart koper hen" },
      { src: "images/marans-kuikens-eieren.jpg", tekst: "Marans-kuikens bij donkerbruine Marans-eieren" }
    ],
    uitleg: [
      "Bij Het Kippenkamp mogen de Marans natuurlijk niet ontbreken! Onze Maransgroep bestaat uit prachtige zwart-koperen dieren. En de grote man van de groep? Dat is Tony! Met zijn diepzwarte veren, prachtige groene glans en warme koperkleurige hals is hij een echte verschijning in het kippenhok.",
      "Tony is bovendien niet zomaar een haan. Hij gaat een belangrijke rol spelen in verschillende van onze fokprojecten. Naast zijn eigen Maransgroep wordt hij namelijk ook de vader van de broedeieren en kuikens voor onze F1- en F2-olijfleggers. Zo draagt hij straks niet alleen bij aan onze raszuivere Maransgeneraties, maar ook aan nieuwe generaties kippen die prachtige olijfgroene eieren gaan leggen.",
      "We hebben bij Het Kippenkamp een zwak voor de allerdonkerste Marans-eieren. Onze haan Tony en enkele van zijn dames zijn zelf uit bijzonder donkere eieren gekomen. Met deze dieren willen we verder bouwen aan onze eigen fokgroep. Ons doel? Zo donker mogelijke eieren! We hopen generatie na generatie die prachtige diepe kleur te behouden en waar mogelijk nog te verbeteren.",
      "Natuurlijk kijken we daarbij ook naar gezonde, sterke dieren, een mooie bouw en de typische uitstraling van de zwart-koperen Marans.",
      "We zijn zelf minstens zo benieuwd naar de toekomstige generaties als onze bezoekers. Want iedere keer dat er zo'n donker chocoladebruin eitje in het nest ligt, blijft dat toch een klein geluksmomentje! Wie weet liggen er binnenkort wel broedeieren van Tony en zijn dames in jouw broedmachine!"
    ],
    karakter: {
      titel: "Bij Het Kippenkamp kan je terecht voor",
      intro: "",
      punten: [
        ["Broedeieren", "voor wie zelf aan de slag wil met deze bijzondere donkerbruine eieren."],
        ["Kuikens", "kleine Maransjes die nog moeten uitgroeien tot hun prachtige volwassen verschijning."],
        ["Jonge en volwassen dieren", "voor wie graag zelf een Maransgroep wil opbouwen."]
      ],
      slot: "We kweken op kleine schaal en met veel plezier. Het beschikbare aanbod is afhankelijk van het seizoen en onze eigen fokselectie."
    },
    afsluiter: "Onze Tony en zijn dames: een beetje koper in het kippenhok, een beetje chocolade in het nest en vooral heel veel plezier in wat we doen! ❤️",
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "", fotos: [{ src: "images/marans-kuiken.jpg", tekst: "Marans-kuiken" }] },
    volwassen: { prijs: null, beschikbaar: true, status: "", opmerking: "Jonge en volwassen dieren, bv. om zelf een Maransgroep op te bouwen." }
  },
  {
    id: "olijfleggers", soort: "kip", uitgelicht: true,
    naam: "Olijfleggers",
    omschrijving: "Leggen eieren in een olijfgroene tint. Keuze uit F1 of F2.",
    kenmerken: ["Olijfgroene eieren", "F1 of F2", "Opvallend in de eierdoos"], eikleur: "Olijfgroen (F1: helder tot mosgroen, F2: diep donkergroen of donkerbruin)", fotos: [{ src: "images/olijfleggers-f2-ei.jpg", tekst: "Kuikens bij twee eieren, links het ei van een F2 hen", bijschrift: "Het ei links is van een F2 hen." }],
    uitleg: [
      "Olijfleggers ontstaan door een Marans-haan te kruisen met een blauwe eierlegger. Het resultaat is een kip met olijfgroene eieren, een kleur die je niet vaak ziet. Je kan bij ons kiezen tussen F1 en F2, zowel bij broedeieren als bij kuikens.",
      "F1 maken we zo: Marans-haan × raszuivere blauwe eierlegger. Alle hennen leggen olijfgroene eieren, van helder tot medium mosgroen. Dit is de zekerste keuze.",
      "F2 maken we zo: Marans-haan × F1-olijflegger-hen, voor een extra diepe kleur. Elk kuiken heeft 50% kans om een donkere olijflegger te worden en 50% kans om een donkerbruine legger te worden.",
      "Donkere olijfleggers (50% kans): deze hennen krijgen het blauwe eigen én een extra dikke laag donkerbruin Marans-pigment. Ze leggen de allerdonkerste, diep mosgroene tot legergroene eieren, vaak met spikkels.",
      "Donkerbruine leggers (50% kans): deze hennen missen het blauwe eigen en leggen mooie, diep chocoladebruine eieren (75% Marans-bloed). Bij F2 weet je dus niet vooraf welke je krijgt."
    ],
    broedei: {
      prijs: null, beschikbaar: true, status: "",
      opmerking: "F1: Marans-haan × blauwe eierlegger, alle hennen olijfgroen. F2: Marans-haan × F1-olijflegger-hen, 50% kans op donker olijflegger en 50% kans op donkerbruine legger.",
      keuze: { label: "Generatie", opties: ["F1 (alle hennen olijfgroen)", "F2 (50% kans donker olijflegger, 50% kans donkerbruine legger)"] }
    },
    kuiken: {
      prijs: null, beschikbaar: true, status: "",
      opmerking: "F1: Marans-haan × blauwe eierlegger, alle hennen olijfgroen. F2: Marans-haan × F1-olijflegger-hen, 50% kans op donker olijflegger en 50% kans op donkerbruine legger.",
      keuze: { label: "Generatie", opties: ["F1 (alle hennen olijfgroen)", "F2 (50% kans donker olijflegger, 50% kans donkerbruine legger)"] }
    },
    volwassen: null
  },
  {
    id: "easter-eggers", soort: "kip", uitgelicht: false,
    naam: "Easter eggers",
    omschrijving: "Maak kennis met onze Easter Eggers: donkere schoonheden en verrassende eikleuren!",
    kenmerken: ["Donkere hennen", "Verrassende eikleuren", "Broedeieren met Ermine Ameraucana-haan"], eikleur: "Roze met bloom, olijfgroen en chocoladebruin; met onze haan ook mintgroen en pastelgroen", fotos: [{ src: "images/eieren-kleurenrij.jpg", tekst: "Eierschalen van onze Easter Eggers in een rij, van bruin tot olijfgroen en blauwgroen" }],
    uitleg: [
      "Bij Het Kippenkamp houden we wel van een beetje spanning in het legnest! Onze Easter Eggers hebben zelf een stoere, donkere uitstraling, van diepzwart tot dieren die qua bouw en kleur op een Marans lijken, maar zorgen juist in het eierdoosje voor allerlei verrassingen.",
      "## Wat is een Easter Egger eigenlijk? 🌈",
      "Voor wie de naam nog niet kent: een Easter Egger is geen officieel erkend standaardras met één vast uiterlijk, maar een verzamelnaam voor kleurleggende kruisingen die het gen voor blauwe of groene eieren meedragen (vaak met Ameraucana- of Araucana-bloed). Juist omdat ze niet aan één vaste rasstandaard vastzitten, zijn het vaak sterke, vitale kippen met een vriendelijk karakter en een unieke uitstraling, en bovenal dé kippen voor wie elke dag een vrolijk 'paasei' in het nest wil vinden!",
      "## Bijzondere herkomst, bijzonder ei ✨",
      "Het mooie aan onze groep is dat de hennen zelf uit heel verschillende eieren zijn gekomen en nu stuk voor stuk hun eigen unieke tinten leggen:",
      "• Onze zwarte hen uit een roos ei legt zelf een roos ei met bloom, dat zachte, fluwelige laagje over de schaal dat het ei een heel bijzondere uitstraling geeft.\n• Onze zwarte hen uit een bruin ei trakteert ons op prachtige olijfgroene eieren.\n• Onze Marans-achtige hennen uit olijfgroene en bruine eieren leggen rijke, diepe chocoladebruine eieren.",
      "## Dubbele verrassing met onze Ermine Ameraucana-haan 🐓",
      "Onze Easter Eggers lopen samen met onze Ermine Ameraucana-haan (wit met zwarte vlekjes). Dat maakt de broedeieren uit deze groep extra leuk voor wie zelf aan de slag gaat met de broedmachine:",
      "• In het eierdoosje: Doordat onze haan het blauwe eikleurgen doorgeeft en onze hennen roze (met bloom), olijfgroene en chocoladebruine eieren leggen, levert deze combinatie een bonte mix op van fris mint- en pastelgroen tot diep olijfgroen, eventueel roze eieren en andere speciale kleurtjes met een zachte bloom-laag.\n• In de ren: Naast effen donkere kuikens geeft onze Ermine-haan bij ongeveer de helft van de nakomelingen zijn leuke zwarte vlekjes en spetters door, vaak gecombineerd met die karakteristieke Ameraucana-baardjes!",
      "## Van ons legnest tot jouw broedmachine 🐣",
      "Omdat we kleinschalig en met aandacht werken, is het aanbod van broedeieren, kuikens of jonge dieren afhankelijk van het seizoen en onze eigen fokselectie."
    ],
    afsluiter: "Onze Easter Eggers: donker en karaktervol op het erf, en elke dag weer een kleurrijk cadeautje in het nest! ❤️",
    broedei: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    kuiken: { prijs: null, beschikbaar: true, status: "", opmerking: "" },
    volwassen: null
  }
];
