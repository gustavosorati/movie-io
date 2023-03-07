import { GenericLink } from "@/components/GenericLink";
import { Heading } from "@/components/Heading";
import { Loading } from "@/components/Loading";
import { Star } from "@/components/Star";
import { Text } from "@/components/Text";
import { MovieBasicDTO } from "@/dtos/MovieDTO";
import axios from "axios";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";


interface Trailer {
  id: string;
  name: string;
  site: string;
  key: string;
  published_ad: string;
}

interface Props {
  movie: MovieBasicDTO;
}

export function Hero ({movie}: Props) {
  const [trailer, setTrailer] = useState<Trailer>({} as Trailer);
  const [isLoading, setIsLoading] = useState(true);

  async function getTrailer(movieId: number) {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN_V4}`
        }
      });

      if (data.id && data.results) {
        const trailer = (data.results as Trailer[]).find(vid => vid.name === "Official Trailer");

        console.log(trailer);
        setTrailer(trailer ? trailer : data.videos.results[0])
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(movie.id) getTrailer(movie.id);
  }, [movie.id]);
  
  return (
    <div>
      <Heading 
        componentTag="h3" 
        variant="secundary"
        title="Popular na semana"  
      />
      
      <div className="w-full flex flex-col gap-4 bg-gray-1 p-4 border-[1px] border-white/10  max-w-[1010px] mb-8">
        {/* Info */}

        {isLoading && (
          <div className="min-h-[120px] w-full flex self-center items-center justify-center">
            <Loading />
          </div>
        )}

        {!isLoading && (
          <>
            <div className="flex flex-col gap-2">
              <Star voteAverage={movie.vote_average} voteCount={movie.vote_count} />

              <Heading 
                componentTag="h1" 
                variant="primary"
                title={movie.title}  
              />

              <Text 
                text={movie.overview}
              />

              <GenericLink url={`/movie/${movie.id}`} />
            </div>

            {/* Trailer */}
            <div className="flex w-full">
          
              <YouTube
                videoId={trailer.key}
                opts={
                  {
                    width: '100%',
                    height: '100%',
                  }
                }
                style={{ width: '100%', height: '240px'}}
              />
            </div>
          </>
        )}

      </div>
    </div>
  )
}