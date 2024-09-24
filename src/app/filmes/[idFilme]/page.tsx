/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { TMDB_response } from "@/services/tmdb";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import axios from "axios";
import { useEffect, useState } from "react";

import { MdLocalMovies, MdMenuBook } from "react-icons/md";
import { BiSolidCameraMovie } from "react-icons/bi";
import { IoReturnUpBackSharp } from "react-icons/io5";

import {
 Card,
 CardContent,
 CardDescription,
 CardFooter,
 CardHeader,
 CardTitle,
} from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import Tag from "@/components/ui/_components/tag";
import SimpleCard from "@/components/ui/_components/simpleCard";
import Section from "@/components/ui/_components/section";
import BackButton from "@/components/ui/_components/backButton";

interface propsParams {
 params: { idFilme: string };
}

type movieDerailProps = {
 id: number;
 imdb_id: string;
 genres: Array<{ id: number; name: string }>;
 production_companies: Array<{
  id: number;
  logo_path: string;
  name: string;
 }>;
 backdrop_path: string;
 poster_path: string;
 title: string;
 tagline: string;
 overview: string;
 release_date: string;
 vote_average: number;
};

export default function MovieDetail({ params }: propsParams) {
 const [data, setData] = useState<movieDerailProps | null>(null);
 const [recomendedMovies, setRecomendedMovies] = useState([]);
 const [similarMovies, setSimilarMovies] = useState([]);
 const [trailer, setTrailer] = useState([]);
 const formatedDate = new Date(`${data?.release_date}`).toLocaleDateString("pt-BR");
 console.log(similarMovies);

 const getMovies = async () => {
  const config = {
   method: "GET",
   endPoint: `/movie/${params.idFilme}`,
   params: { language: `pt-BR` },
  };

  await axios
   .request(TMDB_response(config))
   .then(function (response) {
    setData(response.data);
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 const getTrailerMovie = async () => {
  const config = {
   method: "GET",
   endPoint: `/movie/${data?.id}/videos`,
   params: { language: "pt-br" },
  };

  await axios
   .request(TMDB_response(config))
   .then(function (response) {
    const trailerKey = response.data.results[0]?.key;
    console.log(response);
    if (!response) {
     setTrailer([]);
    } else {
     setTrailer(trailerKey);
    }
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 const getRecomendedMovies = async () => {
  const config = {
   method: "GET",
   endPoint: `/movie/${params.idFilme}/recommendations`,
   params: { language: `pt-BR` },
  };

  await axios
   .request(TMDB_response(config))
   .then(function (response) {
    setRecomendedMovies(response.data.results);
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 const getSimilarMovies = async () => {
  const config = {
   method: "GET",
   endPoint: `/movie/${params.idFilme}/similar`,
   params: { language: `pt-BR` },
  };

  await axios
   .request(TMDB_response(config))
   .then(function (response) {
    setSimilarMovies(response.data.results);
   })
   .catch(function (error) {
    console.log(error);
   });
 };

 useEffect(() => {
  getMovies();
  getRecomendedMovies();
  getSimilarMovies();
 }, []);

 return (
  <main
   style={{
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://image.tmdb.org/t/p/original${data?.backdrop_path}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
   }}
   className="flex flex-col bg-scroll h-screen p-5 pt-24 overflow-scroll text-white md:h-screen"
  >
   <div className="grid grid-cols-1 max-h-fit justify-items-center text-start sm:flex sm:flex-row sm:items-start sm:gap-4">
    <BackButton
     icon={<IoReturnUpBackSharp size={24} />}
     text="Voltar"
     className="lg:hidden justify-self-end bg-primary text-white p-0 mb-4 px-3 py-2 shadow-sm"
    />

    <Card className="relative bg-background/90 h-fit mb-4 rounded-xl object-cover transition md:sticky md:top-0 md:w-[300px] sm:animate-none sm:mb-0">
     <CardHeader>
      {data?.tagline && (
       <span className="md:hidden absolute -left-1 top-4 flex justify-center items-center gap-1 max-w-fit w-10/12 bg-black/70 text-white shadow-md shadow-black px-2 border-l-2 border-l-primary">
        &quot;{data?.tagline}&quot;
       </span>
      )}
      <img
       src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
       alt="Image"
       className="mb-4 rounded-xl object-cover shadow-xl shadow-black transition"
      />
     </CardHeader>
     <CardContent className="flex flex-col gap-3">
      <p>Lançamento: {formatedDate}</p>
      {data?.vote_average && (
       <p className="flex items-center">
        <span>IMDB:</span>
        <FaStar className="text-yellow-300 ml-1" />
        {(Math.round(data?.vote_average * 10) / 10).toFixed(1)}
       </p>
      )}
      <Tag data={data?.genres} />
     </CardContent>
    </Card>

    <div className="flex flex-col gap-4 text-white w-full h-[100%]">
     <Card className="bg-background/90">
      <CardHeader>
       <BackButton
        icon={<IoReturnUpBackSharp size={24} />}
        text="Voltar"
        className="hidden lg:flex"
       />
       {data?.backdrop_path && (
        <div className="relative hidden md:block">
         <img
          src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`}
          alt="Image"
          className="w-[98%] h-[200px] mb-4 rounded-xl object-cover shadow-xl shadow-black transition sm:animate-none sm:mb-0"
         />
         {data.tagline && (
          <span className="absolute -left-1 bottom-3 flex justify-center items-center gap-1 w-fit bg-black/70 text-white shadow-md shadow-black px-2 border-l-2 border-l-primary">
           &quot;{data?.tagline}&quot;
          </span>
         )}
        </div>
       )}
      </CardHeader>
      <CardContent>
       <Tabs defaultValue="sinopse" className="w-full">
        <TabsList className="flex w-full justify-between p-0 mb-4 gap-2 bg-transparent text-white sm:w-fit sm:justify-center">
         <TabsTrigger
          className="flex w-full items-center justify-center gap-1 border px-1 sm:w-fit sm:px-2 rounded shadow-lg shadow-black data-[state=active]:shadow-lg data-[state=active]:bg-primary data-[state=active]:shadow-black transition-all hover:scale-105 hover:translate-y-1 hover:bg-primary/80"
          value="sinopse"
         >
          <MdMenuBook />
          <p>Sinopse</p>
         </TabsTrigger>

         <TabsTrigger
          onClick={() => getTrailerMovie()}
          className="flex w-full items-center justify-center gap-1 border px-1 sm:w-fit sm:px-2 rounded shadow-lg shadow-black data-[state=active]:shadow-lg data-[state=active]:bg-primary data-[state=active]:shadow-black transition-all hover:scale-105 hover:translate-y-1 hover:bg-primary/80"
          value="trailer"
         >
          <MdLocalMovies />
          <p>
           <span className="hidden sm:inline">Assistir</span> Trailer
          </p>
         </TabsTrigger>

         <TabsTrigger
          className="flex w-full items-center justify-center gap-1 border px-1 sm:w-fit sm:px-2 rounded shadow-lg shadow-black data-[state=active]:shadow-lg data-[state=active]:bg-primary data-[state=active]:shadow-black transition-all hover:scale-105 hover:translate-y-1 hover:bg-primary/80"
          value="movie"
         >
          <BiSolidCameraMovie />
          <p>
           <span className="hidden sm:inline">Assistir</span> Filme
          </p>
         </TabsTrigger>
        </TabsList>

        <TabsContent value="sinopse">
         <p className="text-white">{data?.overview}</p>
        </TabsContent>

        <TabsContent value="trailer">
         {trailer && trailer.length > 0 ? (
          <div className="flex w-full">
           <iframe
            className="w-full h-[45vh] rounded-xl shadow-xl shadow-black sm:w-full sm:h-[71vh]"
            src={`https://www.youtube.com/embed/${trailer}`}
            title={`Trailer de ${data?.title}`}
            allowFullScreen
           ></iframe>
          </div>
         ) : (
          <p className="text-destructive">
           Lamentamos muito! Não temos trailer para este título...
          </p>
         )}
        </TabsContent>

        <TabsContent value="movie">
         {data?.imdb_id ? (
          <div className="flex w-full">
           <iframe
            className="w-full h-[45vh] rounded-xl shadow-xl shadow-black sm:w-full sm:h-[71vh]"
            src={`https://embedder.net/e/${data?.imdb_id}`}
            allowFullScreen
           ></iframe>
          </div>
         ) : (
          <p className="text-destructive">Lamentamos muito! Não temos o filme deste título...</p>
         )}
        </TabsContent>
        {data?.production_companies[0] && data?.production_companies[0].logo_path && (
         <Section title="Produção" className="pt-4">
          <div className="grid grid-cols-4 md:grid-cols-10 gap-2">
           {data?.production_companies.map(
            (companie) =>
             companie.logo_path && (
              <div
               className="flex items-center justify-center bg-white h-full p-4 rounded-r border-l-4 border-l-primary"
               key={companie.id}
              >
               <img
                alt="logo da empresa"
                src={`https://image.tmdb.org/t/p/original${companie.logo_path}`}
                className="w-20"
               />
              </div>
             )
           )}
          </div>
         </Section>
        )}
       </Tabs>
      </CardContent>
     </Card>
     {(similarMovies.length > 0 || recomendedMovies.length > 0) && (
      <Card className="bg-background/90 pt-4">
       <CardContent>
        {recomendedMovies.length > 0 && (
         <Section title="Títulos recomendados">
          <SimpleCard data={recomendedMovies.slice(0, 6)} />
         </Section>
        )}
        {similarMovies.length > 0 && (
         <Section title="Títulos similares">
          <SimpleCard data={similarMovies.slice(0, 6)} />
         </Section>
        )}
       </CardContent>
      </Card>
     )}
    </div>
   </div>
  </main>
 );
}
