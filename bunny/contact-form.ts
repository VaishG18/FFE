// Bunny Edge Script (standalone, its own pull zone): the website's contact form posts here
// and the enquiry is emailed through ZeptoMail. Kept off the site's own pull zone because
// Bunny middleware doesn't run on storage-backed (Bunny Sites) zones.
// Deploy: see bunny/README.md. Env: ZEPTOMAIL_TOKEN (secret), CONTACT_TO, MAIL_FROM, ALLOWED_ORIGINS.
import * as BunnySDK from "npm:@bunny.net/edgescript-sdk@0.12.1";
import process from "node:process";

const FIELDS: [string, string][] = [
  ["firstName", "First name"],
  ["lastName", "Last name"],
  ["email", "Email"],
  ["phone", "Phone"],
  ["jobTitle", "Job title"],
  ["company", "Company"],
  ["country", "Country"],
  ["message", "Message"],
  ["marketingConsent", "Marketing consent"],
];

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function contact(request: Request, json: (status: number, body: object) => Response): Promise<Response> {
  if (request.method !== "POST") return json(405, { ok: false });
  const form = await request.formData().catch(() => null);
  if (!form) return json(400, { ok: false });
  const get = (k: string) => String(form.get(k) ?? "").trim().slice(0, 5000);

  // Honeypot: real visitors never see or fill `website`; pretend success to bots.
  if (get("website")) return json(200, { ok: true });

  const email = get("email");
  if (!get("firstName") || !get("message") || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(422, { ok: false });

  const values: Record<string, string> = { ...Object.fromEntries(FIELDS.map(([k]) => [k, get(k)])), phone: `${get("dialCode")} ${get("phone")}`.trim() };
  values.marketingConsent = form.has("marketingConsent") ? "Yes" : "No";
  const name = `${values.firstName} ${values.lastName}`.trim();
  const rows = FIELDS.map(([k, label]) => `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${label}</td><td style="padding:4px 0;white-space:pre-wrap">${esc(values[k])}</td></tr>`).join("");

  const res = await fetch("https://api.zeptomail.com/v1.1/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: `Zoho-enczapikey ${process.env.ZEPTOMAIL_TOKEN}` },
    body: JSON.stringify({
      from: { address: process.env.MAIL_FROM, name: "Fresh Food Expo APAC" },
      to: String(process.env.CONTACT_TO).split(",").map((address) => ({ email_address: { address: address.trim() } })),
      reply_to: [{ address: email, name }],
      subject: `Website enquiry: ${name}${values.company ? `, ${values.company}` : ""}`,
      htmlbody: `<table style="font:14px/1.5 sans-serif">${rows}</table>`,
    }),
  });
  if (!res.ok) console.error("ZeptoMail", res.status, await res.text());
  return json(res.ok ? 200 : 502, { ok: res.ok });
}

BunnySDK.net.http.serve(async (request) => {
  // A FormData POST is a CORS "simple request": no preflight, the browser only needs this header back.
  const origin = request.headers.get("origin") ?? "";
  const allowed = String(process.env.ALLOWED_ORIGINS).split(",").map((o) => o.trim()).includes(origin);
  const json = (status: number, body: object) =>
    Response.json(body, { status, headers: allowed ? { "Access-Control-Allow-Origin": origin, Vary: "Origin", "Cache-Control": "no-store" } : { "Cache-Control": "no-store" } });
  if (!allowed) return json(403, { ok: false });
  return contact(request, json);
});
