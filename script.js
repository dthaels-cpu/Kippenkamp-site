/* Het Kippenkamp: gedeelde scripts voor alle pagina's.
   Gegevens, teksten en prijzen staan in data.js, niet hier. */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var page = document.body.getAttribute("data-page");
  var PLAATSHOUDER = {
    kip: "images/placeholder-kip.svg",
    kwartel: "images/placeholder-kwartel.svg",
    ei: "images/placeholder-ei.svg",
    kuiken: "images/placeholder-kuiken.svg"
  };
  var ICONEN = {
    ster: '<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    bericht: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    vink: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    kalender: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>'
  };

  /* ---------- Afbeeldingen: val terug op tekening als een foto ontbreekt ---------- */
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t.getAttribute("data-fallback") && t.getAttribute("src") !== t.getAttribute("data-fallback")) {
      t.src = t.getAttribute("data-fallback");
    }
  }, true);
  function checkImages() {
    $$("img[data-fallback]").forEach(function (img) {
      if (img.complete && img.naturalWidth === 0 && img.getAttribute("src") !== img.getAttribute("data-fallback")) {
        img.src = img.getAttribute("data-fallback");
      }
    });
  }

  /* ---------- Menu op mobiel ---------- */
  var toggle = $(".menu-toggle");
  var nav = $("#hoofdmenu");
  if (toggle && nav) {
    var sluitMenu = function () {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    };
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Sluit menu" : "Open menu");
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", sluitMenu); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") sluitMenu(); });
  }

  /* ---------- Teksten uit data.js ---------- */
  $$("[data-site]").forEach(function (el) {
    var v = SITE[el.getAttribute("data-site")];
    if (typeof v === "string" && v) el.textContent = v;
  });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  $$("img[data-beeld]").forEach(function (img) {
    var v = BEELDEN[img.getAttribute("data-beeld")];
    if (v) {
      img.setAttribute("data-fallback", img.getAttribute("src"));
      img.src = v;
      img.alt = img.getAttribute("data-alt") || "";
    }
  });

  /* ---------- Contact: e-mail, telefoon, WhatsApp ---------- */
  function waLink(tekst) {
    return "https://wa.me/" + String(SITE.whatsapp).replace(/\D/g, "") + "?text=" + encodeURIComponent(tekst);
  }
  var heeftWA = !!String(SITE.whatsapp || "").replace(/\D/g, "");
  function contactItems(metWA) {
    var items = [];
    if (SITE.email) items.push(["E-mail", '<a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>"]);
    if (SITE.telefoon) items.push(["Telefoon", '<a href="tel:' + esc(SITE.telefoon.replace(/[^\d+]/g, "")) + '">' + esc(SITE.telefoon) + "</a>"]);
    if (heeftWA && metWA) items.push(["WhatsApp", '<a href="' + esc(waLink("Hallo, ik heb een vraag.")) + '" rel="noopener">Stuur een bericht</a>']);
    if (SITE.plaats) items.push(["Locatie", "<span>" + esc(SITE.plaats) + "</span>"]);
    return items;
  }
  var fc = $("#footer-contact");
  if (fc) {
    var fi = contactItems(true);
    fc.innerHTML = fi.length
      ? fi.map(function (i) { return "<li>" + i[1] + "</li>"; }).join("")
      : '<li><a href="contact.html">Neem contact op via het formulier</a></li>';
  }
  var cg = $("#contact-gegevens");
  if (cg) {
    var ci = contactItems(true);
    cg.innerHTML = ci.length
      ? ci.map(function (i) { return "<li><strong>" + i[0] + "</strong>" + i[1] + "</li>"; }).join("")
      : '<li><span class="muted">Gebruik het formulier hiernaast. We antwoorden persoonlijk.</span></li>';
  }
  var wf = $("#wa-float");
  if (wf && heeftWA) {
    wf.href = waLink("Hallo Het Kippenkamp, ik heb een vraag.");
    wf.hidden = false;
    document.body.classList.add("has-wa");
  }

  /* ---------- Rassen: gedeelde onderdelen ---------- */
  function typeLabel(r, type) {
    return type === "broedei" ? "Broedeieren" : (r.soort === "kip" ? "Eendagskuikens" : "Kwartels");
  }
  function eenheid(type) { return type === "broedei" ? SITE.eenheidBroedei : SITE.eenheidKuiken; }
  function prijsHtml(item, type) {
    if (item.beschikbaar === false) return '<span class="prijs uit">Momenteel niet beschikbaar</span>';
    if (item.prijs === null || item.prijs === undefined || item.prijs === "") return '<span class="prijs">Prijs op aanvraag</span>';
    var bedrag = Number(item.prijs).toLocaleString("nl-BE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return '<span class="prijs">€ ' + bedrag + " per " + esc(eenheid(type)) + "</span>";
  }
  function norm(f, standaard) {
    return typeof f === "string"
      ? { src: f, tekst: standaard || "" }
      : { src: f && f.src, tekst: (f && f.tekst) || standaard || "" };
  }
  function galerij(r) {
    var uit = [];
    (r.fotos || []).forEach(function (f) { uit.push(norm(f)); });
    ["broedei", "kuiken"].forEach(function (type) {
      if (r[type] && r[type].fotos) r[type].fotos.forEach(function (f) { uit.push(norm(f, typeLabel(r, type))); });
    });
    return uit.filter(function (f) { return f.src; });
  }
  function heeftProduct(c) {
    return PRODUCTEN.filter(function (p) { return p.soort === c.soort && p[c.type]; });
  }
  function rasKaart(r) {
    var g = galerij(r);
    var plaats = PLAATSHOUDER[r.soort];
    var pic = g.length
      ? '<button type="button" class="pic" data-ras="' + PRODUCTEN.indexOf(r) + '" aria-label="Bekijk foto\'s van ' + esc(r.naam) + '">' +
        '<img src="' + esc(g[0].src) + '" alt="' + esc(r.naam) + '" loading="lazy" decoding="async" width="800" height="600" data-fallback="' + plaats + '">' +
        (g.length > 1 ? '<span class="count">' + g.length + " foto's</span>" : "") + "</button>"
      : '<div class="pic"><img src="' + plaats + '" alt="" loading="lazy" decoding="async" width="800" height="600"></div>';
    var chips = (r.kenmerken || []).length
      ? '<ul class="chips">' + r.kenmerken.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul>"
      : "";
    var rijen = ["broedei", "kuiken"].filter(function (t) { return r[t]; }).map(function (t) {
      var item = r[t];
      var knop = item.beschikbaar === false ? "" :
        '<a class="btn small" href="aanvragen.html?product=' + r.soort + "-" + t + "&amp;ras=" + esc(r.id) +
        '" aria-label="Vraag ' + esc(typeLabel(r, t).toLowerCase()) + " van " + esc(r.naam) + ' aan">Aanvragen</a>';
      return '<li class="prod"><div class="info"><span class="label">' + typeLabel(r, t) + "</span>" +
        prijsHtml(item, t) +
        (item.status && item.beschikbaar !== false ? '<span class="status">' + esc(item.status) + "</span>" : "") +
        (item.opmerking ? '<span class="note">' + esc(item.opmerking) + "</span>" : "") +
        "</div>" + knop + "</li>";
    }).join("");
    return '<article class="ras" id="ras-' + esc(r.id) + '">' + pic + '<div class="body"><h3>' + esc(r.naam) + "</h3>" +
      (r.omschrijving ? '<p class="desc">' + esc(r.omschrijving) + "</p>" : "") +
      (r.eikleur ? '<p class="egg"><strong>Eikleur:</strong> ' + esc(r.eikleur) + "</p>" : "") +
      chips + '<ul class="prods">' + rijen + "</ul></div></article>";
  }

  /* ---------- Homepage ---------- */
  if (page === "home") {
    var hero = $(".hero");
    if (hero && BEELDEN.hero) {
      hero.style.setProperty("--hero-foto", 'url("' + BEELDEN.hero + '")');
      hero.classList.add("has-photo");
    }
    var catEl = $("#categorieen");
    if (catEl) {
      catEl.innerHTML = CATEGORIEEN.map(function (c) {
        var rassen = heeftProduct(c);
        var href = rassen.length ? "aanbod.html#" + c.id : "contact.html?onderwerp=" + c.id;
        var beeld = (BEELDEN.categorie && BEELDEN.categorie[c.id]) || PLAATSHOUDER[c.plaatshouder];
        return '<article class="cat"><div class="pic"><img src="' + esc(beeld) + '" alt="" loading="lazy" decoding="async" width="800" height="600" data-fallback="' + PLAATSHOUDER[c.plaatshouder] + '"></div>' +
          '<div class="body"><h3><a class="stretch" href="' + href + '">' + esc(c.titel) + "</a></h3>" +
          "<p>" + esc(c.tekst) + "</p>" +
          (rassen.length ? '<p class="names">' + rassen.map(function (p) { return esc(p.naam); }).join(" · ") + "</p>" : "") +
          '<span class="more" aria-hidden="true">' + (rassen.length ? "Bekijk aanbod" : "Vraag ernaar") + " →</span></div></article>";
      }).join("");
    }
    var uitEl = $("#uitgelicht");
    if (uitEl) {
      var uit = PRODUCTEN.filter(function (p) { return p.uitgelicht; });
      uitEl.innerHTML = uit.map(rasKaart).join("");
      if (!uit.length) { var sec = $("#uitgelicht-sectie"); if (sec) sec.hidden = true; }
    }
    var waarom = $("#waarom");
    if (waarom) {
      waarom.innerHTML = SITE.waarom.map(function (w) {
        return '<div class="why-item"><div class="ico">' + (ICONEN[w.icoon] || ICONEN.vink) + "</div><h3>" + esc(w.titel) + "</h3><p>" + esc(w.tekst) + "</p></div>";
      }).join("");
    }
  }

  /* ---------- Aanbod ---------- */
  if (page === "aanbod") {
    var lijst = $("#rassen");
    var filterEl = $("#filters");
    var cats = CATEGORIEEN.filter(function (c) { return heeftProduct(c).length; });
    var huidig = "alles";
    var toon = function (id) {
      huidig = id;
      var cat = cats.filter(function (c) { return c.id === id; })[0];
      var items = cat ? heeftProduct(cat) : PRODUCTEN;
      lijst.innerHTML = items.length ? items.map(rasKaart).join("") : '<p class="empty">Er staat hier nog niets in het aanbod.</p>';
      $$("button", filterEl).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-id") === id ? "true" : "false"); });
    };
    filterEl.innerHTML = '<button type="button" data-id="alles" aria-pressed="true">Alles</button>' +
      cats.map(function (c) { return '<button type="button" data-id="' + c.id + '" aria-pressed="false">' + esc(c.titel) + "</button>"; }).join("");
    filterEl.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var id = b.getAttribute("data-id");
      toon(id);
      history.replaceState(null, "", id === "alles" ? location.pathname : "#" + id);
    });
    var vanHash = function () {
      var h = location.hash.replace("#", "");
      toon(cats.some(function (c) { return c.id === h; }) ? h : "alles");
    };
    window.addEventListener("hashchange", vanHash);
    vanHash();
  }

  /* ---------- Over ons ---------- */
  if (page === "over-ons") {
    var oo = $("#overons-lijst");
    if (oo) oo.innerHTML = SITE.overOns.map(function (o) { return "<article><h3>" + esc(o.titel) + "</h3><p>" + esc(o.tekst) + "</p></article>"; }).join("");
  }

  /* ---------- Stappen en voorstelling (op meerdere pagina's) ---------- */
  var stappenEl = $("#stappen");
  if (stappenEl) {
    stappenEl.innerHTML = SITE.stappen.map(function (s) {
      return "<li><div><strong>" + esc(s.titel) + "</strong><span>" + esc(s.tekst) + "</span></div></li>";
    }).join("");
  }
  var introEl = $("#intro-tekst");
  if (introEl) {
    var introTitel = $("#intro-titel");
    if (introTitel) introTitel.textContent = SITE.introTitel;
    introEl.innerHTML = SITE.intro.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
  }

  /* ---------- Formulieren ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function veldVan(el) { return el.closest(".field"); }
  function zetFout(el, msg) {
    var f = veldVan(el);
    if (!f) return;
    var err = $(".err", f);
    if (msg) { f.classList.add("invalid"); el.setAttribute("aria-invalid", "true"); if (err) err.textContent = msg; }
    else { f.classList.remove("invalid"); el.removeAttribute("aria-invalid"); if (err) err.textContent = ""; }
  }
  function valideer(form, regels) {
    var eerste = null;
    Object.keys(regels).forEach(function (naam) {
      var el = form.elements[naam];
      var msg = regels[naam](el);
      zetFout(el, msg);
      if (msg && !eerste) eerste = el;
    });
    if (eerste) eerste.focus();
    return !eerste;
  }
  function verstuur(payload) {
    return fetch("/api/aanvraag", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) { return { status: res.status, ok: res.ok && data.ok === true, data: data }; });
    });
  }
  function mislukt(form, tekst) {
    var box = $("#form-melding");
    var knoppen = "";
    if (heeftWA) knoppen += '<a class="btn small" href="' + esc(waLink(tekst)) + '" rel="noopener">Stuur via WhatsApp</a>';
    if (SITE.email) knoppen += '<a class="btn small ghost" href="mailto:' + esc(SITE.email) + "?subject=" + encodeURIComponent("Aanvraag via de website") + "&body=" + encodeURIComponent(tekst) + '">Stuur via e-mail</a>';
    box.className = "alert fail";
    box.innerHTML = "<h3>Je bericht is niet verzonden</h3>" +
      "<p>Er ging iets mis, dus we hebben je aanvraag <strong>niet</strong> ontvangen. Probeer het zo meteen opnieuw" +
      (knoppen ? " of verstuur het op een andere manier." : ". Je kan de tekst hieronder kopiëren om ze later door te sturen.") + "</p>" +
      (knoppen ? '<div class="cta">' + knoppen + "</div>" : "") +
      '<label class="hint" for="kopie" style="display:block;margin-top:14px">Jouw tekst, om te kopiëren:</label>' +
      '<textarea id="kopie" readonly rows="6"></textarea>';
    $("#kopie").value = tekst;
    $("#kopie").addEventListener("focus", function () { this.select(); });
    box.hidden = false;
    box.setAttribute("tabindex", "-1");
    box.focus();
  }
  function gelukt(form, naam, wat) {
    var box = $("#form-melding");
    box.className = "alert ok";
    box.innerHTML = "<h3>Bedankt" + (naam ? ", " + esc(naam) : "") + "!</h3><p>" + esc(wat) + "</p>";
    box.hidden = false;
    box.setAttribute("tabindex", "-1");
    form.reset();
    box.scrollIntoView({ behavior: "smooth", block: "center" });
    box.focus();
  }
  function bezig(form, aan) {
    var b = $('button[type="submit"]', form);
    if (!b) return;
    if (aan) { b.setAttribute("data-label", b.textContent); b.textContent = "Bezig met verzenden…"; b.disabled = true; }
    else { b.textContent = b.getAttribute("data-label") || b.textContent; b.disabled = false; }
  }
  function vandaag() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  function lang(v) {
    if (!v) return "";
    var d = new Date(v + "T00:00:00");
    return isNaN(d) ? v : d.toLocaleDateString("nl-BE", { day: "numeric", month: "long", year: "numeric" });
  }
  var params = new URLSearchParams(location.search);

  /* --- Aanvraagformulier --- */
  var af = $("#aanvraag-form");
  if (af) {
    var prodSel = af.elements.product;
    var rasSel = af.elements.ras;
    var combos = CATEGORIEEN.filter(function (c) { return heeftProduct(c).length; });
    prodSel.innerHTML = '<option value="">Kies een product</option>' +
      combos.map(function (c) { return '<option value="' + c.soort + "-" + c.type + '">' + esc(c.titel) + "</option>"; }).join("");
    var vulRassen = function (gekozenRas) {
      var c = combos.filter(function (x) { return x.soort + "-" + x.type === prodSel.value; })[0];
      if (!c) {
        rasSel.innerHTML = '<option value="">Kies eerst een product</option>';
        rasSel.disabled = true;
        return;
      }
      rasSel.disabled = false;
      rasSel.innerHTML = '<option value="">Kies een ras</option>' +
        heeftProduct(c).filter(function (p) { return p[c.type].beschikbaar !== false; }).map(function (p) {
          return '<option value="' + esc(p.id) + '">' + esc(p.naam) + "</option>";
        }).join("") + '<option value="advies">Ik twijfel, adviseer mij</option>';
      if (gekozenRas) rasSel.value = gekozenRas;
    };
    prodSel.addEventListener("change", function () { vulRassen(""); });
    var pp = params.get("product");
    if (pp && combos.some(function (c) { return c.soort + "-" + c.type === pp; })) prodSel.value = pp;
    vulRassen(params.get("ras") || "");
    if (!rasSel.value) rasSel.value = "";
    af.elements.datum.min = vandaag();

    var tekstVan = function () {
      var rasNaam = rasSel.value === "advies" ? "Ik twijfel, graag advies" : (rasSel.selectedOptions[0] && rasSel.value ? rasSel.selectedOptions[0].text : "");
      var regels = ["Hallo Het Kippenkamp,", "", "Ik wil graag een aanvraag doen."];
      if (prodSel.value) regels.push("Product: " + prodSel.selectedOptions[0].text);
      if (rasNaam) regels.push("Ras: " + rasNaam);
      if (af.elements.aantal.value) regels.push("Aantal: " + af.elements.aantal.value);
      if (af.elements.datum.value) regels.push("Gewenste afhaaldatum: " + lang(af.elements.datum.value));
      if (af.elements.bericht.value.trim()) regels.push("", af.elements.bericht.value.trim());
      regels.push("", "Groeten" + (af.elements.naam.value.trim() ? ",\n" + af.elements.naam.value.trim() : ""));
      var contact = [];
      if (af.elements.email.value.trim()) contact.push("E-mail: " + af.elements.email.value.trim());
      if (af.elements.telefoon.value.trim()) contact.push("Telefoon: " + af.elements.telefoon.value.trim());
      if (contact.length) regels.push(contact.join("\n"));
      return regels.join("\n");
    };
    var wa = $("#wa-aanvraag");
    if (wa) {
      if (heeftWA) {
        var upd = function () { wa.href = waLink(tekstVan()); };
        wa.hidden = false;
        af.addEventListener("input", upd);
        af.addEventListener("change", upd);
        wa.addEventListener("click", upd);
        upd();
      } else {
        wa.hidden = true;
      }
    }
    af.addEventListener("input", function (e) { if (e.target.name) zetFout(e.target, ""); });
    af.addEventListener("submit", function (e) {
      e.preventDefault();
      var box = $("#form-melding");
      box.hidden = true;
      var ok = valideer(af, {
        product: function (el) { return el.value ? "" : "Kies een product."; },
        ras: function (el) { return el.value ? "" : "Kies een ras."; },
        aantal: function (el) { var n = Number(el.value); return n >= 1 && n <= 1000 && Math.floor(n) === n ? "" : "Vul een aantal in van 1 of meer."; },
        naam: function (el) { return el.value.trim() ? "" : "Vul je naam in."; },
        email: function (el) { return EMAIL_RE.test(el.value.trim()) ? "" : "Vul een geldig e-mailadres in."; },
        privacy: function (el) { return el.checked ? "" : "Je moet hiermee akkoord gaan om te kunnen verzenden."; }
      });
      if (!ok) return;
      var payload = {
        type: "aanvraag",
        product: prodSel.selectedOptions[0].text,
        ras: rasSel.value === "advies" ? "Ik twijfel, graag advies" : rasSel.selectedOptions[0].text,
        aantal: Number(af.elements.aantal.value),
        datum: af.elements.datum.value,
        naam: af.elements.naam.value.trim(),
        email: af.elements.email.value.trim(),
        telefoon: af.elements.telefoon.value.trim(),
        bericht: af.elements.bericht.value.trim(),
        website: af.elements.website.value
      };
      var kopie = tekstVan();
      var naam = payload.naam;
      bezig(af, true);
      verstuur(payload).then(function (r) {
        bezig(af, false);
        if (r.ok) gelukt(af, naam, "Je aanvraag is verzonden. We bevestigen zo snel mogelijk of het beschikbaar is en spreken dan samen een afhaalmoment af.");
        else if (r.status === 400 && r.data && r.data.velden) {
          r.data.velden.forEach(function (n) { if (af.elements[n]) zetFout(af.elements[n], "Controleer dit veld."); });
          mislukt(af, kopie);
        } else mislukt(af, kopie);
      }).catch(function () { bezig(af, false); mislukt(af, kopie); });
    });
  }

  /* --- Contactformulier --- */
  var cf = $("#contact-form");
  if (cf) {
    var onderwerp = params.get("onderwerp");
    if (onderwerp) {
      var cat = CATEGORIEEN.filter(function (c) { return c.id === onderwerp; })[0];
      if (cat) cf.elements.bericht.value = "Hallo, ik heb een vraag over: " + cat.titel.toLowerCase() + ".\n";
    }
    cf.addEventListener("input", function (e) { if (e.target.name) zetFout(e.target, ""); });
    cf.addEventListener("submit", function (e) {
      e.preventDefault();
      $("#form-melding").hidden = true;
      var ok = valideer(cf, {
        naam: function (el) { return el.value.trim() ? "" : "Vul je naam in."; },
        email: function (el) { return EMAIL_RE.test(el.value.trim()) ? "" : "Vul een geldig e-mailadres in."; },
        bericht: function (el) { return el.value.trim().length >= 5 ? "" : "Schrijf een korte vraag of bericht."; },
        privacy: function (el) { return el.checked ? "" : "Je moet hiermee akkoord gaan om te kunnen verzenden."; }
      });
      if (!ok) return;
      var p = {
        type: "contact",
        naam: cf.elements.naam.value.trim(),
        email: cf.elements.email.value.trim(),
        telefoon: cf.elements.telefoon.value.trim(),
        bericht: cf.elements.bericht.value.trim(),
        website: cf.elements.website.value
      };
      var kopie = "Hallo Het Kippenkamp,\n\n" + p.bericht + "\n\nGroeten,\n" + p.naam +
        (p.telefoon ? "\nTelefoon: " + p.telefoon : "") + "\nE-mail: " + p.email;
      bezig(cf, true);
      verstuur(p).then(function (r) {
        bezig(cf, false);
        if (r.ok) gelukt(cf, p.naam, "Je bericht is verzonden. We antwoorden je persoonlijk.");
        else mislukt(cf, kopie);
      }).catch(function () { bezig(cf, false); mislukt(cf, kopie); });
    });
  }

  /* ---------- Fotoviewer ---------- */
  var lb = $("#lightbox");
  if (lb) {
    var foto = [], pos = 0, titel = "";
    var toonFoto = function () {
      var f = foto[pos];
      $("#lbImg").src = f.src;
      $("#lbImg").alt = titel;
      $("#lbCaption").textContent = titel + (f.tekst ? " · " + f.tekst : "");
      $("#lbCount").textContent = foto.length > 1 ? pos + 1 + " / " + foto.length : "";
      lb.classList.toggle("single", foto.length < 2);
    };
    var openFoto = function (r) {
      foto = galerij(r);
      if (!foto.length) return;
      pos = 0; titel = r.naam;
      $("#lbImg").setAttribute("data-fallback", PLAATSHOUDER[r.soort]);
      toonFoto();
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      $("#lbClose").focus();
    };
    var sluitFoto = function () { lb.hidden = true; document.body.style.overflow = ""; };
    var stap = function (d) { pos = (pos + d + foto.length) % foto.length; toonFoto(); };
    document.addEventListener("click", function (e) {
      var k = e.target.closest("button.pic");
      if (k) return openFoto(PRODUCTEN[Number(k.getAttribute("data-ras"))]);
      if (e.target === lb || e.target.id === "lbClose") sluitFoto();
      if (e.target.id === "lbPrev") stap(-1);
      if (e.target.id === "lbNext") stap(1);
    });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") sluitFoto();
      if (e.key === "ArrowLeft") stap(-1);
      if (e.key === "ArrowRight") stap(1);
    });
    var startX = null;
    lb.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (startX === null || foto.length < 2) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) stap(dx < 0 ? 1 : -1);
      startX = null;
    });
  }

  checkImages();
})();
