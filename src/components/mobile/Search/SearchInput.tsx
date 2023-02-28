import axios from "axios";
import { ChangeEvent, useRef, useState} from "react";
import { MagnifyingGlass } from "phosphor-react";
import { SearchResults } from "./SearchResults";

export function SearchInput () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);  
  
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (!value) return;

    try {
      setIsLoading(true);
      
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNmI4Yjc3MWUyNGEyNmY3MTVlOTYyMjMzZDBjMDkyMCIsInN1YiI6IjYwYWFiM2NmMmRkYTg5MDA2ZWJhYzNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WtNMVZOq59OqBGEJ9v6r_9MfZSXZFBaZlQd_nb4D8M8`
        }
      })

      setMovies(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function clearInput() {
    // inputRef.current!.value = '';
    // setMovies([]);
  }

  return (
      <div className="relative flex gap-4 items-center w-full max-w-[350px] py-3 px-3 rounded-md bg-gray-1 border-2 border-white/10 focus-within:border-s-green-100 mb-4">
        
        <MagnifyingGlass size={24} weight="bold" />
        
        <input 
          type="text"
          className="bg-transparent placeholder:text-gray-400 outline-none text-gray-400 w-full"
          onChange={handleInputChange}
          onBlur={clearInput}
          placeholder="Informe o filme" 
          ref={inputRef}
        />

        <SearchResults movies={movies} />
      </div>
  )
}

SearchInput.displayName = 'SearchInput';