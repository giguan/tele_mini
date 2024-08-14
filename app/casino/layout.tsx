import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/header";
import Menu from "@/components/menu";

export default function DefaultLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <body className="bg-dark-bg text-white min-h-screen flex flex-col">
        <Header />
        <main className="bg-content-gradient p-4 flex justify-center shadow-inner ">
            {children}
        </main>
        <Menu />
      </body>
    </html>
  );
}
