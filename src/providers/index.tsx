"use client";

import { Toaster } from "react-hot-toast";
import ReactQueryProvider from "./reactQueryProvider";
import ReduxProvider from "./reduxProvider";
import ThemeProvider from "./themeProvider";
import SessionManager from "./sessionManager";
import { useAuthInitializer } from "./useAuthInitializer";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <AuthInitializerWrapper>
        <Toaster />
        <ReactQueryProvider>
          <ThemeProvider>
            <SessionManager>{children}</SessionManager>
          </ThemeProvider>
        </ReactQueryProvider>
      </AuthInitializerWrapper>
    </ReduxProvider>
  );
}

function AuthInitializerWrapper({ children }: { children: React.ReactNode }) {
  useAuthInitializer();
  return <>{children}</>;
}
