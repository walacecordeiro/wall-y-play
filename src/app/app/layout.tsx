import { MobileNavigation } from "./_components/navigation/mobileNavigation";
import { DesktopNavigation } from "./_components/navigation/desktopNavigation";
import baseLogo from "@/assets/baseLogo.svg";
import moldeLogo from "@/assets/moldeLogo.svg";
import Image from "next/image";
import Link from "next/link";
import Logo from "./_components/logo";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <main>
   <header className="z-50 bg-gradient-to-b from-background from-10% via-background via-95% to-transparent to-100% flex justify-between md:hidden fixed top-0 w-full p-3">
    <Logo />
    <MobileNavigation />
   </header>
   <div className="max-md:hidden">
    <DesktopNavigation />
   </div>
   <div className="mb-28 mt-20 w-[95%] lg:w-[80%] mx-auto ">{children}</div>
  </main>
 );
}
