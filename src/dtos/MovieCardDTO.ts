export interface MovieCardDTO {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  isFavorite: boolean;
}