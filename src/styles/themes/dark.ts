import colors from "./colors";

const darkTheme = {
  name: "dark-aurora",

  colors: {
    background: colors.neutral[1000],
    card: colors.neutral[900],
    text: colors.neutral[100],
    textSecondary: colors.neutral[400],

    border: colors.neutral[700],

    primary: colors.aurora.purple,
    primaryGlow: "rgba(139,92,246,.45)",
    secondary: colors.aurora.teal,

    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,

    gradient: colors.gradients.aurora,
  },

  shadows: {
    soft: "0 4px 20px rgba(0,0,0,.45)",
    medium: "0 8px 30px rgba(0,0,0,.55)",
    glow: "0 0 30px rgba(139,92,246,.5)",
  },

  radius: {
    sm: "8px",
    md: "12px",
    lg: "18px",
    pill: "100px",
  },
};

export default darkTheme;
