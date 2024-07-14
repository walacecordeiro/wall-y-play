import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import MoviesBanner from "./filmes/_components/MoviesBanner";
import SeriesBanner from "./series/SeriesBanner";

export default function Home() {
 return (
  <main className="relative">
   <Tabs defaultValue="movies" className="w-full">
    <TabsList className="z-30 fixed bottom-0 left-0 w-full rounded-none justify-evenly gap-2 py-4 bg-transparent bg-gradient-to-t from-background from-10% via-background via-95% to-transparent to-100% ">
     <TabsTrigger
      className="outline outline-1 outline-primary shadow-lg shadow-black data-[state=active]:shadow-lg data-[state=active]:shadow-black transition-all active:scale-75"
      value="movies"
     >
      Sessão de Filmes
     </TabsTrigger>
     <TabsTrigger
      className="outline outline-1 outline-primary shadow-lg shadow-black data-[state=active]:shadow-lg data-[state=active]:shadow-black transition-all active:scale-75"
      value="series"
     >
      Sessão de Séries
     </TabsTrigger>
    </TabsList>

    <TabsContent value="movies">
     <MoviesBanner />
    </TabsContent>

    <TabsContent value="series">
     <SeriesBanner />
    </TabsContent>
   </Tabs>
  </main>
 );
}
