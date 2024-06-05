import { MobileNavigation } from "./_components/navigation/mobileNavigation";
import { DesktopNavigation } from "./_components/navigation/desktopNavigation";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <main>
   <div className="sm:hidden">
    <MobileNavigation />
   </div>
   <div className="max-sm:hidden">
    <DesktopNavigation />
   </div>
   <div>{children}</div>
  </main>
 );
}
