(function () {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function prijsTekst(item, eenheid) {
    if (!item.beschikbaar) return { tekst: "Momenteel niet beschikbaar", klasse: "uit" };
    if (item.prijs === null || item.prijs === undefined || item.prijs === "") {
      return { tekst: "Prijs op aanvraag", klasse: "" };
    }
    const bedrag = Number(item.prijs).toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return { tekst: "€ " + bedrag + " per " + eenheid, klasse: "" };
  }

  function mailLink(product, type) {
    const onderwerp = (type === "broedei" ? "Aanvraag broedeieren: " : "Aanvraag eendagskuikens: ") + product.naam;
    const tekst = "Hallo,\n\nIk heb interesse in " + (type === "broedei" ? "broedeieren" : "eendagskuikens") +
      " van " + product.naam + ".\nAantal: \nGewenste periode: \n\nGroeten";
    return "mailto:" + SITE.email + "?subject=" + encodeURIComponent(onderwerp) + "&body=" + encodeURIComponent(tekst);
  }

  function kaart(product, type) {
    const item = product[type];
    const eenheid = type === "broedei" ? SITE.eenheidBroedei : SITE.eenheidKuiken;
    const p = prijsTekst(item, eenheid);
    const beeld = product.foto
      ? '<img src="' + esc(product.foto) + '" alt="' + esc(product.naam) + '" loading="lazy">'
      : '<span class="ph">' + (product.soort === "kip" ? "🐔" : "🥚") + "</span>";
    const knop = item.beschikbaar
      ? '<a class="btn small" href="' + esc(mailLink(product, type)) + '">Aanvragen</a>'
      : "";
    return '<article class="card"><div class="img">' + beeld + "</div><div class=\"body\"><h5>" +
      esc(product.naam) + "</h5>" +
      (product.omschrijving ? "<p>" + esc(product.omschrijving) + "</p>" : "") +
      '<div class="foot"><span class="prijs ' + p.klasse + '">' + p.tekst + "</span>" + knop + "</div></div></article>";
  }

  function vul(type, soort) {
    const el = $(type + "-" + soort);
    const lijst = PRODUCTEN.filter((p) => p.soort === soort && p[type]);
    if (!lijst.length) {
      // verberg de kop en het blok als er niets is
      el.previousElementSibling && el.previousElementSibling.tagName === "H4" && (el.previousElementSibling.hidden = true);
      el.hidden = true;
      const wrap = $(type + "-" + soort + "-wrap");
      if (wrap) wrap.hidden = true;
      return;
    }
    el.innerHTML = lijst.map((p) => kaart(p, type)).join("");
  }

  // Teksten
  document.title = SITE.naam + " | Broedeieren en eendagskuikens";
  $("brandName").textContent = SITE.naam;
  $("footName").textContent = SITE.naam;
  $("slogan").textContent = SITE.slogan;
  $("year").textContent = new Date().getFullYear();
  $("overOns").innerHTML = SITE.overOns.map((t) => "<p>" + esc(t) + "</p>").join("");
  $("watWeDoen").innerHTML = SITE.watWeDoen
    .map((w) => '<div class="tile"><h5>' + esc(w.titel) + "</h5><p>" + esc(w.tekst) + "</p></div>").join("");
  $("bestelInfo").textContent = SITE.bestelInfo || "";
  if (!SITE.bestelInfo) $("bestelInfo").hidden = true;

  // Producten
  vul("broedei", "kwartel");
  vul("broedei", "kip");
  vul("kuiken", "kwartel");
  vul("kuiken", "kip");

  // Contact
  const c = [];
  if (SITE.email) c.push('<li><strong>E-mail</strong><a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a></li>");
  if (SITE.telefoon) c.push('<li><strong>Telefoon</strong><a href="tel:' + esc(SITE.telefoon.replace(/\s/g, "")) + '">' + esc(SITE.telefoon) + "</a></li>");
  if (SITE.whatsapp) c.push('<li><strong>WhatsApp</strong><a href="https://wa.me/' + esc(SITE.whatsapp) + '">Stuur een bericht</a></li>');
  if (SITE.plaats) c.push("<li><strong>Locatie</strong><span>" + esc(SITE.plaats) + "</span></li>");
  $("contactList").innerHTML = c.join("");
})();
