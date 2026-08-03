import { isChapaConfigured, verifyChapaTransaction } from "@/lib/chapa";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txRef = searchParams.get("tx_ref")?.trim();

  if (!txRef) {
    return Response.json({ status: "failed", message: "tx_ref is required." }, { status: 400 });
  }

  if (!isChapaConfigured()) {
    return Response.json({
      status: "success",
      verified: true,
      demo: true,
      message: "Demo mode: no CHAPA_SECRET_KEY configured, payment treated as successful.",
    });
  }

  try {
    const result = await verifyChapaTransaction(txRef);
    const txStatus = result.data?.status?.toLowerCase();
    const verified = txStatus === "success";

    return Response.json({
      status: verified ? "success" : "pending",
      verified,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to verify payment.";
    return Response.json({ status: "failed", verified: false, message }, { status: 502 });
  }
}
