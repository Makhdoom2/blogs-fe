"use client";

import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./reactQueryProvider";
import ReduxProvider from "./reduxProvider";
import ThemeProvider from "./themeProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <Toaster />
      <ReactQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  );
}
