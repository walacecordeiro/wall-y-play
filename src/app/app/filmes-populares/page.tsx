"use client";

import { LoadBox } from "@/components/ui/_components/LoadBox";
import React, { useState, useEffect } from "react";

type Movie = {
 id: number;
 title: string;
 poster_path: string;
};

export default function FilmesPopulares() {
 const [data, setData] = useState<Movie[] | null>(null);

 const fetchMovies = async () => {
  const options = {
   method: "GET",
   headers: {
    accept: "application/json",
    Authorization:
     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmEzYTk0M2YzNThhMjA2MDY3YTE2ODcxY2QwYjVhNCIsInN1YiI6IjY2NjA4MDVjZGU5NWQ3MzJlYWU5OTJlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GlLhhtii_ef5XsCFMwxE-i1umNt-AmkF4rgJ9RtJF7U",
   },
  };

  try {
   const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1",
    options
   );
   const data = await response.json();
   setData(data.results);
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
    <ul>
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
