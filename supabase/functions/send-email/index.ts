// Supabase Edge Function: send-email
//
// Sends transactional notification emails via Resend.
// Deploy: supabase functions deploy send-email
// Secrets: supabase secrets set RESEND_API_KEY=... EMAIL_FROM=... EMAIL_TO=...
//
// This function is invoked server-side only (from Next.js server actions),
// so the API key is never exposed to the browser.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

interface EmailPayload {
  subject: string;
  html: string;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("EMAIL_FROM") ?? "Landscape Solution PLC <no-reply@example.com>";
  const to = Deno.env.get("EMAIL_TO") ?? "info@example.com";

  if (!apiKey) {
    return Response.json({ error: "Email provider not configured" }, { status: 500 });
  }

  let payload: EmailPayload;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload?.subject || !payload?.html) {
    return Response.json({ error: "subject and html are required" }, { status: 400 });
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `[Website] ${payload.subject}`.slice(0, 200),
      html: wrapTemplate(payload.subject, payload.html)
    })
  });

  if (!res.ok) {
    console.error("resend error", await res.text());
    return Response.json({ error: "Failed to send email" }, { status: 502 });
  }

  return Response.json({ ok: true });
});

function wrapTemplate(title: string, bodyHtml: string): string {
  return `<html><body style="font-family:sans-serif;color:#1e3a23">
    <h2 style="color:#357039">${title.replace(/[<>&]/g, "")}</h2>
    ${bodyHtml}
    <hr style="margin-top:24px;border:none;border-top:1px solid #e0efe0" />
    <small>Sent from the Landscape Solution PLC website</small>
  </body></html>`;
}
