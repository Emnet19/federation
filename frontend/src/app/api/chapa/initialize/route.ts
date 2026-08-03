import {
  initializeChapaTransaction,
  isChapaConfigured,
  normalizeEthiopianPhone,
  splitFullName,
} from "@/lib/chapa";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: {
    amount?: number | string;
    email?: string;
    full_name?: string;
    phone?: string;
    tx_ref?: string;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ status: "failed", message: "Invalid JSON body." }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isFinite(amount) || amount <= 0 || amount > 100000) {
    return Response.json({ status: "failed", message: "A valid registration fee is required." }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email || !email.includes("@")) {
    return Response.json({ status: "failed", message: "A valid email address is required." }, { status: 400 });
  }

  const fullName = body.full_name?.trim() ?? "";
  const phone = normalizeEthiopianPhone(body.phone ?? "");
  const txRef =
    body.tx_ref?.trim() ||
    `EAF-ATH-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const origin = new URL(request.url).origin;
  const returnUrl = `${origin}/athlete/register?tx_ref=${encodeURIComponent(txRef)}`;
  const callbackUrl = `${origin}/api/chapa/callback`;

  if (!isChapaConfigured()) {
    return Response.json({
      status: "success",
      message: "Demo checkout generated (no CHAPA_SECRET_KEY configured).",
      demo: true,
      data: {
        checkout_url: `${origin}/athlete/register/demo-checkout?tx_ref=${encodeURIComponent(txRef)}`,
      },
    });
  }

  try {
    const { first_name, last_name } = splitFullName(fullName);
    const result = await initializeChapaTransaction({
      amount: amount.toFixed(2),
      currency: "ETB",
      email,
      first_name,
      last_name,
      phone_number: phone,
      tx_ref: txRef,
      callback_url: callbackUrl,
      return_url: returnUrl,
      customization: {
        title: "Ethiopian Athletics Federation",
        description: `Athlete registration fee (ETB ${amount})`,
      },
      meta: {
        payment_reason: "Athlete Registration Fee",
      },
    });

    return Response.json({
      status: "success",
      message: result.message,
      data: { checkout_url: result.data.checkout_url },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to initialize payment.";
    return Response.json({ status: "failed", message }, { status: 502 });
  }
}
