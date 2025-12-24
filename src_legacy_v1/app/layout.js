import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/providers/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "block",
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "block",
});

export const metadata = {
  title: "Hazem Gamal | Product Design Engineer",
  description: "Bridging the gap between aesthetic intuition and engineering precision.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${ibmPlexArabic.variable}`}>
        <LanguageProvider>
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
