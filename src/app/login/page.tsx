"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { TMDB_response } from "@/services/tmdb";
import axios from "axios";
import { useEffect, useState } from "react";

type Movie = {
 id: number;
 backdrop_path: string;
 poster_path: string;
 title: string;
 overview: string;
 release_date: string;
 vote_average: number;
};

export default function Auth() {
 const [data, setData] = useState<Movie | null>(null);

 const getMovies = async () => {
  const config = {
   method: "GET",
   endPoint: "/movie/now_playing",
   params: { language: "pt-br", page: "1" },
  };

  await axios
   .request(TMDB_response(config))
   .then(function (response) {
    setData(response.data.results[0]);
    console.log(response.data.results[0]);
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 useEffect(() => {
  getMovies();
 }, []);

 return (
  <div className="w-full lg:grid lg:content-stretch lg:h-screen lg:grid-cols-2">
   <div className="flex items-center justify-center py-12">
    <div className="mx-auto grid w-[350px] gap-6">
     <div className="grid gap-2 text-center">
      <h1 className="text-3xl font-bold">Formas de Login</h1>
     </div>
     <div className="grid gap-4">
      <Button variant="outline" className="flex gap-3 w-full">
       Login com o Google
       <FcGoogle />
      </Button>
     </div>
    </div>
   </div>
   <div className="relative hidden bg-muted lg:flex">
    {data ? (
     <img
      src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
      alt="Image"
      className="top-0 right-0 w-full  max-h-screen mb-4 object-cover shadow-xl shadow-black transition sm:sticky sm:animate-none sm:mb-0"
     />
    ) : (
     <div></div>
    )}
   </div>
  </div>
 );
}
