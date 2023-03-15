import Image from "next/image";
import { MovieDTO } from "@/dtos/MovieDTO";
import { convertMinutesInHours } from "@/utils/convert-minutes-in-hour";

interface Props {
  movie: MovieDTO;
}

export function MovieHero({movie}: Props) {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-gray-1 p-6 border-2 border-white/10 rounded-lg max-w-[1010px] md:flex-row md:gap-8">
      
      {/* Poster Movie */}
      <Image
        src={`https://image.tmdb.org/t/p/w500/${movie.details.poster_path}`}
        alt={movie.details.original_title}
        width={240}
        height={280}
        className="rounded-sm mb-4"
      />

      {/* Informations Movie */}
      <div className="w-full flex flex-col items-center justify-center md:items-start md:h-full md:justify-start">
        
        {/* Title Movie */}
        <h1 className="text-2xl font-bold mb-3">{movie.details.title}</h1>

        {/* Subtitle Movie */}
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-base font-medium text-white/60">{movie.details.original_title}</h3>
          
          <span className="text-xs font-normal text-white/40">
            {convertMinutesInHours(movie.details.runtime)}
          </span>
        </div>

        {/* Categorias Movie */}
        <div className="flex items-center justify-center gap-4 mb-8 flex-wrap md:gap-2">
          {movie.details.genres.map(genre => (
            <span 
              key={genre.name} 
              className="bg-white/10 py-1 px-3 rounded-xl text-xs font-medium text-white/50
                transition-colors hover:text-s-blue-500 md:px-2"
            >
              {genre.name}
            </span>
          ))}
        </div>

        {/* Overview Movie */}   
        <p className="text-md text-white/40 text-justify">
          {movie.details.overview}
        </p>
      </div>
    </div>
  )
}