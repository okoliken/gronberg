import type { Metadata } from "next";
import { Cursor } from "@/components/layout/cursor";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jacob Grønberg — Photographer & Visual Artist",
  description: "Portfolio of Jacob Grønberg, photographer and visual artist.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
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
