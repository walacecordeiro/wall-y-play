/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect } from "react";
import { TMDB_response } from "@/services/tmdb";
import axios from "axios";

import { Card, CardHeader } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";

import MyPagination from "@/components/ui/_components/pagination";
import Link from "next/link";
import SimpleCard from "@/components/ui/_components/simpleCard";

type Movie = {
 id: number;
 backdrop_path: string;
 poster_path: string;
 title: string;
 overview: string;
 release_date: string;
 vote_average: number;
};

export default function AllMovies() {
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
    console.log(response.data);
    setData(response.data.results);
   })
   .catch(function (error) {
    console.log(error);
   });
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
   <SimpleCard data={data} />

   <MyPagination previousPage={previousPage} currentPage={currentPage} nextPage={nextPage} />
  </main>
 );
}
