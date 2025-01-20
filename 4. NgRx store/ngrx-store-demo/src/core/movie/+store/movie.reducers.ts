import { createReducer, on } from '@ngrx/store';
import { MovieState } from './movie.state';
import { addFavorite, getMovieDetails, getMovieDetailsFailure, getMovieDetailsSuccess, removeFavorite, searchMovies, searchMoviesFailure, searchMoviesSuccess, updateFavorite, updateFavoriteSuccess } from './movie.actions';

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  loading: false,
  error: null,
  favorites: [],
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
    movies: [...movies],
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
  })),
  on(addFavorite, (state, { movie }) => {
    const isInFavorites = state.favorites.some(fav => fav.imdbID === movie.imdbID);
    if (isInFavorites) {
      return state;
    }

    return {
      ...state,
      favorites: [...state.favorites, movie]
    };
  }),

  on(removeFavorite, (state, { imdbID }) => {
    return {
      ...state,
      favorites: state.favorites.filter(m => m.imdbID !== imdbID)
    };
  }),
  on(updateFavorite, (state, { imdbID, changes }) => {
    return {
      ...state,
      favorites: state.favorites.map(movie =>
        movie.imdbID === imdbID ? { ...movie, ...changes } : movie
      )
    };
  })
);

