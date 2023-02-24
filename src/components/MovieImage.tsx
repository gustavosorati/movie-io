import Image from "next/image";
import Link from "next/link";

interface Props {
  id: number;
  poster_path: string;
  original_title: string;
  width?: number;
  height?: number;
}

export function MovieImage({id, original_title, poster_path, width, height}: Props) {
  const MOVIE_WIDTH = width ? width : 170;
  const MOVIE_HEIGHT = height ? height : 250;


  return (
    <div 
      className={
        `flex flex-col items-start justify-end 
        w-[${MOVIE_WIDTH}px] h-[${MOVIE_HEIGHT}px] bg-gradient-to-t from-s-blue-500 to-s-green-100 
        rounded-tr-sm rounded-bl-sm
        relative
      `}>      
        <Link 
          href={`/movie/${id}`}
          className={`
            w-[${MOVIE_WIDTH}px] h-[${MOVIE_HEIGHT}px] flex
            bg-gradient-to-t from-s-blue-500 to-s-green-100 rounded-sm 
            relative

            before:w-0 before:h-0 before:absolute before:top-0 before:left-0 before:bg-transparent
            before:hover:bg-transparent before:hover:left-[-10px] before:transition-all
            before:hover:boder-0 before:hover:border-transparent
            before:hover:border-t-[10px] before:hover:border-t-transparent
            before:hover:border-r-[10px] before:hover:border-r-s-green-100

            after:w-0 after:h-0 after:absolute after:bottom-0 after:right-0 after:bg-transparent
            hover:after:bg-transparent after:hover:bottom-[-10px] after:transition-all
            after:hover:boder-0 after:hover:border-transparent
            after:hover:border-t-[10px] after:hover:border-t-s-blue-500
            after:hover:border-r-[10px] after:hover:border-r-transparent

            transition hover:translate-x-[10px] hover:translate-y-[-10px] 

        `}>
          <Image 
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`} 
            width={MOVIE_WIDTH} 
            height={MOVIE_HEIGHT} 
            alt={original_title}
          /> 
        </Link>      
      </div>
  )
}