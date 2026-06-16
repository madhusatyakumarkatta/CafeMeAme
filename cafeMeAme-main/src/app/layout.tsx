import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Bebas_Neue, Great_Vibes } from "next/font/google";
import "./globals.css";
import "./truus-footer.css";
import CursorBubble from "@/components/CursorBubble";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Cafe MeAme | Premium Artisanal Baking & Specialty Coffee",
  description: "Experience the ultimate culinary journey at Cafe MeAme in Raipur. Savor our luxury artisanal cakes, custom pastries, gourmet pastas, Vada Pav, and premium coffee blends in an elegant, modern ambiance.",
  keywords: "MeAme Bakery, MeAme Cafe Raipur, Raipur Cafe, Luxury Cakes Raipur, Artisanal Bakery Raipur, Specialty Coffee Raipur, Shankar Nagar, Saddu, Mowa",
  authors: [{ name: "MeAme Culinary Team" }],
  openGraph: {
    title: "Cafe MeAme | Premium Artisanal Baking & Specialty Coffee",
    description: "Indulge in a premium cinematic dining experience with custom cakes, freshly brewed coffee, and signature dishes in Raipur.",
    url: "https://meamecafe.com",
    siteName: "Cafe MeAme",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cafe MeAme",
    description: "Premium artisanal pastries and specialty coffee at Saddu Mowa, Raipur.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${bebasNeue.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <CursorBubble />
        {children}
      </body>
    </html>
  );
}
