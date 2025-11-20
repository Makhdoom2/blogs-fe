import colors from "./colors";

const lightTheme = {
  name: "light-aurora",

  colors: {
    background: colors.neutral[50],
    card: colors.neutral[0],
    text: colors.neutral[900],
    textSecondary: colors.neutral[500],

    border: colors.neutral[200],

    primary: colors.aurora.indigo,
    primaryGlow: colors.aurora.glow,
    secondary: colors.aurora.cyan,

    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,

    gradient: colors.gradients.aurora,
  },

  shadows: {
    soft: "0 4px 12px rgba(0,0,0,.06)",
    medium: "0 8px 20px rgba(0,0,0,.10)",
    glow: "0 0 22px rgba(139, 92, 246, .25)",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "18px",
    pill: "100px",
  },
};

export default lightTheme;
