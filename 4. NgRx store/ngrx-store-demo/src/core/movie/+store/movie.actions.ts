import { createAction, props } from '@ngrx/store';
import { Movie } from './movie';

export const searchMovies = createAction(
  '[Movie Page] Search Movies',
  props<{ query: string }>()
);

export const searchMoviesSuccess = createAction(
  '[Movie API] Search Movies Success',
  props<{ movies: Movie[] }>()
);

export const searchMoviesFailure = createAction(
  '[Movie API] Search Movies Failure',
  props<{ error: string }>()
);

export const getMovieDetails = createAction(
  '[Movie Page] Get Movie Details',
  props<{ imdbID: string }>()
);

export const getMovieDetailsSuccess = createAction(
  '[Movie API] Get Movie Details Success',
  props<{ movie: Movie }>()
);

export const getMovieDetailsFailure = createAction(
  '[Movie API] Get Movie Details Failure',
  props<{ error: string }>()
);

