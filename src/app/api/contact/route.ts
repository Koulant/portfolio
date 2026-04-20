import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

type ContactPayload = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX_LENGTH = 4000;
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(1, "24 h"),
  prefix: "contact",
});

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "anonymous";
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!resendApiKey || !toEmail) {
    return NextResponse.json(
      { error: "Contact form is not configured on the server." },
      { status: 500 }
    );
  }

  const ip = getClientIp(request);
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "You've already sent a message today. Please try again tomorrow." },
      { status: 429 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }

  const firstName = asTrimmedString(payload.firstName);
  const lastName = asTrimmedString(payload.lastName);
  const email = asTrimmedString(payload.email);
  const message = asTrimmedString(payload.message);
  const honeypot = asTrimmedString(payload.company);

  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!firstName || firstName.length > NAME_MAX_LENGTH) {
    return NextResponse.json({ error: "First name is invalid." }, { status: 400 });
  }

  if (!lastName || lastName.length > NAME_MAX_LENGTH) {
    return NextResponse.json({ error: "Last name is invalid." }, { status: 400 });
  }

  if (!email || email.length > EMAIL_MAX_LENGTH || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "Email is invalid." }, { status: 400 });
  }

  if (!message || message.length > MESSAGE_MAX_LENGTH) {
    return NextResponse.json({ error: "Message is invalid." }, { status: 400 });
  }

  const senderName = `${firstName} ${lastName}`.trim();
  const subject = `Portfolio contact from ${senderName}`;
  const text = `From: ${senderName}\nEmail: ${email}\n\n${message}`;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend error:", await resendResponse.json());
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
