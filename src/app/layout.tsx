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

// Runs before any bundle: on slow or data-saving connections (or reduced motion) the intro is
// skipped with CSS, so the hero paints straight from the server HTML instead of waiting for React.
// "Slow" is judged by measured bandwidth, not effectiveType: Chrome labels high-latency but fast
// links as "3g", which would hide the loader for many real visitors.
const introSkip = `try{var c=navigator.connection;if((c&&(c.saveData||/2g/.test(c.effectiveType)||(c.downlink>0&&c.downlink<1.5)))||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-skip")}catch(e){}`;

export const metadata: Metadata = {
  title: "Jacob Grønberg — Photographer & Visual Artist",
  description: "Portfolio of Jacob Grønberg, photographer and visual artist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={clash.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introSkip }} />
      </head>
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
