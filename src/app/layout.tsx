import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageTransition from "@/components/layout/PageTransition";
import CustomCursor from "@/components/layout/CustomCursor";
import Preloader from "@/components/layout/Preloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Flash Studio | Photographie de Luxe",
  description: "L'art de capturer vos plus beaux moments. Photographie de mariage, portrait, mode et famille par Flash Studio.",
  openGraph: {
    title: "Flash Studio | Photographie de Luxe",
    description: "Photographie de mariage, portrait, mode et famille.",
    url: "https://flashstudio.com",
    siteName: "Flash Studio",
    images: [
      {
        url: "/images/3049.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flash Studio | Photographie de Luxe",
    description: "Photographie de mariage, portrait, mode et famille.",
    images: ["/images/3049.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "PhotographyBusiness",
  "name": "Flash Studio",
  "image": "https://flashstudio.com/images/3049.jpg",
  "description": "Photographie de mariage, portrait, mode et famille de luxe.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Centre Ville",
    "addressLocality": "Paris",
    "postalCode": "75001",
    "addressCountry": "FR"
  },
  "telephone": "22 255 400",
  "url": "https://flashstudio.com"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="lenis">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} antialiased bg-background text-foreground`}>
        <div className="noise-overlay"></div>
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <Navigation />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
