import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MovieState } from '../+store/movie.state';

export const selectMovieState = createFeatureSelector<MovieState>('movies');

export const selectAllMovies = createSelector(
  selectMovieState,
  (state) => state.movies
);

export const selectSelectedMovie = createSelector(
  selectMovieState,
  (state) => state.selectedMovie
);

export const selectLoading = createSelector(
  selectMovieState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectMovieState,
  (state) => state.error
);

