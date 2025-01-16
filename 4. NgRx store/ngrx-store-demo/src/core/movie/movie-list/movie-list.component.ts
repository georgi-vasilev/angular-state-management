import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../+store/movie';
import { Store } from '@ngrx/store';
import { selectAllMovies, selectError, selectLoading } from '../+store/movie.selectors';
import { getMovieDetails } from '../+store/movie.actions';

@Component({
  selector: 'app-movie-list',
  standalone: false,
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies$: Observable<Movie[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.movies$ = this.store.select(selectAllMovies);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  onSelectMovie(imdbID: string) {
    this.store.dispatch(getMovieDetails({ imdbID }));
  }
}
