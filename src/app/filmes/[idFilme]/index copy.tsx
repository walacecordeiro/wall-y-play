/* eslint-disable @next/next/no-img-element */
import {
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type propsDetails = {
 movieID: number;
 backdropPath: string;
 posterPath: string;
 movieTitle: string;
 movieOverview: string;
 movieTrailer: Array<string>;
};

export default function Details({
 movieID,
 backdropPath,
 posterPath,
 movieTitle,
 movieOverview,
 movieTrailer,
}: propsDetails) {
 return (
  <DialogContent
   style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${backdropPath}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
   }}
   className="flex flex-col h-fit max-h-[90%] pt-16 overflow-auto sm:max-w-[80%] sm:max-h-[90%] text-white border-none sm:rounded-xl"
  >
   <DialogHeader className="grid grid-cols-1 max-h-fit justify-items-center text-start sm:flex sm:flex-row sm:items-start sm:gap-4">
    <img
     src={`https://image.tmdb.org/t/p/original${posterPath}`}
     alt="Image"
     className="w-[60%] h-fit mb-4 rounded-xl object-cover shadow-xl shadow-black transition md:sticky md:top-0 md:w-[200px] md:h-[300px] sm:animate-none sm:mb-0"
    />
    <div className="!m-0 text-white w-full h-[100%]">
     {backdropPath && (
      <img
       src={`https://image.tmdb.org/t/p/original${backdropPath}`}
       alt="Image"
       className="hidden w-[98%] h-[200px] mb-4 rounded-xl object-cover shadow-xl shadow-black transition md:block sm:animate-none sm:mb-0"
      />
     )}
     <DialogTitle className="pb-6 text-center sm:text-start sm:text-4xl sm:pt-6 sm:pb-1">
      {movieTitle}
     </DialogTitle>
     <Tabs defaultValue="sinopse" className="w-full">
      <TabsList className="w-full justify-center p-0 mb-4 gap-2 bg-transparent text-white sm:w-fit">
       <TabsTrigger
        className="outline outline-1 shadow-lg shadow-black data-[state=active]:shadow-lg data-[state=active]:shadow-black"
        value="sinopse"
       >
        Sinopse
       </TabsTrigger>
       <TabsTrigger
        className="outline outline-1 shadow-lg shadow-black data-[state=active]:shadow-lg data-[state=active]:shadow-black"
        value="trailer"
       >
        Assistir Trailer
       </TabsTrigger>

       <TabsTrigger
        className="outline outline-1 shadow-lg shadow-black data-[state=active]:shadow-lg data-[state=active]:shadow-black"
        value="movie"
       >
        Assistir Filme
       </TabsTrigger>
      </TabsList>

      <TabsContent value="sinopse">
       <DialogDescription className="text-white">{movieOverview}</DialogDescription>
      </TabsContent>

      <TabsContent value="trailer">
       {movieTrailer.length > 0 ? (
        <div className="flex w-full">
         <iframe
          className="w-full h-[45vh] rounded-xl shadow-xl shadow-black sm:w-full sm:h-[71vh]"
          src={`https://www.youtube.com/embed/${movieTrailer}`}
          title={`Trailer de ${movieTitle}`}
          allowFullScreen
         ></iframe>
        </div>
       ) : (
        <p className="text-destructive">Lamentamos muito! Não temos trailer para este título...</p>
       )}
      </TabsContent>

      <TabsContent value="movie">
       {movieID ? (
        <div className="flex w-full">
         <iframe
          className="w-full h-[45vh] rounded-xl shadow-xl shadow-black sm:w-full sm:h-[71vh]"
          src={`https://embedder.net/e/${movieID}`}
          allowFullScreen
         ></iframe>
        </div>
       ) : (
        <p className="text-destructive">Lamentamos muito! Não temos o filme deste título...</p>
       )}
      </TabsContent>
     </Tabs>
    </div>
   </DialogHeader>
  </DialogContent>
 );
}
