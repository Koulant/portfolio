import "./globals.css";

import type { Metadata } from "next";
import { Toaster } from "sonner";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://koulant.com"),
  title: {
    default: "Anton Koulikov",
    template: "%s | Anton Koulikov",
  },
  description:
    "Software engineer focused on building reliable backend systems and practical full-stack software.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Anton Koulikov",
    description:
      "Software engineer focused on building reliable backend systems and practical full-stack software.",
    url: "https://koulant.com",
    siteName: "Anton Koulikov",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anton Koulikov",
    description:
      "Software engineer focused on building reliable backend systems and practical full-stack software.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
              {children}
            </main>
            <SiteFooter />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
