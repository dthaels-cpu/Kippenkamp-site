"use strict";

/*
  Vercel-functie die aanvragen en contactberichten per e-mail doorstuurt
  via Resend (https://resend.com).

  Instellen in Vercel (Project > Settings > Environment Variables):
    RESEND_API_KEY   de API-key uit je Resend-account (verplicht)
    MAIL_TO          het e-mailadres waar de aanvragen binnenkomen (verplicht)
    MAIL_FROM        afzender, bv. "Het Kippenkamp <aanvragen@jouwdomein.be>"
                     (optioneel; zonder eigen geverifieerd domein wordt
                     onboarding@resend.dev gebruikt)

  Zijn de eerste twee niet ingesteld, dan antwoordt deze functie met een fout
  (HTTP 503) en toont de website eerlijk dat er niets verzonden is.
*/

const MAX = { naam: 100, email: 200, telefoon: 40, bericht: 3000, product: 80, ras: 100 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Eenvoudige beperking per IP (werkt per serverinstantie, genoeg tegen misbruik in het klein)
const recent = new Map();
function teVeel(ip) {
  const nu = Date.now();
  const lijst = (recent.get(ip) || []).filter((t) => nu - t < 10 * 60 * 1000);
  lijst.push(nu);
  recent.set(ip, lijst);
  if (recent.size > 500) recent.clear();
  return lijst.length > 6;
}

function schoon(v, max) {
  return String(v == null ? "" : v)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}
function eenRegel(v, max) {
  return schoon(v, max).replace(/[\r\n]+/g, " ");
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "methode" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || typeof body !== "object") {
    return res.status(400).json({ ok: false, error: "ongeldig", velden: [] });
  }

  // Verborgen veld dat enkel robots invullen: doe alsof het lukt, verstuur niets.
  if (body.website) return res.status(200).json({ ok: true });

  const type = body.type === "aanvraag" ? "aanvraag" : "contact";
  const d = {
    naam: eenRegel(body.naam, MAX.naam),
    email: eenRegel(body.email, MAX.email),
    telefoon: eenRegel(body.telefoon, MAX.telefoon),
    bericht: schoon(body.bericht, MAX.bericht),
    product: eenRegel(body.product, MAX.product),
    ras: eenRegel(body.ras, MAX.ras),
    aantal: Number(body.aantal),
    keuzeLabel: eenRegel(body.keuzeLabel, 40),
    keuze: eenRegel(body.keuze, 80)
  };

  const velden = [];
  if (!d.naam) velden.push("naam");
  if (!EMAIL_RE.test(d.email)) velden.push("email");
  if (type === "aanvraag") {
    if (!d.product) velden.push("product");
    if (!d.ras) velden.push("ras");
    if (!(Number.isInteger(d.aantal) && d.aantal >= 1 && d.aantal <= 1000)) velden.push("aantal");
  } else if (d.bericht.length < 5) {
    velden.push("bericht");
  }
  if (velden.length) return res.status(400).json({ ok: false, error: "validatie", velden });

  const ip = String((req.headers && (req.headers["x-forwarded-for"] || "")) || "").split(",")[0].trim() || "onbekend";
  if (teVeel(ip)) return res.status(429).json({ ok: false, error: "te-veel" });

  const key = process.env.RESEND_API_KEY;
  const naar = String(process.env.MAIL_TO || "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!key || !naar.length) {
    console.error("aanvraag: RESEND_API_KEY of MAIL_TO ontbreekt in de Vercel-instellingen");
    return res.status(503).json({ ok: false, error: "niet-geconfigureerd" });
  }
  const van = process.env.MAIL_FROM || "Het Kippenkamp <onboarding@resend.dev>";

  let onderwerp;
  let tekst;
  if (type === "aanvraag") {
    onderwerp = "Aanvraag: " + d.ras + ", " + d.aantal + "x (" + d.product + ") van " + d.naam;
    tekst = [
      "Nieuwe aanvraag via de website",
      "",
      "Product: " + d.product,
      "Ras: " + d.ras,
      "Aantal: " + d.aantal,
      ...(d.keuze ? [(d.keuzeLabel || "Keuze") + ": " + d.keuze] : []),
      "",
      "Naam: " + d.naam,
      "E-mail: " + d.email,
      "Telefoon: " + (d.telefoon || "niet opgegeven"),
      "",
      "Bericht:",
      d.bericht || "(geen bericht)"
    ].join("\n");
  } else {
    onderwerp = "Bericht via de website van " + d.naam;
    tekst = [
      "Nieuw bericht via het contactformulier",
      "",
      "Naam: " + d.naam,
      "E-mail: " + d.email,
      "Telefoon: " + (d.telefoon || "niet opgegeven"),
      "",
      "Bericht:",
      d.bericht
    ].join("\n");
  }

  const stop = new AbortController();
  const timer = setTimeout(() => stop.abort(), 9000);
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({ from: van, to: naar, reply_to: d.email, subject: onderwerp, text: tekst }),
      signal: stop.signal
    });
    if (!r.ok) {
      const uitleg = await r.text().catch(() => "");
      console.error("aanvraag: Resend gaf status " + r.status + " " + uitleg.slice(0, 300));
      return res.status(502).json({ ok: false, error: "verzenden-mislukt" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("aanvraag: verzenden mislukt", e && e.message);
    return res.status(502).json({ ok: false, error: "verzenden-mislukt" });
  } finally {
    clearTimeout(timer);
  }
};
