import { Box } from "@/components/Box";
import { Movie } from "@/components/Movie";
import { MovieImage } from "@/components/MovieImage";
import { MovieDTO } from "@/dtos/MovieDTO";
import { convertMinutesInHours } from "@/utils/convert-minutes-in-hour";

interface Props {
  movie: MovieDTO
}

export function MovieHero({movie}: Props) {
  return (
    <Box classNames="w-full max-w-[968px]">
      <MovieImage 
        id={movie.details.id}
        original_title={movie.details.original_title}
        poster_path={movie.details.poster_path}
        width={250}
        height={368}
      />

      <div className="flex flex-col flex-wrap ml-8 flex-1 w-full">
        <h1 className="text-4xl font-bold mb-3 md:text-2xl">{movie.details.title}</h1>

        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-base font-medium text-white/60">{movie.details.original_title}</h3>
          
          <span className="text-md font-normal text-white/20">
            {convertMinutesInHours(movie.details.runtime)}
          </span>
        </div>

        <div className="flex items-center gap-4 mb-8 md:flex-wrap md:gap-2">
          {movie.details.genres.map(genre => (
            <span 
              key={genre.name} 
              className="
              bg-white/10 py-1 px-3 rounded-xl text-xs font-medium text-white/50
                transition-colors hover:text-s-blue-500
                md:px-2
              "
            >
              {genre.name}
            </span>
          ))}
        </div>
              
        <p className="text-md text-white/40">
          {movie.details.overview}
        </p>
      </div>
    </Box>
  )
}