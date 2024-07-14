"use client";

import React, { useState, useEffect } from "react";
import { TMDB_response } from "@/services/tmdb";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import {
 Pagination,
 PaginationContent,
 PaginationItem,
 PaginationLink,
 PaginationNext,
 PaginationPrevious,
} from "@/components/ui/pagination";
import Details from "../_components/movieDetails";

type Movie = {
 id: number;
 backdrop_path: string;
 poster_path: string;
 title: string;
 overview: string;
 release_date: string;
 vote_average: number;
};

type paramsUrlProps = {
 params: {
  listType: string;
 };
};

export default function FilmesPopulares({ params }: paramsUrlProps) {
 const [data, setData] = useState<Movie[] | null>(null);
 const [trailer, setTrailer] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);

 const getMovies = async () => {
  const config = {
   method: "GET",
   endPoint: `/movie/${params.listType}`,
   params: { language: `pt-br`, page: `${currentPage}` },
  };

  await axios
   .request(TMDB_response(config))
   .then(function (response) {
    setData(response.data.results);
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
   .request(TMDB_response(config))
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
 }, [currentPage]);

 const nextPage = () => {
  setCurrentPage((currentPage) => currentPage + 1);
 };

 const previousPage = () => {
  if (currentPage > 1) {
   setCurrentPage((currentPage) => currentPage - 1);
  }
 };

 return (
  <main className="relative flex gap-2 flex-col w-[95%] mx-auto">
   <Pagination className="z-50 flex flex-col gap-4 items-center fixed bottom-0 left-0 bg-gradient-to-t from-background from-10% via-background via-95% to-transparent to-100% py-4 md:flex-row lg:sticky lg:top-0 lg:bg-gradient-to-b">
    <PaginationContent >
     <PaginationItem>
      <PaginationPrevious
       onClick={previousPage}
       className="p-0 sm:px-2.5 cursor-pointer transition-all active:scale-75 hover:bg-transparent lg:hover:bg-muted"
      />
     </PaginationItem>
     <PaginationItem>
      <PaginationLink
       onClick={previousPage}
       className="cursor-pointer transition-all active:scale-75 hover:bg-transparent lg:hover:bg-muted"
      >
       {currentPage - 1}
      </PaginationLink>
     </PaginationItem>
     <PaginationItem>
      <PaginationLink className="border-primary" isActive>{currentPage}</PaginationLink>
     </PaginationItem>
     <PaginationItem>
      <PaginationLink
       onClick={nextPage}
       className="cursor-pointer transition-all active:scale-75 hover:bg-transparent lg:hover:bg-muted"
      >
       {currentPage + 1}
      </PaginationLink>
     </PaginationItem>
     <PaginationItem>
      <PaginationNext
       onClick={nextPage}
       className="p-0 sm:px-2.5 cursor-pointer transition-all active:scale-75 hover:bg-transparent lg:hover:bg-muted"
      />
     </PaginationItem>
    </PaginationContent>
   </Pagination>

   {data && (
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
              onClick={() => {
               getTrailerMovie(movie.id);
              }}
             />
            </DialogTrigger>
            <Details
             movieID={movie.id}
             backdropPath={movie.backdrop_path}
             posterPath={movie.poster_path}
             movieTitle={movie.title}
             movieOverview={movie.overview}
             movieTrailer={trailer}
            />
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
   )}
  </main>
 );
}
