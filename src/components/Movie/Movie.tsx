import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


import { Heart, Star } from "phosphor-react";
import { api } from "@/lib/axios";
import { MovieImage } from "./MovieImage";

interface IMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  isFavorite: boolean;
}

interface Props {
  movie: IMovie;
  id: number;
}

export function Movie({id, movie}: Props) {
  const { data: user } = useSession();
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);

  async function handleMarkAsFavorite() {
    // try {
    //   await api.post('/movies/create', {
    //     movie,
    //     id
    //   });
      
    //   setIsMovieFavorite((state) => !state);
    // } catch (error) {
    //   console.log(error)
    // }
  }

  // useEffect(() => {
  //   setIsMovieFavorite(movie.isFavorite)
  // }, [movie.isFavorite]);
  
  return (
    <div className="relative flex flex-col gap-1 max-w-[170px] text-white/20 hover:text-white">
      <MovieImage
        id={id}
        original_title={movie.title}
        poster_path={movie.poster_path}
      />

      <div className="flex flex-col min-h-[70px] gap-1">
        <strong className="flex-1 text-[14px] font-medium">{movie.title}</strong>
        
        <div className="mt-1 flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <Star size={14} weight="fill" className="fill-yellow-200 drop-shadow" />
            
            <span className="text-[10px] text-yellow-200 font-medium">{movie.vote_average}</span>
            <span className="text-[10px] text-white/20 font-medium">de</span>
            <span className="text-[10px] text-yellow-200 font-medium">{movie.vote_count}</span>
            <span className="text-[10px] text-white/20 font-medium">votos</span>
          </div>

          <button 
            className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-20" 
            onClick={handleMarkAsFavorite}
            disabled={!user}
          >
            <Heart size={16} 
              weight="fill" 
              className={`text-white/30 hover:fill-red-600 
              ${!user ? 'disabled' : ''}
              ${isMovieFavorite ? "fill-red-600" : "text-white/30"}`} 
            />
          </button>
        </div>
      </div>
    </div>
  )
}