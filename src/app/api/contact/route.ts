import nodemailer from "nodemailer";

export const runtime = "nodejs"; 

type Payload = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  website?: string; 
};

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function sanitizeText(s: string) {
  return (s || "").toString().replace(/\r/g, "").trim();
}


const globalForRateLimit = globalThis as unknown as {
  __sn_contact_rl?: Map<string, { count: number; resetAt: number }>;
};

const rlStore =
  globalForRateLimit.__sn_contact_rl ??
  (globalForRateLimit.__sn_contact_rl = new Map());

function rateLimit(ip: string, perMinute: number) {
  const now = Date.now();
  const key = ip || "unknown";
  const item = rlStore.get(key);

  if (!item || now > item.resetAt) {
    rlStore.set(key, { count: 1, resetAt: now + 60_000 });
    return { ok: true };
  }

  if (item.count >= perMinute) return { ok: false };

  item.count += 1;
  rlStore.set(key, item);
  return { ok: true };
}

function getClientIp(req: Request) {
 
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "";
  const realIp = req.headers.get("x-real-ip");
  return realIp || "";
}

function originAllowed(req: Request) {
  const allowed = (process.env.CONTACT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);


  if (allowed.length === 0) return true;

  const origin = req.headers.get("origin") || "";
  return allowed.includes(origin);
}

export async function POST(req: Request) {
  try {
    if (!originAllowed(req)) {
      return Response.json({ ok: false, error: "Origin not allowed" }, { status: 403 });
    }

    const perMin = Number(process.env.CONTACT_RATE_LIMIT_PER_MINUTE || "5");
    const ip = getClientIp(req);
    const rl = rateLimit(ip, Number.isFinite(perMin) ? perMin : 5);
    if (!rl.ok) {
      return Response.json({ ok: false, error: "Too many requests" }, { status: 429 });
    }

    const body = (await req.json()) as Payload;

  
    if (body.website && body.website.trim().length > 0) {
      return Response.json({ ok: true }, { status: 200 });
    }

    const name = sanitizeText(body.name);
    const email = sanitizeText(body.email);
    const phone = sanitizeText(body.phone || "");
    const service = sanitizeText(body.service || "");
    const message = sanitizeText(body.message);

    if (name.length < 2) {
      return Response.json({ ok: false, error: "Nome inválido" }, { status: 400 });
    }
    if (!isEmail(email)) {
      return Response.json({ ok: false, error: "Email inválido" }, { status: 400 });
    }
    if (message.length < 10) {
      return Response.json({ ok: false, error: "Mensagem muito curta" }, { status: 400 });
    }

    const SMTP_HOST = env("SMTP_HOST");
    const SMTP_PORT = Number(env("SMTP_PORT"));
    const SMTP_SECURE = (process.env.SMTP_SECURE || "false") === "true";
    const SMTP_USER = env("SMTP_USER");
    const SMTP_PASS = env("SMTP_PASS");

    const MAIL_FROM = env("MAIL_FROM");
    const MAIL_TO = env("MAIL_TO");

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE, 
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.verify();

    const subject = service
      ? `Contato do site — ${service} — ${name}`
      : `Contato do site — ${name}`;

    const text = [
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `WhatsApp/Telefone: ${phone}` : null,
      service ? `Serviço: ${service}` : null,
      "",
      "Mensagem:",
      message,
      "",
      `Enviado pelo formulário do site.`,
    ]
      .filter(Boolean)
      .join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
        <h2 style="margin:0 0 12px">Novo contato pelo site</h2>
        <div style="padding:12px;border:1px solid #eee;border-radius:12px;background:#fafafa">
          <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${phone ? `<p><strong>WhatsApp/Telefone:</strong> ${escapeHtml(phone)}</p>` : ""}
          ${service ? `<p><strong>Serviço:</strong> ${escapeHtml(service)}</p>` : ""}
          <hr style="border:none;border-top:1px solid #eee;margin:12px 0" />
          <p style="white-space:pre-wrap;margin:0"><strong>Mensagem:</strong><br/>${escapeHtml(
            message
          )}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email, 
      subject,
      text,
      html,
    });

    return Response.json({ ok: true }, { status: 200 });
  } catch (err: any) {

    console.error("[CONTACT_API_ERROR]", err?.message || err);
    return Response.json(
      { ok: false, error: "Falha ao enviar. Tente novamente." },
      { status: 500 }
    );
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
