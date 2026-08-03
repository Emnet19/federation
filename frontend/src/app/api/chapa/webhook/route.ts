import { isChapaConfigured, verifyChapaTransaction } from "@/lib/chapa";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const txRef = body?.trx_ref ?? body?.tx_ref;

  if (isChapaConfigured() && typeof txRef === "string" && txRef) {
    try {
      const result = await verifyChapaTransaction(txRef);
      const verified = result.data?.status?.toLowerCase() === "success";
      if (verified) {
        // In a full deployment the successful payment would be persisted here
        // (e.g. marking the athlete registration as paid) before fulfillment.
      }
    } catch {
      // Acknowledge the event regardless so Chapa stops retrying.
    }
  }

  return Response.json({ status: "success", message: "Webhook received." });
}
