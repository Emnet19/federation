import {
  Smartphone,
  Wallet,
  Landmark,
  Building2,
  CreditCard,
  Banknote,
  type LucideIcon,
} from "lucide-react";

export interface PaymentMethod {
  id: string;
  name: string;
  type: "mobile-money" | "bank" | "card";
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "telebirr",
    name: "Telebirr",
    type: "mobile-money",
    description: "Ethio Telecom mobile money",
    icon: Smartphone,
    color: "#7C3AED",
    bg: "rgba(124,58,237,0.10)",
    border: "rgba(124,58,237,0.35)",
  },
  {
    id: "cbebirr",
    name: "CBE Birr",
    type: "mobile-money",
    description: "Commercial Bank of Ethiopia",
    icon: Wallet,
    color: "#16A34A",
    bg: "rgba(22,163,74,0.10)",
    border: "rgba(22,163,74,0.35)",
  },
  {
    id: "amole",
    name: "Amole",
    type: "mobile-money",
    description: "Bank of Abyssinia wallet",
    icon: Banknote,
    color: "#2563EB",
    bg: "rgba(37,99,235,0.10)",
    border: "rgba(37,99,235,0.35)",
  },
  {
    id: "awash",
    name: "Awash Bank",
    type: "bank",
    description: "Bank transfer & card",
    icon: Landmark,
    color: "#DC2626",
    bg: "rgba(220,38,38,0.10)",
    border: "rgba(220,38,38,0.35)",
  },
  {
    id: "dashen",
    name: "Dashen Bank",
    type: "bank",
    description: "Bank transfer & card",
    icon: Building2,
    color: "#0D9488",
    bg: "rgba(13,148,136,0.10)",
    border: "rgba(13,148,136,0.35)",
  },
  {
    id: "card",
    name: "Credit / Debit Card",
    type: "card",
    description: "Visa, Mastercard & others",
    icon: CreditCard,
    color: "#6366F1",
    bg: "rgba(99,102,241,0.10)",
    border: "rgba(99,102,241,0.35)",
  },
];

export function formatEthiopianBirr(amount: number): string {
  return `ETB ${amount.toLocaleString("en-US")}`;
}
