/**
 * EACRMS Global Color Palette
 * ────────────────────────────
 * Central color design tokens for the Ethiopian Athletics Competition & Roster Management System.
 * Import example:
 *   import { colors } from "@/constants/colors";
 *   style={{ color: colors.brand.primary }}
 */

export const colors = {
  // Brand Colors
  brand: {
    primary: "#0140A7",
    primaryDark: "#0A4870",
    primaryLight: "#DCEBF6",

    secondary: "#E6A500",
    secondaryDark: "#C98F00",
    secondaryLight: "#FFF3CC",
  },

  // Background Colors
  background: {
    default: "#F7F8FA",
    surface: "#FFFFFF",
    surfaceVariant: "#F1F3F5",
  },

  // Text Colors
  text: {
    primary: "#1D1D1F",
    secondary: "#555B63",
    tertiary: "#8B9098",
    onPrimary: "#FFFFFF",
    onSecondary: "#FFFFFF",
  },

  // Border Colors
  border: {
    default: "#D9DEE5",
  },

  // Status Colors
  status: {
    success: "#2E7D32",
    warning: "#F59E0B",
    error: "#D32F2F",
    info: "#0288D1",
  },

  // Flat aliases for quick access
  primary: "#0140A7",
  primaryDark: "#0A4870",
  primaryLight: "#DCEBF6",

  secondary: "#E6A500",
  secondaryDark: "#C98F00",
  secondaryLight: "#FFF3CC",

  accent: "#E6A500",
  accentDark: "#C98F00",
  accentLight: "#FFF3CC",

  bgPage: "#F7F8FA",
  bgSurface: "#FFFFFF",
  bgSurfaceVariant: "#F1F3F5",

  textPrimary: "#1D1D1F",
  textSecondary: "#555B63",
  textTertiary: "#8B9098",
  textMuted: "#8B9098",
  textOnPrimary: "#FFFFFF",
  textOnSecondary: "#FFFFFF",

  borderDefault: "#D9DEE5",
  borderStr: "#D9DEE5",

  success: "#2E7D32",
  warning: "#F59E0B",
  error: "#D32F2F",
  info: "#0288D1",

  // Opacity helpers
  primaryAlpha07: "rgba(1,64,167,0.07)",
  primaryAlpha20: "rgba(1,64,167,0.20)",
  secondaryAlpha07: "rgba(230,165,0,0.07)",
  secondaryAlpha25: "rgba(230,165,0,0.25)",
  accentAlpha07: "rgba(230,165,0,0.07)",
  accentAlpha25: "rgba(230,165,0,0.25)",
} as const;

export type Colors = typeof colors;
