import { DesktopNavigation } from "@/components/ui/_components/navigation/desktopNavigation";
import { MobileNavigation } from "@/components/ui/_components/navigation/mobileNavigation";
import Logo from "../logo";

export default function Header() {
 return (
  <header className="z-50 bg-gradient-to-b from-background from-10% via-background via-95% to-transparent to-100% flex justify-between fixed top-0 w-full p-3">
   {/* versão mobile */}
   <div className="md:hidden flex justify-between w-full">
    <Logo />
    <MobileNavigation />
   </div>
   {/* versão desktop */}
   <div className="max-md:hidden flex flex-row-reverse justify-between w-full">
    <Logo />
    <DesktopNavigation />
   </div>
  </header>
 );
}
