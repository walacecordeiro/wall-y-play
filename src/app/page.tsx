import { LoadBox } from "@/components/ui/_components/LoadBox";

export default function Home() {
 return (
  <main className="flex flex-col h-screen">
   <h1>Página sem autenticação</h1>

   <div className="flex h-screen">
    <LoadBox />
   </div>
  </main>
 );
}
