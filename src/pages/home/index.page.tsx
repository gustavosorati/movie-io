import axios from 'axios';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { useMovie } from '@/hooks/useMovie'
import { Loading } from '@/components/Loading';
import { Movie } from '@/components/Movie/Movie';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { SearchInput } from '@/components/Search/SearchInput'
import { Hero } from './components/Hero';
import { MovieBasicDTO } from '@/dtos/MovieDTO';


export default function Home() {
  const {movieCards, getMovies, currentPage, setCurrentPage, isLoading} = useMovie();
  const [trendingWeekMovie, setTrendingWeekMovie] = useState<MovieBasicDTO>({} as MovieBasicDTO);

  const router = useRouter();

  async function getTrendingMovie() {
    try {
      const {data } = await axios.get("https://api.themoviedb.org/3/trending/movie/week?language=pt-BR", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN_V4}`
        }
      });

      setTrendingWeekMovie(data.results[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrendingMovie();
  }, []);

  useEffect(() => {
    if(router.isReady) {
      let page = router.query?.page as string | undefined || '1';
      getMovies(page);
    } 
  }, [router.isReady, router.query, getMovies]);

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
            
            {/* Hero */}
            <Hero movie={trendingWeekMovie} />

            {/* Title */}
            <header>
              <h3 className='text-white/40 text-lg font-bold mb-10'>Popular Movies</h3>
            </header>

            {/* -> List Movies */}
            <section className='self-center flex flex-col flex-wrap gap-10 mb-8 sm:flex-row'>
              {isLoading
                ? <Loading />
                : (
                  <>
                    {movieCards.map((movie, index) => (
                    <Movie 
                      key={movie.id + movie.title} 
                      movie={movie} 
                      id={movie.id} 
                    />
                    ))}
                  </>
                )
              } 
            </section>
              
            <Pagination 
              total_pages={100} 
              current_page={currentPage ? currentPage : 1} 
              update_page={setCurrentPage}
            />
          </div>
        </div>
      </main>
    </>
  )
}
