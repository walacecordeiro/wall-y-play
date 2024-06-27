"use client";

import { LoadBox } from "@/components/ui/_components/LoadBox";
import React, { useState, useEffect } from "react";
import { apiRequest } from "@/api/tmdbServer";
import axios from "axios";

import {
 Card,
 CardContent,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";

import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Movie = {
 id: number;
 backdrop_path: string;
 poster_path: string;
 title: string;
 overview: string;
 release_date: string;
 vote_average: number;
};

export default function FilmesPopulares() {
 const [data, setData] = useState<Movie[] | null>(null);
 const [trailer, setTrailer] = useState([]);

 const getMovies = async () => {
  const config = {
   method: "GET",
   endPoint: "/movie/popular",
   params: { language: "pt-br", page: "1" },
  };

  await axios
   .request(apiRequest(config))
   .then(function (response) {
    setData(response.data.results);
    console.log(response.data.results);
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 const getTrailerMovie = async (movieID?: number) => {
  const config = {
   method: "GET",
   endPoint: `/movie/${movieID}/videos`,
   params: { language: "pt-br" },
  };

  await axios
   .request(apiRequest(config))
   .then(function (response) {
    const trailerKey = response.data.results[0]?.key;
    if (trailerKey === undefined) {
     setTrailer([]);
    } else {
     setTrailer(response.data.results[0].key);
    }
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 const formatReleaseDate = (date: string) => {
  const parts = date.split("-");
  const formatedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  return formatedDate;
 };

 useEffect(() => {
  getMovies();
 }, []);

 return (
  <main className="flex gap-2 m-2 sm:m-8 flex-col h-screen">
   <h1>Filmes Populares:</h1>
   {data ? (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 pb-4 animate-fade-in">
     {data.map(
      (movie) =>
       movie.overview && (
        <div key={movie.id} className="flex">
         <Card>
          <CardHeader>
           <Dialog>
            <DialogTrigger>
             <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt="Image"
              className="w-[100%] h-[100%] transition sm:hover:scale-105 mb-4 rounded-xl object-cover"
              onClick={() => getTrailerMovie(movie.id)}
             />
            </DialogTrigger>
            <DialogContent
             style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
             }}
             className="flex flex-col h-fit max-h-screen overflow-auto sm:max-w-[80%] sm:max-h-[90%] text-white border-none sm:rounded-xl"
            >
             <DialogHeader className="grid grid-cols-1 max-h-fit justify-items-center text-start sm:flex sm:flex-row sm:items-start sm:gap-4">
              <img
               src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
               alt="Image"
               className="top-0 right-0 w-[200px] h-auto mb-4 rounded-xl object-cover shadow-xl shadow-black transition sm:sticky sm:animate-none sm:mb-0"
              />
              <div className="!m-0 text-white w-full h-[100%]">
               {movie.backdrop_path ? (
                <img
                 src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                 alt="Image"
                 className="hidden w-[98%] h-[200px] mb-4 rounded-xl object-cover shadow-xl shadow-black transition md:block sm:animate-none sm:mb-0"
                />
               ) : (
                <div className="flex h-screen">
                 <LoadBox />
                </div>
               )}
               <DialogTitle className="pb-6 text-center sm:text-start sm:text-4xl sm:pt-6 sm:pb-1">
                {movie.title}
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
                </TabsList>

                <TabsContent value="sinopse">
                 <DialogDescription className="text-white">{movie.overview}</DialogDescription>
                </TabsContent>

                <TabsContent value="trailer">
                 {trailer.length > 0 ? (
                  <div>
                   <div className="flex w-full">
                    <iframe
                     className="w-full h-[45vh] rounded-xl shadow-xl shadow-black sm:w-full sm:h-[71vh]"
                     src={`https://www.youtube.com/embed/${trailer}`}
                     title={`Trailer de ${movie.title}`}
                    ></iframe>
                   </div>
                  </div>
                 ) : (
                  <p className="text-destructive">Lamentamos muito! Ainda não temos trailer para este título...</p>
                 )}
                </TabsContent>
               </Tabs>
              </div>
             </DialogHeader>
            </DialogContent>
           </Dialog>

           <CardTitle>{movie.title}</CardTitle>
          </CardHeader>
          <CardContent>
           <p>Lançamento: {formatReleaseDate(movie.release_date)}</p>
           <p>
            Avaliação:
            <span className="bg-primary text-white shadow-sm shadow-neutral-500 px-3 ml-1 rounded">
             {(Math.round(movie.vote_average * 10) / 10).toFixed(1)}
            </span>
           </p>
          </CardContent>
         </Card>
        </div>
       )
     )}
    </div>
   ) : (
    <div className="flex h-screen">
     <LoadBox />
    </div>
   )}
  </main>
 );
}
