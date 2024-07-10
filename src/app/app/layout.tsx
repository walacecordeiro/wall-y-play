import { MobileNavigation } from "./_components/navigation/mobileNavigation";
import { DesktopNavigation } from "./_components/navigation/desktopNavigation";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <main>
   <div className="md:hidden fixed right-4 top-4 z-50">
    <MobileNavigation />
   </div>
   <div className="max-md:hidden">
    <DesktopNavigation />
   </div>
   <div className="mb-28 mt-9">{children}</div>
  </main>
 );
}
