/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Card, CardHeader } from "../../card";
import { FaStar } from "react-icons/fa";

type propsSimpleCard = {
 data: Array<{
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
 }> | null;
};

export default function SimpleCard({ data }: propsSimpleCard) {
 return (
  <>
   {data && (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-6 pb-4 animate-fade-in">
     {data.map(
      (movie) =>
       movie.overview && (
        <Link key={movie.id} href={`/filmes/${movie.id}`}>
         <div className="flex transition sm:hover:scale-105">
          <Card className="border-none bg-red-600">
           <CardHeader className="relative p-0">
            <img
             src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
             alt="Image"
             className="w-[100%] h-[100%] rounded-xl object-cover"
            />
            <span className="absolute -left-1 top-2 flex justify-center items-center gap-1 w-fit bg-black/70 text-white shadow-md shadow-black px-2 border-l-2 border-l-primary">
             <FaStar className="text-yellow-300" />
             {(Math.round(movie.vote_average * 10) / 10).toFixed(1)}
            </span>
           </CardHeader>
          </Card>
         </div>
        </Link>
       )
     )}
    </div>
   )}
  </>
 );
}
