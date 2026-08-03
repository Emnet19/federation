import { isChapaConfigured, verifyChapaTransaction } from "@/lib/chapa";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txRef = searchParams.get("trx_ref") ?? searchParams.get("tx_ref");

  if (isChapaConfigured() && txRef) {
    try {
      await verifyChapaTransaction(txRef);
    } catch {
      // Best-effort verification; the browser return flow re-verifies.
    }
  }

  return Response.json({ status: "success", message: "Callback received." });
}
