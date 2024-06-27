"use client";

import { LoadBox } from "@/components/ui/_components/LoadBox";
import React, { useState, useEffect } from "react";
import { apiRequest } from "@/api/tmdbServer";
import axios from "axios";

import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
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

type Movie = {
 id: number;
 poster_path: string;
 title: string;
 overview: string;
 release_date: string;
 vote_average: number;
};

export default function FilmesPopulares() {
 const [data, setData] = useState<Movie[] | null>(null);

 const getMovies = async () => {
  let config = {
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
             />
            </DialogTrigger>
            <DialogContent className="flex flex-col max-h-screen overflow-auto items-center sm:max-w-[80%]">
             <DialogHeader className="grid grid-cols-1 max-h-fit justify-items-center text-start sm:flex sm:flex-row sm:items-center sm:gap-4">
              <img
               src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
               alt="Image"
               className="w-[200px] h-auto mb-4 rounded-xl object-cover transition sm:animate-none sm:mb-0"
              />
              <div>
               <DialogTitle className="pb-2">{movie.title}</DialogTitle>
               Sinopse:
               <DialogDescription className="inline ml-1">{movie.overview}</DialogDescription>
              </div>
             </DialogHeader>
             <div>Mais conteúdo - Possível trailer</div>
            </DialogContent>
           </Dialog>

           <CardTitle>{movie.title}</CardTitle>
          </CardHeader>
          <CardContent>
           <p>Lançamento: {formatReleaseDate(movie.release_date)}</p>
           <p>
            Avaliação:
            <span className="bg-primary text-white shadow-sm shadow-neutral-500 px-2 ml-1 rounded">
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
