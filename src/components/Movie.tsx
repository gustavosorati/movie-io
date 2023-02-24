import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { MovieImage } from "./MovieImage";

interface IMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

interface Props {
  movie: IMovie
}

export function Movie({movie}: Props) {
  return (
    <div className="flex flex-col gap-1 max-w-[170px]">
      <MovieImage
        id={movie.id}
        original_title={movie.original_title}
        poster_path={movie.poster_path}
      />

      <div className=" flex flex-col gap-1">
        <strong className="flex-1 text-md text-white/20 font-medium ">{movie.title}</strong>
        
        <div className="flex items-center gap-1">
          <Star size={14} weight="fill" className="fill-yellow-200 drop-shadow" />
          <span className="text-[10px] text-yellow-200 font-medium">{movie.vote_average}</span>
          <span className="text-[10px] text-white/20 font-medium">de</span>
          <span className="text-[10px] text-yellow-200 font-medium">{movie.vote_count}</span>
          <span className="text-[10px] text-white/20 font-medium">votos</span>
        </div>
      </div>
    </div>
  )
}