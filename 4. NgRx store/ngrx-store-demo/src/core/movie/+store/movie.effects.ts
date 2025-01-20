import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as MovieActions from './movie.actions';
import { Movie } from './movie';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class MovieEffects {
  private apiKey = environment.api_key;
  private baseUrl = `https://www.omdbapi.com/?apikey=${this.apiKey}`;

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.searchMovies),
      switchMap(({ query }) => {
        return this.http.get<{ Search: Movie[] }>(`${this.baseUrl}&s=${query}`).pipe(
          map(response => {
            const movies = response.Search || [];
            return MovieActions.searchMoviesSuccess({ movies });
          }),
          catchError(error => of(MovieActions.searchMoviesFailure({ error: error.message })))
        );
      })
    )
  );

  getMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getMovieDetails),
      switchMap(({ imdbID }) => {
        return this.http.get<Movie>(`${this.baseUrl}&i=${imdbID}`).pipe(
          map(movie => MovieActions.getMovieDetailsSuccess({ movie })),
          catchError(error => of(MovieActions.getMovieDetailsFailure({ error: error.message })))
        );
      })
    )
  );

  updateFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.updateFavorite),
      map(() => MovieActions.updateFavoriteSuccess())
    )
  );

  navigateAfterUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(MovieActions.updateFavoriteSuccess),
        tap(() => this.router.navigate(['/favorites']))
      ),
    { dispatch: false }
  );}

