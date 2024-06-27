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
 backdrop_path: string;
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
   params: { language: "pt-br", page: "43" },
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
            <DialogContent
             style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
             }}
             className="flex flex-col h-fit max-h-screen overflow-auto items-center sm:max-w-[80%] sm:max-h-[90%] text-white border-none sm:rounded-xl"
            >
             <DialogHeader className="grid grid-cols-1 max-h-fit justify-items-center text-start sm:flex sm:flex-row sm:items-start sm:gap-4">
              <img
               src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
               alt="Image"
               className="w-[200px] h-auto mb-4 rounded-xl object-cover shadow-xl shadow-black transition sm:animate-none sm:mb-0"
              />
              <div className="!m-0 text-white h-[100%]">
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
               <DialogTitle className="pt-6 pb-1 sm:text-4xl">{movie.title}</DialogTitle>
               Sinopse:
               <DialogDescription className="inline ml-1 text-white">
                {movie.overview}
               </DialogDescription>
              </div>
             </DialogHeader>
             <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam unde veritatis corporis
              perspiciatis quas explicabo veniam officia dolor placeat quaerat id at facilis sunt
              commodi labore neque, odit blanditiis ipsam.
             </div>
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
