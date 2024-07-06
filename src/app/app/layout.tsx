import { MobileNavigation } from "./_components/navigation/mobileNavigation";
import { DesktopNavigation } from "./_components/navigation/desktopNavigation";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
  <main>
   <div className="md:hidden">
    <MobileNavigation />
   </div>
   <div className="max-md:hidden">
    <DesktopNavigation />
   </div>
   <div className="my-9">{children}</div>
  </main>
 );
}
