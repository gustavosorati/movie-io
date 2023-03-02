import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState} from "react";
import { MagnifyingGlass, X } from "phosphor-react";
import { SearchResults } from "./SearchResults";
import { MovieBasicDTO } from "@/dtos/MovieDTO";

export function SearchInput () {
  const [movies, setMovies] = useState<MovieBasicDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);  
  const [isActive, setIsActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null)

  async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (!value) setMovies([]);

    try {
      setIsLoading(true);
      
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI4Yjc3MWUyNGEyNmY3MTVlOTYyMjMzZDBjMDkyMCIsInN1YiI6IjYwYWFiM2NmMmRkYTg5MDA2ZWJhYzNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WtNMVZOq59OqBGEJ9v6r_9MfZSXZFBaZlQd_nb4D8M8`
        }
      });

      setMovies(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function clearInput() {
    inputRef.current!.value = '';
    setMovies([]);
  }

  console.log(isActive)
  return (
      <div 
        className="relative flex gap-4 items-center w-full max-w-[350px] py-3 px-3 rounded-md bg-gray-1 border-2 border-white/10 focus-within:border-s-green-100 mb-4"
      >
        
        <MagnifyingGlass size={24} weight="bold" />
        
        <input 
          type="text"
          className="flex-1 bg-transparent placeholder:text-gray-400 outline-none text-gray-400 w-full"
          onChange={handleInputChange}
          placeholder="Informe o filme" 
          ref={inputRef}
        />

          {movies.length > 0 && <X size={16} onClick={clearInput} className="cursor-pointer" />}

          <SearchResults movies={movies} />
      </div>
  )
}

SearchInput.displayName = 'SearchInput';