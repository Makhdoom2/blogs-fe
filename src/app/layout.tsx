import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@styles/globals.css";
import Providers from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notena",
  description: "Blog management system",

  icons: {
    icon: "/favicon.svg?v=2",
  },

  openGraph: {
    title: "Notena",
    description: "Demo Blog management system",
    url: "https://blogs-fe.vercel.app/home",
    siteName: "Notena",
    images: [
      {
        url: "/cover.svg",
        width: 1200,
        height: 630,
        alt: "Notena Cover",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Notena",
    description: "Blog management system",
    images: ["/cover.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
