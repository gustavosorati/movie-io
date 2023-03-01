import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { api } from "@/lib/axios";
import { FavoriteMovieDTO } from "@/dtos/MovieDTO";

import { Movie } from "@/components/Movie/Movie";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export default function Favorites() {

  const session = useSession();
  const [movies, setMovies] = useState<FavoriteMovieDTO[]>([])
  const [isUpdated, setIsUpdated] = useState(false);

  async function getFavoriteMovies() {
    try {
      const response = await api.get('/movies/favorites');

      setMovies(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  // const setOrDeleteFavoriteMovie(movie: any) {
  //   try {
  //     await api.post('/movies/create', {
  //       movie,
  //       id
  //     });    
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    getFavoriteMovies();
  }, [isUpdated]);

  return (
    <main className="w-full flex">

        {/* Menu */}
        <Sidebar />

        {/* Content */}
        <div className='py-20 px-3 w-full flex flex-col sm:px-16 sm:max-w-[1010px] m-auto'>
          
          <header>
            <h3 className='text-white/40 text-lg font-bold mb-10'>Popular Movies</h3>
          </header>

          {/* -> List Movies */}
          <section className='self-center flex flex-col flex-wrap gap-10 mb-8 sm:flex-row'>
            {movies.map((movie, index) => (
              <Movie 
                key={movie.id + movie.title} 
                movie={movie} 
                id={movie.tmdb_id} 
              />
            ))}
          </section>
        </div>
    </main>
  )
}
