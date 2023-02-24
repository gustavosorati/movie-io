import { Box } from "@/components/Box";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import axios from "axios";
import { GetServerSideProps } from "next";

import { ActorsCarousel } from "./components/ActorsCarousel";
import { MovieHero } from "./components/MovieHero";
import { MovieDTO } from "@/dtos/MovieDTO";

export default function MovieDetails(movie: MovieDTO) {
  console.log(movie)
  return (
    <main className="w-full flex">
      <Sidebar />

      <div className='flex flex-col gap-8 items-center w-full p-20'>
        <MovieHero movie={movie} />

        <div className="w-full max-w-[968px] grid grid-cols-[1fr_260px] gap-4">
          <ActorsCarousel movie={movie} />
          
          <Box classNames="flex-col gap-4">
            <div className="flex flex-col">
              <strong>Data de Lançamento</strong>
              <p>{movie.details.release_date}</p>
            </div>

            <div className="flex flex-col">
              <strong>Idioma original</strong>
              <p>{movie.details.original_language}</p>
            </div>

            <div className="flex flex-col">
              <strong>Orçamento</strong>
              <p>{Intl.NumberFormat("pt-BR", {
                currency: "USD",
                style: "currency"
              }).format(movie.details.budget)}</p>
            </div>

            <div className="flex flex-col">
              <strong>Receita</strong>
              <p>{Intl.NumberFormat("pt-BR", {
                currency: "USD",
                style: "currency"
              }).format(movie.details.revenue)}</p>
            </div>

          </Box>
        </div>

      </div>
    </main>
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

  // const {data: watchProviders} = await axios.get(`https://api.themoviedb.org/3/movie/${id}/watch/providers`, {
  //   headers: {
  //     Authorization: `Bearer ${process.env.TMDB_TOKEN_V4}`
  //   }
  // })

  // console.log(watchProviders)

  return {
    props: {
      details: movieDetails,
      cast: movieCast.cast
    }
  }
}