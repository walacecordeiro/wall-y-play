import { LoadBox } from "@/components/ui/_components/LoadBox";
import Link from "next/link";

export default function Home() {
 return (
  <main className="flex flex-col h-screen">
   <h1>Página sem bem-vindo(a)</h1>
   <Link href="/login">Ir para Login</Link>

   <div className="flex h-screen">
    <LoadBox />
   </div>
  </main>
 );
}
