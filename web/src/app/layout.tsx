import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/instrument-serif/latin-400.css";
import "@fontsource/instrument-serif/latin-400-italic.css";
import "./globals.css";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: `${brand.name} — Rights-based evaluation of language models`,
  description: "A research summary of Vigil AI: adapting COMPL-AI to Brazil’s PL 2338/2023, auditing measurement validity, and reporting corrected results and limitations.",
  // Keep the local research preview out of search indexes until publication.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
