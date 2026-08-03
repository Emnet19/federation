const CHAPA_BASE_URL = "https://api.chapa.co/v1";

export const CHAPA_SECRET_KEY_ENV = "CHAPA_SECRET_KEY";

export interface ChapaInitializeParams {
  amount: string;
  currency?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  tx_ref: string;
  callback_url: string;
  return_url: string;
  customization?: {
    title?: string;
    description?: string;
  };
  meta?: Record<string, unknown>;
}

export interface ChapaVerifyData {
  status?: string;
  currency?: string;
  amount?: number;
  reference?: string;
  tx_ref?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone_number?: string;
  created_at?: string;
}

export interface ChapaResponse<T = unknown> {
  message: string;
  status: "success" | "failed" | string;
  data: T;
}

export function getChapaSecretKey(): string | undefined {
  return process.env[CHAPA_SECRET_KEY_ENV];
}

export function isChapaConfigured(): boolean {
  return Boolean(getChapaSecretKey());
}

export function normalizeEthiopianPhone(input: string): string | undefined {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("251")) digits = digits.slice(3);
  if (digits.length === 9) digits = `0${digits}`;
  return /^0[79]\d{8}$/.test(digits) ? digits : undefined;
}

export function splitFullName(fullName: string): {
  first_name: string;
  last_name: string;
} {
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts[0] ?? "";
  const last_name = parts.slice(1).join(" ") || first_name;
  return { first_name, last_name };
}

export async function initializeChapaTransaction(
  params: ChapaInitializeParams
): Promise<ChapaResponse<{ checkout_url: string }>> {
  const secretKey = getChapaSecretKey();
  if (!secretKey) {
    throw new Error(`${CHAPA_SECRET_KEY_ENV} is not configured`);
  }

  const res = await fetch(`${CHAPA_BASE_URL}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: params.amount,
      currency: params.currency ?? "ETB",
      email: params.email,
      first_name: params.first_name,
      last_name: params.last_name,
      phone_number: params.phone_number,
      tx_ref: params.tx_ref,
      callback_url: params.callback_url,
      return_url: params.return_url,
      customization: params.customization,
      meta: params.meta,
    }),
  });

  const json = (await res.json().catch(() => ({}))) as ChapaResponse<{
    checkout_url: string;
  }>;
  if (!res.ok) {
    throw new Error(json.message || `Chapa initialize failed with status ${res.status}`);
  }
  return json;
}

export async function verifyChapaTransaction(
  txRef: string
): Promise<ChapaResponse<ChapaVerifyData>> {
  const secretKey = getChapaSecretKey();
  if (!secretKey) {
    throw new Error(`${CHAPA_SECRET_KEY_ENV} is not configured`);
  }

  const res = await fetch(`${CHAPA_BASE_URL}/transaction/verify/${encodeURIComponent(txRef)}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
    cache: "no-store",
  });

  const json = (await res.json().catch(() => ({}))) as ChapaResponse<ChapaVerifyData>;
  if (!res.ok) {
    throw new Error(json.message || `Chapa verification failed with status ${res.status}`);
  }
  return json;
}
