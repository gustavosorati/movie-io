import Head from 'next/head'

import { useMovie } from '@/hooks/useMovie'
import { Movie } from '@/components/Movie/Movie';
import { Pagination } from '@/components/Pagination';
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { SearchInput } from '@/components/Search/SearchInput'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Loading } from '@/components/Loading';

export default function Home() {
  const {movieCards, getMovies, currentPage, setCurrentPage, isLoading} = useMovie();

  const router = useRouter();

  useEffect(() => {
    if(router.isReady) {
      let page = router.query?.page as string | undefined || '1';
      getMovies(page);
    } 
  }, [router.isReady, router.query, getMovies]);

  // useEffect(() => {
  //   getMovies();
  // }, [getMovies]);

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

// export const getServerSideProps: GetServerSideProps = async ({query}) => {
//   const {page} = query;
  
//   // const {data} = await axios.get(`https://api.themoviedb.org/3/movie/popular?language=pt-Br&page=${page ? page : 1}`, {
//   //   headers: {
//   //     Authorization: `Bearer ${process.env.TMDB_TOKEN_V4}`
//   //   }
//   // });

//   // console.log(data)
//   return {
//     props: {
//       page: page ? page : 1
//     }
//   }
// }