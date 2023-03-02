import Head from "next/head";
import { GetServerSideProps } from "next";

import axios from "axios";
import { MovieDTO } from "@/dtos/MovieDTO";

import { MovieHero } from "./components/MovieHero";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { ActorsCarousel } from "./components/ActorsCarousel";
import { MovieExtraInfo } from "./components/MovieExtraInfo";
import { SearchInput } from "@/components/Search/SearchInput";

export default function MovieDetails(movie: MovieDTO) {
  return (
    <>
      <Head>
        <title>Movie.io | {movie.details.title}</title>
        <meta name="description" content="Movie.io" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full flex">

        {/* Menu */}
        <Sidebar />

        {/* Content */}
        <div className='py-20 px-3 w-full flex flex-col sm:px-16'>
          <div className='w-full flex flex-col gap-4 sm:max-w-[1010px] m-auto'>
            
            <SearchInput />

            <MovieHero movie={movie} />

            <ActorsCarousel movie={movie} />

            <MovieExtraInfo movie={movie} />
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {id} = query;

  const {data: movieDetails} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN_V4}`
    }
  });

  if(!movieDetails) return {
    props: {}
  }

  const {data: movieCast} = await axios.get(`https://api.themoviedb.org/3/movie/${movieDetails.id}/credits`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN_V4}`
    }
  });

  return {
    props: {
      details: movieDetails,
      cast: movieCast.cast
    }
  }
}
