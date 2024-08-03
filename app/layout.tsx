import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import Header from "./header";
import Menu from "./menu";
import FontSetup from "./font-setup";

export const metadata: Metadata = {
  title: "Telegram Mini App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <FontSetup />
        <Script src="https://telegram.org/js/telegram-web-app.jg" strategy="beforeInteractive" />
      </head>
      <body className="bg-dark-bg text-white min-h-screen flex flex-col">
        <Header />
        <main className="bg-content-gradient p-4 flex-grow shadow-inner">
          {children}
        </main>
        <Menu />
      </body>
    </html>
  );
}
