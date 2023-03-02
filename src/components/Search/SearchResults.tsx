import { MovieBasicDTO } from "@/dtos/MovieDTO";
import { localizeDatePtBr } from "@/utils/localize-date-pt_br";
import Image from "next/image";
import Link from "next/link";
import { Image as ImageIcon } from "phosphor-react";

interface Props {
  movies: MovieBasicDTO[];
}

export function SearchResults({movies}: Props) {
  const isVisible = movies?.length > 0 ? true : false;

  return (
    <div className={`absolute mt-2 top-full left-0 w-full max-h-[500px] overflow-y-scroll z-10 flex flex-col bg-gray-1 border-[2px] border-white/20 rounded-md ${isVisible ? 'opacity-1' : 'opacity-0'}`}>
      
      {movies.length > 0 && movies?.map(movie => (
        <div key={movie.id} className="flex gap-4 p-3 border-b-[1px] border-white/5">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={60}
              height={90}
              className="rounded  w-[60px] h-[90px]"
            />
          ) : (
            <div className="rounded min-w-[60px] h-[90px] bg-gray-700 flex items-center justify-center">
              <ImageIcon size={28} />
            </div>
          ) }

          <div className="w-full flex flex-col">
            <p className="text-white/40">{movie.title}</p>
            <p className="text-yellow-600 text-sm flex-1">
              {localizeDatePtBr(movie.release_date)}
            </p>

            <Link href={`/movie/${movie.id}`} className="text-sm text-blue-500 underline self-end">ver mais</Link>
          </div>
          
        </div>
      ))}

    </div>
  )
}