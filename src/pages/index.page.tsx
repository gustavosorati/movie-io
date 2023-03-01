import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'

import axios from 'axios'
import { api } from '@/lib/axios'
import { FavoriteMovieDTO } from '@/dtos/MovieDTO'

import { Movie } from '@/components/Movie/Movie'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Pagination } from '@/components/Pagination'
import { SearchInput } from '@/components/Search/SearchInput'

interface IMovieBasicData {
  id: number;
  tmdb_id: number;
  title: string;
  original_title: string;
  language: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  isFavorite: boolean;
}

interface IRequest {
  results: Omit<IMovieBasicData, "isFavorite">[],
  page: number,
  total_pages: number
}

export default function Home({results, page, total_pages}: IRequest) {

  const [movies, setMovies] = useState<IMovieBasicData[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovieDTO[]>([]); 

  async function synchroMovies() {   
    if(favoriteMovies && favoriteMovies.length > 0) {
      const auxMovies = [...movies];
      const auxFavorites = [...favoriteMovies]; 

      auxMovies.forEach(auxMovie => {
        auxFavorites.forEach(favorite => {
          if(favorite.tmdb_id === auxMovie.id) {
            auxMovie.isFavorite = true
          }
        })
      })      
    }
  }

  async function getFavoriteListOfMovies() {
    try {
      const {data} = await api.get('/movies/favorites');
      const favoriteList: FavoriteMovieDTO[] = data;
      
      setFavoriteMovies(favoriteList);      
    } catch (error) {
      console.log("Error on getFavoriteMovies => ", error)
    }
  } 

  useEffect(() => {
    const moviesRequest = results.map(movie => {
      return {
        ...movie,
        isFavorite: false
      }
    });

    setMovies(moviesRequest);
  }, [results]);

  useEffect(() => {
    getFavoriteListOfMovies()
  }, [page]);

  useEffect(() => {
    synchroMovies()
  }, [favoriteMovies, movies]);

  return (
    <>
      <Head>
        <title>Movie.io | Home</title>
        <meta name="description" content="Movie.io" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full flex">

        <Sidebar />

        {/* Content */}
        <div className='py-20 px-3 w-full flex flex-col sm:px-16'>

          <div className='w-full flex flex-col sm:max-w-[1010px] m-auto'>
          
            {/* Search */}
            <SearchInput />

            {/* Title */}
            <header>
              <h3 className='text-white/40 text-lg font-bold mb-10'>Popular Movies</h3>
            </header>

            {/* -> List Movies */}
            <section className='self-center flex flex-col flex-wrap gap-10 mb-8 sm:flex-row'>
              {movies.map((movie, index) => (
                <Movie key={movie.id + movie.title} movie={movie} id={movie.id}  />
              ))}
            </section>
              
            {/* Pagination */}
            <Pagination total_pages={total_pages} current_page={page} />
          </div>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const {page} = query
  
  const {data} = await axios.get<IRequest>(`https://api.themoviedb.org/3/movie/popular?language=pt-Br&page=${page ? page : 1}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN_V4}`
    }
  });

  return {
    props: data
  }
}