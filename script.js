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
  var params = new URLSearchParams(location.search);
  var TYPEN = ["broedei", "kuiken", "volwassen"];
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
      : '<li><span class="muted">Gebruik het formulier. We antwoorden persoonlijk.</span></li>';
  }
  var wf = $("#wa-float");
  if (wf && heeftWA) {
    wf.href = waLink("Hallo Het Kippenkamp, ik heb een vraag.");
    wf.hidden = false;
    document.body.classList.add("has-wa");
  }

  /* ---------- Rassen: gedeelde onderdelen ---------- */
  function typeLabel(r, type) {
    if (type === "broedei") return "Broedeieren";
    if (type === "kuiken") return "Kuikens";
    return r.soort === "kip" ? "Volwassen kippen" : "Volwassen kwartels";
  }
  function eenheid(type) {
    if (type === "broedei") return SITE.eenheidBroedei;
    if (type === "kuiken") return SITE.eenheidKuiken;
    return SITE.eenheidVolwassen || "stuk";
  }
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
  function galerij(r, type) {
    /* Met een type (broedei, kuiken, volwassen): foto's van dat product, anders de algemene foto's van het ras. */
    if (type && r[type]) {
      var eigen = (r[type].fotos || []).map(function (f) { return norm(f, typeLabel(r, type)); }).filter(function (f) { return f.src; });
      if (eigen.length) return eigen;
      return (r.fotos || []).map(function (f) { return norm(f); }).filter(function (f) { return f.src; });
    }
    var uit = [];
    (r.fotos || []).forEach(function (f) { uit.push(norm(f)); });
    TYPEN.forEach(function (type) {
      if (r[type] && r[type].fotos) r[type].fotos.forEach(function (f) { uit.push(norm(f, typeLabel(r, type))); });
    });
    return uit.filter(function (f) { return f.src; });
  }
  function rassenMet(type) {
    return PRODUCTEN.filter(function (p) { return p[type]; });
  }
  function categorieVan(type) {
    return CATEGORIEEN.filter(function (c) { return c.type === type; })[0];
  }

  /* Kaart in het rassenoverzicht: foto, naam, korte omschrijving en wat je kan aanvragen.
     De keuze tussen broedeieren, kuikens en volwassen dieren volgt pas op de rassenpagina. */
  function rasKaart(r, product) {
    var g = galerij(r);
    var plaats = PLAATSHOUDER[r.soort];
    var href = "ras.html?id=" + encodeURIComponent(r.id) + (product ? "&amp;product=" + product : "");
    var badges = TYPEN.filter(function (t) { return r[t] && r[t].beschikbaar !== false; })
      .map(function (t) { return "<li>" + esc(typeLabel(r, t)) + "</li>"; }).join("");
    return '<article class="cat"><div class="pic"><img src="' + esc(g.length ? g[0].src : plaats) + '" alt="' + (g.length ? esc(r.naam) : "") +
      '" loading="lazy" decoding="async" width="800" height="600" data-fallback="' + plaats + '"></div>' +
      '<div class="body"><h3><a class="stretch" href="' + href + '">' + esc(r.naam) + "</a></h3>" +
      (r.omschrijving ? '<p class="desc">' + esc(r.omschrijving) + "</p>" : "") +
      (r.eikleur ? '<p class="egg"><strong>Eikleur:</strong> ' + esc(r.eikleur) + "</p>" : "") +
      (badges ? '<ul class="chips">' + badges + "</ul>" : "") +
      '<span class="more" aria-hidden="true">Bekijk ras →</span></div></article>';
  }

  /* Kaart in een categorie (bv. Broedeieren): prijs en Aanvragen-knop staan er rechtstreeks op. */
  function keuzeKaart(r, type) {
    var g = galerij(r, type);
    var plaats = PLAATSHOUDER[r.soort];
    var href = "ras.html?id=" + encodeURIComponent(r.id) + "&amp;product=" + type;
    return '<article class="cat keuze"><a class="pic" href="' + href + '" tabindex="-1" aria-hidden="true"><img src="' + esc(g.length ? g[0].src : plaats) +
      '" alt="" loading="lazy" decoding="async" width="800" height="600" data-fallback="' + plaats + '"></a>' +
      '<div class="body"><h3><a href="' + href + '">' + esc(r.naam) + "</a></h3>" +
      (r.omschrijving ? '<p class="desc">' + esc(r.omschrijving) + "</p>" : "") +
      (r.eikleur ? '<p class="egg"><strong>Eikleur:</strong> ' + esc(r.eikleur) + "</p>" : "") +
      '<ul class="prods">' + prodRij(r, type, false) + "</ul>" +
      '<a class="more-link" href="' + href + '">Meer over dit ras</a></div></article>';
  }

  function prodRij(r, t, gekozen) {
    var item = r[t];
    var knop = item.beschikbaar === false ? "" :
      '<a class="btn small" href="aanvragen.html?product=' + t + "&amp;ras=" + esc(r.id) +
      '" aria-label="Vraag ' + esc(typeLabel(r, t).toLowerCase()) + " van " + esc(r.naam) + ' aan">Aanvragen</a>';
    return '<li class="prod' + (gekozen ? " gekozen" : "") + '"><div class="info"><span class="label">' + typeLabel(r, t) + "</span>" +
      prijsHtml(item, t) +
      (item.status && item.beschikbaar !== false ? '<span class="status">' + esc(item.status) + "</span>" : "") +
      (item.opmerking ? '<span class="note">' + esc(item.opmerking) + "</span>" : "") +
      "</div>" + knop + "</li>";
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
        var rassen = rassenMet(c.type);
        var href = rassen.length ? "aanbod.html#" + c.id : "contact.html?onderwerp=" + c.id;
        var beeld = (BEELDEN.categorie && BEELDEN.categorie[c.id]) || PLAATSHOUDER[c.plaatshouder];
        return '<article class="cat"><div class="pic"><img src="' + esc(beeld) + '" alt="" loading="lazy" decoding="async" width="800" height="600" data-fallback="' + PLAATSHOUDER[c.plaatshouder] + '"></div>' +
          '<div class="body"><h3><a class="stretch" href="' + href + '">' + esc(c.titel) + "</a></h3>" +
          "<p>" + esc(c.tekst) + "</p>" +
          (rassen.length ? '<p class="names">' + rassen.map(function (p) { return esc(p.naam); }).join(" · ") + "</p>" : "") +
          '<span class="more" aria-hidden="true">' + (rassen.length ? "Bekijk de rassen" : "Vraag ernaar") + " →</span></div></article>";
      }).join("");
    }
    var waarom = $("#waarom");
    if (waarom) {
      waarom.innerHTML = SITE.waarom.map(function (w) {
        return '<div class="why-item"><div class="ico">' + (ICONEN[w.icoon] || ICONEN.vink) + "</div><h3>" + esc(w.titel) + "</h3><p>" + esc(w.tekst) + "</p></div>";
      }).join("");
    }
  }

  /* ---------- Impressie van ons kamp (homepage en Over ons) ---------- */
  var kampEl = $("#kamp-fotos");
  if (kampEl) {
    var kampFotos = (BEELDEN.kamp || []).map(function (f) { return norm(f); }).filter(function (f) { return f.src; });
    if (kampFotos.length) {
      var n = kampFotos.length;
      kampEl.innerHTML =
        '<div class="slider" role="region" aria-roledescription="carousel" aria-label="Foto\'s van ons kamp">' +
        '<div class="slides">' + kampFotos.map(function (f, i) {
          return '<div class="slide' + (i === 0 ? " actief" : "") + '" role="group" aria-roledescription="dia" aria-label="Foto ' + (i + 1) + " van " + n + '">' +
            '<button type="button" class="strip-foto" data-lijst="kamp" data-i="' + i + '" aria-label="Bekijk foto ' + (i + 1) + ' groot' + (f.tekst ? ": " + esc(f.tekst) : "") + '">' +
            '<span class="bg" style="background-image:url(\'' + esc(f.src) + '\')"></span>' +
            '<img src="' + esc(f.src) + '" alt="' + esc(f.tekst || "Ons kamp") + '"' + (i === 0 ? "" : ' loading="lazy"') + ' decoding="async" data-fallback="' + PLAATSHOUDER.kip + '"></button></div>';
        }).join("") + "</div>" +
        (n > 1 ? '<button type="button" class="sl-btn sl-prev" aria-label="Vorige foto">‹</button><button type="button" class="sl-btn sl-next" aria-label="Volgende foto">›</button>' : "") +
        '</div><p class="sl-tekst" aria-live="polite"></p>' +
        (n > 1 ? '<div class="sl-dots">' + kampFotos.map(function (f, i) { return '<button type="button" data-i="' + i + '" aria-label="Ga naar foto ' + (i + 1) + '"></button>'; }).join("") + "</div>" : "");
      var slider = $(".slider", kampEl), slides = $$(".slide", kampEl), dots = $$(".sl-dots button", kampEl), tekstEl = $(".sl-tekst", kampEl);
      var huidig = 0, pauze = false, timer = null;
      var ga = function (i) {
        huidig = (i + n) % n;
        slides.forEach(function (s, k) { s.classList.toggle("actief", k === huidig); });
        dots.forEach(function (d, k) { d.setAttribute("aria-current", k === huidig ? "true" : "false"); });
        tekstEl.textContent = kampFotos[huidig].tekst || "";
      };
      ga(0);
      if (n > 1) {
        var stel = function () {
          clearInterval(timer);
          if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
          timer = setInterval(function () {
            var lbOpen = $("#lightbox") && !$("#lightbox").hidden;
            if (!pauze && !lbOpen && !document.hidden) ga(huidig + 1);
          }, 5000);
        };
        stel();
        $(".sl-prev", kampEl).addEventListener("click", function () { ga(huidig - 1); stel(); });
        $(".sl-next", kampEl).addEventListener("click", function () { ga(huidig + 1); stel(); });
        dots.forEach(function (d) { d.addEventListener("click", function () { ga(Number(d.getAttribute("data-i"))); stel(); }); });
        kampEl.addEventListener("mouseenter", function () { pauze = true; });
        kampEl.addEventListener("mouseleave", function () { pauze = false; });
        kampEl.addEventListener("focusin", function () { pauze = true; });
        kampEl.addEventListener("focusout", function () { pauze = false; });
        var sx = null;
        slider.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
        slider.addEventListener("touchend", function (e) {
          if (sx === null) return;
          var dx = e.changedTouches[0].clientX - sx; sx = null;
          if (Math.abs(dx) > 50) { ga(huidig + (dx < 0 ? 1 : -1)); stel(); }
        });
      }
    } else {
      kampEl.innerHTML = '<ul class="fotostrip kamp">' + ["kip", "kwartel", "kuiken"].map(function (k) {
        return '<li><div class="tegel"><img src="' + PLAATSHOUDER[k] + '" alt="" loading="lazy" width="400" height="300"></div></li>';
      }).join("") + "</ul>";
      var leeg = $("#kamp-leeg"); if (leeg) leeg.hidden = false;
    }
  }

  /* ---------- Aanbod: overzicht van de rassen ---------- */
  if (page === "aanbod") {
    var lijst = $("#rassen");
    var filterEl = $("#filters");
    var cats = CATEGORIEEN;
    var markeerMenu = function (id) {
      $$(".main-nav a").forEach(function (a) {
        var h = a.getAttribute("href") || "";
        if (h.indexOf("aanbod.html#") === -1) return;
        if (h.split("#")[1] === id) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
      });
    };
    var toon = function (id) {
      var cat = cats.filter(function (c) { return c.id === id; })[0];
      var items = cat ? rassenMet(cat.type) : PRODUCTEN;
      markeerMenu(cat ? cat.id : "");
      var groepen = [["kwartel", "Kwartels"], ["kip", "Kippen"]];
      var strip = "";
      var cf = cat && BEELDEN.categorieFotos && BEELDEN.categorieFotos[cat.id];
      if (cf && cf.length) {
        strip = '<ul class="fotostrip" aria-label="Foto\'s: ' + esc(cat.titel) + '">' + cf.map(function (f, i) {
          var n = norm(f);
          return '<li><button type="button" class="strip-foto" data-cat="' + cat.id + '" data-i="' + i + '" aria-label="Bekijk foto ' + (i + 1) + " van " + cf.length + '">' +
            '<img src="' + esc(n.src) + '" alt="' + esc(n.tekst) + '" loading="lazy" decoding="async" data-fallback="' + PLAATSHOUDER.kip + '"></button></li>';
        }).join("") + "</ul>";
      }
      if (cat && !items.length) {
        lijst.innerHTML = '<div class="leeg-cat"><h2>' + esc(cat.titel) + "</h2><p>" + esc(cat.tekst) +
          '</p><p><a class="btn" href="contact.html?onderwerp=' + cat.id + '">Vraag naar de mogelijkheden</a></p></div>';
        $$("button", filterEl).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-id") === id ? "true" : "false"); });
        return;
      }
      lijst.innerHTML = strip + (items.length
        ? groepen.map(function (gr) {
            var deel = items.filter(function (r) { return r.soort === gr[0]; });
            if (!deel.length) return "";
            return '<section class="groep"><h2 class="groep-titel">' + gr[1] + '</h2><div class="grid rassen">' +
              deel.map(function (r) { return cat ? keuzeKaart(r, cat.type) : rasKaart(r, ""); }).join("") + "</div></section>";
          }).join("")
        : '<p class="empty">Er staat hier nog niets in het aanbod.</p>');
      $$("button", filterEl).forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-id") === id ? "true" : "false"); });
    };
    filterEl.innerHTML = '<button type="button" data-id="alles" aria-pressed="true">Alle rassen</button>' +
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

  /* ---------- Rassenpagina: hier kies je broedeieren, kuikens of volwassen ---------- */
  if (page === "ras") {
    var rid = (params.get("id") || "").replace(/^ciladon$/, "celadon");
    var ras = PRODUCTEN.filter(function (p) { return p.id === rid; })[0];
    var detail = $("#ras-detail");
    var introEl2 = $("#ras-intro");
    if (!ras) {
      $("#ras-naam").textContent = "Ras niet gevonden";
      introEl2.hidden = true;
      detail.innerHTML = '<p>Dit ras staat niet (meer) in ons aanbod.</p><p><a class="btn" href="aanbod.html">Bekijk alle rassen</a></p>';
    } else {
      document.title = ras.naam + " | " + SITE.naam;
      var md = $('meta[name="description"]');
      if (md) md.setAttribute("content", ras.omschrijving || ("Bekijk wat je van " + ras.naam + " kan aanvragen bij " + SITE.naam + "."));
      var can = $('link[rel="canonical"]');
      if (can) can.setAttribute("href", SITE.url + "/ras.html?id=" + encodeURIComponent(ras.id));
      $("#ras-naam").textContent = ras.naam;
      if (ras.omschrijving) introEl2.textContent = ras.omschrijving; else introEl2.hidden = true;

      var gekozen = params.get("product");
      var gekozenType = TYPEN.indexOf(gekozen) >= 0 && ras[gekozen] ? gekozen : "";
      var fotos = galerij(ras, gekozenType);
      var plaatsR = PLAATSHOUDER[ras.soort];
      var beeld = fotos.length
        ? '<button type="button" class="pic" data-ras="' + PRODUCTEN.indexOf(ras) + '" data-type="' + gekozenType + '" aria-label="Bekijk foto\'s van ' + esc(ras.naam) + '">' +
          '<img src="' + esc(fotos[0].src) + '" alt="' + esc(ras.naam) + '" width="800" height="600" decoding="async" data-fallback="' + plaatsR + '">' +
          (fotos.length > 1 ? '<span class="count">' + fotos.length + " foto's</span>" : "") + "</button>"
        : '<img src="' + plaatsR + '" alt="" width="800" height="600" decoding="async">';
      var typen = TYPEN.filter(function (t) { return ras[t]; });
      var chips = (ras.kenmerken || []).length
        ? '<ul class="chips">' + ras.kenmerken.map(function (k) { return "<li>" + esc(k) + "</li>"; }).join("") + "</ul>"
        : "";
      detail.innerHTML = '<div class="split ras-split"><figure class="photo-frame">' + beeld + "</figure><div>" +
        (ras.eikleur ? '<p class="egg"><strong>Eikleur:</strong> ' + esc(ras.eikleur) + "</p>" : "") + chips +
        "<h2>Wat kan je aanvragen?</h2>" +
        (typen.length
          ? '<ul class="prods big">' + typen.map(function (t) { return prodRij(ras, t, t === gekozen); }).join("") + "</ul>" +
            '<p class="notice">We bevestigen altijd eerst of het beschikbaar is.</p>'
          : '<p>Hier staat nog niets om aan te vragen. <a href="contact.html">Stel ons gerust je vraag.</a></p>') +
        "</div></div>";
    }
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
    if (form.elements.product) form.elements.product.dispatchEvent(new Event("change"));
    var inf = $("#ras-info");
    if (inf) inf.hidden = true;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
    box.focus();
  }
  function bezig(form, aan) {
    var b = $('button[type="submit"]', form);
    if (!b) return;
    if (aan) { b.setAttribute("data-label", b.textContent); b.textContent = "Bezig met verzenden…"; b.disabled = true; }
    else { b.textContent = b.getAttribute("data-label") || b.textContent; b.disabled = false; }
  }

  /* --- Aanvraagformulier --- */
  var af = $("#aanvraag-form");
  if (af) {
    var prodSel = af.elements.product;
    var rasSel = af.elements.ras;
    var rasInfo = $("#ras-info");
    var catsMetAanbod = CATEGORIEEN.filter(function (c) { return rassenMet(c.type).length; });
    prodSel.innerHTML = '<option value="">Kies een product</option>' +
      catsMetAanbod.map(function (c) { return '<option value="' + c.type + '">' + esc(c.titel) + "</option>"; }).join("");
    var toonInfo = function () {
      var r = PRODUCTEN.filter(function (p) { return p.id === rasSel.value; })[0];
      var t = prodSel.value;
      var tekst = (r && t && r[t] && r[t].opmerking) || "";
      rasInfo.textContent = tekst;
      rasInfo.hidden = !tekst;
      var kz = (r && t && r[t] && r[t].keuze) || null;
      var kzVeld = $("#keuze-veld"), kzSel = af.elements.keuze;
      if (kz && kz.opties && kz.opties.length) {
        var vorig = kzSel.value;
        $("#keuze-label").textContent = kz.label || "Keuze";
        kzSel.innerHTML = '<option value="">Kies een ' + esc((kz.label || "optie").toLowerCase()) + "</option>" +
          kz.opties.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + "</option>"; }).join("");
        if (kz.opties.indexOf(vorig) >= 0) kzSel.value = vorig;
        kzSel.required = true;
        kzVeld.hidden = false;
      } else {
        kzSel.innerHTML = "";
        kzSel.required = false;
        zetFout(kzSel, "");
        kzVeld.hidden = true;
      }
    };
    var vulRassen = function (gekozenRas) {
      var t = prodSel.value;
      if (!t) {
        rasSel.innerHTML = '<option value="">Kies eerst een product</option>';
        rasSel.disabled = true;
        toonInfo();
        return;
      }
      rasSel.disabled = false;
      rasSel.innerHTML = '<option value="">Kies een ras</option>' +
        rassenMet(t).filter(function (p) { return p[t].beschikbaar !== false; }).map(function (p) {
          return '<option value="' + esc(p.id) + '">' + esc(p.naam) + "</option>";
        }).join("") + '<option value="advies">Ik twijfel, adviseer mij</option>';
      if (gekozenRas) rasSel.value = gekozenRas;
      if (!rasSel.value) rasSel.value = "";
      toonInfo();
    };
    prodSel.addEventListener("change", function () { vulRassen(""); });
    rasSel.addEventListener("change", toonInfo);
    var pp = (params.get("product") || "").replace(/^(kip|kwartel)-/, "");
    if (pp && catsMetAanbod.some(function (c) { return c.type === pp; })) prodSel.value = pp;
    vulRassen((params.get("ras") || "").replace(/^ciladon$/, "celadon"));

    var tekstVan = function () {
      var rasNaam = rasSel.value === "advies" ? "Ik twijfel, graag advies" : (rasSel.selectedOptions[0] && rasSel.value ? rasSel.selectedOptions[0].text : "");
      var regels = ["Hallo Het Kippenkamp,", "", "Ik wil graag een aanvraag doen."];
      if (prodSel.value) regels.push("Product: " + prodSel.selectedOptions[0].text);
      if (rasNaam) regels.push("Ras: " + rasNaam);
      if (af.elements.aantal.value) regels.push("Aantal: " + af.elements.aantal.value);
      if (af.elements.keuze.value) regels.push(($("#keuze-label").textContent || "Keuze") + ": " + af.elements.keuze.value);
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
        keuze: function (el) { return $("#keuze-veld").hidden || el.value ? "" : "Maak een keuze."; },
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
        keuzeLabel: af.elements.keuze.value ? ($("#keuze-label").textContent || "Keuze") : "",
        keuze: af.elements.keuze.value,
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
    var openFoto = function (r, type) {
      foto = galerij(r, type);
      if (!foto.length) return;
      pos = 0; titel = r.naam;
      $("#lbImg").setAttribute("data-fallback", PLAATSHOUDER[r.soort]);
      toonFoto();
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      $("#lbClose").focus();
    };
    var openLijst = function (lijstFotos, start, naam) {
      foto = lijstFotos.map(function (f) { return norm(f); }).filter(function (f) { return f.src; });
      if (!foto.length) return;
      pos = Math.min(start, foto.length - 1); titel = naam;
      $("#lbImg").setAttribute("data-fallback", PLAATSHOUDER.kip);
      toonFoto();
      lb.hidden = false;
      document.body.style.overflow = "hidden";
      $("#lbClose").focus();
    };
    var sluitFoto = function () { lb.hidden = true; document.body.style.overflow = ""; };
    var stap = function (d) { pos = (pos + d + foto.length) % foto.length; toonFoto(); };
    document.addEventListener("click", function (e) {
      var sf = e.target.closest("button.strip-foto");
      if (sf && sf.getAttribute("data-lijst") === "kamp") return openLijst(BEELDEN.kamp, Number(sf.getAttribute("data-i")), "Ons kamp");
      if (sf) {
        var c = CATEGORIEEN.filter(function (x) { return x.id === sf.getAttribute("data-cat"); })[0];
        return openLijst(BEELDEN.categorieFotos[c.id], Number(sf.getAttribute("data-i")), c.titel);
      }
      var k = e.target.closest("button.pic");
      if (k) return openFoto(PRODUCTEN[Number(k.getAttribute("data-ras"))], k.getAttribute("data-type") || "");
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
