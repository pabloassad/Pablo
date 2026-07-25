import type { NextRequest } from "next/server";

// Contact form submissions are emailed to the site owner via Resend.
// The request comes from our own frontend (same origin), so there are no
// CORS / preflight issues — unlike third-party form widgets.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OWNER_EMAIL = "pabloassad14@gmail.com";

export async function POST(request: NextRequest) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !message || !EMAIL_REGEX.test(email)) {
    return Response.json({ error: "invalid_fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return Response.json({ error: "not_configured" }, { status: 500 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Resend's shared sender works without domain verification and can
      // deliver to the account owner's own address. Swap for an address on a
      // verified domain later if desired.
      from: "Site DJ Pablito <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      reply_to: email,
      subject: `Nouveau message du site — ${name}`,
      text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("Resend send failed", res.status, detail);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
