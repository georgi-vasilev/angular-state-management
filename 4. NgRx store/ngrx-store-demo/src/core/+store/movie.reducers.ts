import { createReducer, on } from '@ngrx/store';
import { MovieState } from './movie.state';
import { getMovieDetails, getMovieDetailsFailure, getMovieDetailsSuccess, searchMovies, searchMoviesFailure, searchMoviesSuccess } from './movie-actions';

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null
};

export const movieReducer = createReducer(
  initialState,

  on(searchMovies, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(searchMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies,
    loading: false
  })),
  on(searchMoviesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(getMovieDetails, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(getMovieDetailsSuccess, (state, { movie }) => ({
    ...state,
    selectedMovie: movie,
    loading: false
  })),
  on(getMovieDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

