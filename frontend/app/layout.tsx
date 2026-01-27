import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Symbols_2 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
});

const notoSymbols = Noto_Sans_Symbols_2({
  variable: "--font-noto-symbols",
  weight: ["400"],
  subsets: ["symbols"],
});

export const metadata: Metadata = {
  title: "Retrograde Terminal",
  description: "Retro-futuristic terminal interface for time travel queries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${notoSymbols.variable} antialiased bg-retro-bg text-retro-text font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
