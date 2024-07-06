import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Filmes Next",
 description: "Uma plataforma de filmes e séries",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="pt-br" suppressHydrationWarning>
   <body className={`${inter.className} dark`}>{children}</body>
  </html>
 );
}
