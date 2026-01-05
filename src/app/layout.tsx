import type { Metadata } from "next";
// Google Fonts'tan Inter fontunu çekiyoruz. Profesyonel görünür.
import { Inter } from "next/font/google";
import "./globals.css";

// Bileşenlerimizi import ediyoruz
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Font ayarı
const inter = Inter({ subsets: ["latin"] });

// SEO Metadata Ayarları
export const metadata: Metadata = {
  title: "MapivA | Seyahatlerini Görselleştir",
  description: "Türkiye'de gezdiğin yerleri haritada işaretle, notlarını al.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50`}>
        {/* Navbar her sayfada en üstte olacak */}
        <Navbar />
        
        {/* Değişen içerik (Page) burada render olacak */}
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Footer her sayfada en altta olacak */}
        <Footer />
      </body>
    </html>
  );
}