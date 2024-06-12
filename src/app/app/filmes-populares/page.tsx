"use client";

import { LoadBox } from "@/components/ui/_components/LoadBox";
import React, { useState, useEffect } from "react";
import { baseURL, GET } from "@/api/tmdbServer";

type Movie = {
 id: number;
 title: string;
 poster_path: string;
};

export default function FilmesPopulares() {
 const [data, setData] = useState<Movie[] | null>(null);

 const fetchMovies = async () => {
  try {
   const response = await fetch(`${baseURL}movie/popular?language=pt-BR&page=1`, GET);
   const data = await response.json();
   setData(data.results);
   console.log(data.results);
  } catch (err) {
   console.error(err);
  }
 };

 useEffect(() => {
  fetchMovies();
 }, []);
 return (
  <main className="flex flex-col h-screen">
   <h1>Filmes Populares:</h1>
   {data ? (
    <ul className="flex overflow-x-auto whitespace-nowrap">
     {data.map((movie) => (
      <li key={movie.id}>
       <img
        style={{ width: 500 }}
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt=""
       />
       <a href="">{movie.title}</a>
      </li>
     ))}
    </ul>
   ) : (
    <div className="flex h-screen">
     <LoadBox />
    </div>
   )}
  </main>
 );
}
