import { useContext } from "react";
import { MoviesContext } from "@/context/MoviesContext";

export function useMovie() {
  const context = useContext(MoviesContext);

  return context;
}