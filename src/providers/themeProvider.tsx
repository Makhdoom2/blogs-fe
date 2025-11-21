// "use client";

// import { useEffect } from "react";
// import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
// import { getTheme } from "@/styles/themes";

// export default function ThemeProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <NextThemesProvider
//       defaultTheme="system"
//       attribute="class"
//       enableSystem
//       storageKey="aurora-theme"
//       disableTransitionOnChange
//     >
//       <ThemeApplier />
//       {children}
//     </NextThemesProvider>
//   );
// }

// // This component applies your custom theme colors into CSS variables
// function ThemeApplier() {
//   const { theme } = useTheme();

//   useEffect(() => {
//     if (!theme) return;

//     const selected = getTheme(theme as any);

//     if (!selected) return;

//     // Apply CSS variables
//     const root = document.documentElement;

//     Object.entries(selected.colors).forEach(([key, value]) => {
//       root.style.setProperty(`--color-${key}`, value as string);
//     });

//     Object.entries(selected.shadows).forEach(([key, value]) => {
//       root.style.setProperty(`--shadow-${key}`, value as string);
//     });

//     Object.entries(selected.radius).forEach(([key, value]) => {
//       root.style.setProperty(`--radius-${key}`, value as string);
//     });

//     // Save theme manually
//     localStorage.setItem("aurora-theme", theme);
//   }, [theme]);

//   return null;
// }

"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="data-theme" // sets `data-theme="light"` or `"dark"` on html
      defaultTheme="system"
      enableSystem
      storageKey="aurora-theme"
      disableTransitionOnChange // prevents flicker from transition on first render
    >
      {children}
    </NextThemesProvider>
  );
}
