export const Theme = {
  // Using hex values with CSS variable fallbacks
  // The styled-components will use these, but globals.css overrides body/html

  // Primary Colors
  primary: "#DA7756",
  primaryHover: "#C15F3C",
  primaryLight: "#E89876",
  primarySoft: "#F4F3EE",
  primaryText: "#B85D3D",

  // Accent Colors
  accent: "#1C6BBB",
  accentLight: "#3B82C4",
  accentSoft: "#E6F2FF",

  // Background Colors - use CSS variables for these key ones
  background: "var(--background, #FAF9F5)",
  backgroundDark: "var(--background-dark, #F8F7F4)",
  backgroundLight: "var(--background-light, #FFFFFF)",
  surface: "var(--surface, #F8F7F4)",
  surfaceHover: "var(--surface-hover, #F2F1ED)",

  // Border Colors
  border: "var(--border, #E5E3DE)",
  borderLight: "var(--border-light, #F0EFEB)",
  borderDark: "#D1CFC8",

  // Text Colors
  textPrimary: "var(--foreground, #000000)",
  textSecondary: "var(--foreground-secondary, #444444)",
  textMuted: "var(--foreground-muted, #666666)",
  textInverse: "#FFFFFF",

  // Cloudy Grays
  cloudy: "#B1ADA1",
  cloudyLight: "#C7C3B8",
  cloudyDark: "#9B9791",

  // Status Colors
  connected: "#10B981",
  disconnected: "#EF4444",
  warning: "#F59E0B",
  info: "#1C6BBB",

  // Interactive Elements
  buttonPrimary: "#DA7756",
  buttonSecondary: "#1C6BBB",
  buttonTertiary: "#B1ADA1",

  // Form Elements
  inputBackground: "var(--background-light, #FFFFFF)",
  inputBorder: "var(--border, #E5E3DE)",
  inputFocus: "#DA7756",

  // Shadows
  shadow: "rgba(31, 30, 29, 0.1)",
  shadowMedium: "rgba(31, 30, 29, 0.15)",
  shadowHeavy: "rgba(31, 30, 29, 0.25)",
  glow: "rgba(218, 119, 86, 0.2)",
  glowBlue: "rgba(28, 107, 187, 0.15)",

  // Gradients
  gradient: "linear-gradient(135deg, #DA7756 0%, #1C6BBB 100%)",
  gradientOrange: "linear-gradient(135deg, #DA7756 0%, #f97316 100%)",
  gradientBlue: "linear-gradient(135deg, #1C6BBB 0%, #3B82C4 100%)",

  // Legacy mappings
  white: "#FFFFFF",
  black: "#1F1E1D",
  interface: "var(--surface, #F8F7F4)",
  logo: "var(--foreground, #1F1E1D)",
  secondary: "#C15F3C",
  tertiary: "#1C6BBB",
};
