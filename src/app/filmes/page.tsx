/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { TMDB_response } from "@/services/tmdb";
import axios from "axios";

import { Card, CardHeader } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

import MyPagination from "@/components/ui/_components/pagination";

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
   endPoint: `/discover/movie`,
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
  setCurrentPage((prevurrentPage) => currentPage + 1);
 };

 const previousPage = () => {
  if (currentPage > 1) {
   setCurrentPage((currentPage) => currentPage - 1);
  }
 };

 return (
  <main className="relative py-24 flex gap-2 flex-col w-[95%] mx-auto">
   {data && (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-6 pb-4 animate-fade-in">
     {data.map(
      (movie) =>
       movie.overview && (
        <div key={movie.id} className="flex">
         <Card className="border-none bg-red-600">
          <CardHeader className="relative p-0">
           <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="Image"
            className="w-[100%] h-[100%] transition sm:hover:scale-105 rounded-xl object-cover"
            onClick={() => {
             getTrailerMovie(movie.id);
            }}
           />
           <span className="absolute -left-1 flex justify-center items-center gap-1 w-fit bg-primary text-white shadow-md shadow-black px-2 rounded-xl">
            <FaStar className="text-yellow-300"/>
            {(Math.round(movie.vote_average * 10) / 10).toFixed(1)}
           </span>
          </CardHeader>
         </Card>
        </div>
       )
     )}
    </div>
   )}

   <MyPagination previousPage={previousPage} currentPage={currentPage} nextPage={nextPage} />
  </main>
 );
}
