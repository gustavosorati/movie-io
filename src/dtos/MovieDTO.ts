import { CastDTO } from "./CastDTO";

export interface MovieDTO {
  details: {
    id: number;
    imdb_id: string
    genres: [
      { name: string }
    ]
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    vote_counter: number;
    popularity: number;
    runtime: number;
    vote_count: number;
    budget: number;
    revenue: number;
  }
  cast: CastDTO[]
}