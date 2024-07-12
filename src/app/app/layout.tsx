import { MobileNavigation } from "./_components/navigation/mobileNavigation";
import { DesktopNavigation } from "./_components/navigation/desktopNavigation";
import Logo from "@/assets/Logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <main>
   <header className="z-50 bg-background flex justify-between md:hidden fixed top-0 w-full p-3">
    <Link href="/app">
     <Image src={Logo} alt="logo do site" width={undefined} height={undefined} />
    </Link>
    <MobileNavigation />
   </header>
   <div className="max-md:hidden">
    <DesktopNavigation />
   </div>
   <div className="mb-28 mt-20 w-[95%] lg:w-[80%] mx-auto ">{children}</div>
  </main>
 );
}
