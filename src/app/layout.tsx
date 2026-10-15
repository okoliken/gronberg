import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cursor } from "@/components/layout/cursor";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

// Preloaded, self-hosted, with a metric-matched fallback so the swap doesn't shift layout
const clash = localFont({
  src: "../fonts/ClashDisplay-Regular.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-clash",
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "Jacob Grønberg — Photographer & Visual Artist",
  description: "Portfolio of Jacob Grønberg, photographer and visual artist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={clash.variable}>
      <body>
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
          <Cursor />
        </SmoothScroll>
      </body>
    </html>
  );
}
