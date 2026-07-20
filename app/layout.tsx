import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./i18n";

export const metadata: Metadata = {
  title: "Ruichi Li — Level Designer",
  description: "A level design portfolio by Ruichi Li.",
  openGraph: {
    title: "Ruichi Li — Level Designer",
    description: "Spaces that teach, routes that matter.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="stylesheet" href="/styles.css?v=20260715-17" /></head><body><LanguageProvider>{children}</LanguageProvider></body></html>;
}
