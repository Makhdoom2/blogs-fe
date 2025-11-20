"use client";

import ReactQueryProvider from "./reactQueryProvider";
import ReduxProvider from "./reduxProvider";
import ThemeProvider from "./themeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
