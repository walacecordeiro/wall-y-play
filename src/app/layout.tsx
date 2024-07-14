import "@/app/globals.css";
import type { Metadata } from "next";
import { manrope } from "../fonts";

export const metadata: Metadata = {
 title: "Wall-y play",
 description:
  "Uma plataforma de filmes e séries onde a magia do cinema e a emoção das séries se encontram.",
};

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <html lang="pt-br" suppressHydrationWarning className={manrope.className}>
   <body className={`dark`}>{children}</body>
  </html>
 );
}
