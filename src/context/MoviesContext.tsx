import { MovieCardDTO } from "@/dtos/MovieCardDTO";
import { api } from "@/lib/axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import {MovieDTO, FavoriteMovieDTO} from '../dtos/MovieDTO';

interface ContextData {
  movieCards: MovieCardDTO[];
  favoriteMovies: FavoriteMovieDTO[];
  getMovies: (page?: string) => Promise<void>;
  getFavoriteMovies: () => Promise<void>;

  currentPage: number;
  setCurrentPage: (new_page: number) => void;

  isLoading: boolean;
}

type ProviderProps = {
  children: ReactNode
}

export const MoviesContext = createContext<ContextData>({} as ContextData);

export const MoviesContextProvider = ({children}: ProviderProps) => {
  const [movieCards, setMovieCards] = useState<MovieCardDTO[]>([]);
  const [favoriteMovies, setFavoriteMovies] = useState<FavoriteMovieDTO[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [isLoading, setIsLoading] = useState(true);
  

  
  const getMovies = useCallback(async (page?: string) => {
    try {
      setIsLoading(true)
      console.log('CURRENT PAGE ATUALIZOU, ENTRANDO => getMovies');
      const { data } = await api.get(`/movies/get-movies?page=${page}`);
        
      setMovieCards(data.movies);
      setCurrentPage(data.page);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFavoriteMovies = useCallback(async () => { 
    try {
      console.log('CURRENT PAGE ATUALIZOU, ENTRANDO => getFavoriteMovies');

      const {data} = await api.get('/movies/favorites');
      
      setFavoriteMovies(data);
    } catch (error) {
      console.log(error)
    } 
  }, []);

  useEffect(() => {
    getFavoriteMovies();
  }, [getFavoriteMovies]);

  console.log(currentPage);
  return (
    <MoviesContext.Provider value={{
      movieCards,
      getMovies,

      favoriteMovies,
      getFavoriteMovies,

      currentPage,
      setCurrentPage,

      isLoading
    }}>
      {children}
    </MoviesContext.Provider>
  )
}

