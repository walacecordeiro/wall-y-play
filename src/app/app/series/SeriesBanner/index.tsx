"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
 Carousel,
 CarouselContent,
 CarouselItem,
 CarouselNext,
 CarouselPrevious,
 type CarouselApi,
} from "@/components/ui/carousel";
import { TMDB_response } from "@/services/tmdb";
import { MixIcon } from "@radix-ui/react-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Movie = {
 id: number;
 backdrop_path: string;
 poster_path: string;
 name: string;
 overview: string;
};

export default function SeriesBanner() {
 const [data, setData] = useState<Movie[] | null>(null);
 const [api, setApi] = useState<CarouselApi>();
 const [current, setCurrent] = useState(1);

 const fetchMovies = async () => {
  const config = {
   method: "GET",
   endPoint: `/discover/tv`,
   params: { language: `pt-br`, page: "1" },
  };

  try {
   const response = await axios.request(TMDB_response(config));
   setData(response.data.results);
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  fetchMovies();
  if (!api) {
   return;
  }

  api.on("select", () => {
   setCurrent(api.selectedScrollSnap() + 1);
  });
 }, [api]);

 return (
  <>
   <Carousel setApi={setApi} className="flex flex-col mx-auto w-full place-items-center">
    <CarouselContent className="m-0">
     {data?.slice(0, 4).map((series) => (
      <CarouselItem className="p-0" key={series.id}>
       <Card className="border-none">
        <CardContent className="relative flex h-[460px] md:h-full items-center justify-center p-0">
         <img
          src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
          alt={series.name}
          className="w-[100%] h-[100%] transition sm:hover:scale-105 rounded-xl object-cover"
         />
         <div className="absolute flex flex-col items-center justify-end gap-4 p-10 top-0 w-full h-full bg-gradient-to-b from-transparent to-background rounded-xl">
          <h2 className="text-xl text-center md:text-3xl">{series.name}</h2>
          {series.overview ? (
           <p className="hidden md:block text-justify opacity-80">{series.overview}</p>
          ) : (
           <p className="text-destructive">Lamentamos! não temos sinopse deste título...</p>
          )}
          <Button className="flex items-center gap-2">
           <MixIcon width={20} height={20}/> Detalhes do Título
          </Button>
         </div>
        </CardContent>
       </Card>
      </CarouselItem>
     ))}
    </CarouselContent>
    <div className="hidden md:flex justify-between relative w-[30%] h-0">
     <CarouselPrevious className="md:static md:flex md:items-center md:justify-center md:-my-4 transition-all active:scale-75" />
     <CarouselNext className="md:static md:flex md:items-center md:justify-center md:-my-4 transition-all active:scale-75" />
    </div>
   </Carousel>
   <div className="py-2 text-center">
    {Array.from({ length: 4 }, (_, i) => (
     <button
      key={i}
      onClick={() => api?.scrollTo(i)}
      className={`inline-block ml-1 w-4 h-1 rounded-full transition-all ${
       i + 1 === current ? "bg-primary opacity-100" : "bg-muted opacity-50"
      }`}
     ></button>
    ))}
   </div>
  </>
 );
}
