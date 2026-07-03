import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mailcraft.ai"),
  title: "MailCraft AI — Write professional emails in seconds",
  description:
    "Generate clear, professional, and personalized emails for work, school, or business in just a few clicks.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "MailCraft AI — Write professional emails in seconds",
    description:
      "Generate clear, professional, and personalized emails for work, school, or business in just a few clicks.",
    type: "website",
    siteName: "MailCraft AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "MailCraft AI — Write professional emails in seconds",
    description:
      "Generate clear, professional, and personalized emails for work, school, or business in just a few clicks.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} ${mono.variable} font-body`}>
        <ThemeProvider>
          <ToastProvider>
            {children}
            <Toaster />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
