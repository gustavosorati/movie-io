import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { api } from "@/lib/axios";
import { FavoriteMovieDTO } from "@/dtos/MovieDTO";

import { Movie } from "@/components/Movie/Movie";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Loading } from "@/components/Loading";
import { useMovie } from "@/hooks/useMovie";

export default function Favorites() {
  const {favoriteMovies, getFavoriteMovies} = useMovie();
  const [isLoading, setIsLoading] = useState(false);
 
  return (
    <main className="w-full flex">
        
        {/* Menu */}
        <Sidebar />

        {/* Content */}
        <div className='py-20 px-3 w-full flex flex-col sm:px-16 sm:max-w-[1010px] m-auto'>
          
          <header>
            <h3 className='text-white/40 text-lg font-bold mb-10'>Favorite Movies</h3>
          </header>

          {isLoading 
            ? (
              <div className="flex items-center justify-center h-screen">
                <Loading />
              </div>
            ) : (
            <section className='self-center flex flex-col flex-wrap gap-10 mb-8 sm:flex-row'>
              {favoriteMovies.length > 0 ? favoriteMovies.map((movie, index) => (
                <Movie 
                  key={movie.id + movie.title} 
                  movie={movie} 
                  id={movie.tmdb_id}
                />
              )) : <p>Você ainda não adicionou filmes favoritos</p>}
            </section>
          )}
        </div>
    </main>
  )
}
