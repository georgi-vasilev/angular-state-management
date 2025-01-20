import { Movie } from "./movie";

export interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  loading: boolean;
  error: string | null;
  favorites: Movie[];
}

