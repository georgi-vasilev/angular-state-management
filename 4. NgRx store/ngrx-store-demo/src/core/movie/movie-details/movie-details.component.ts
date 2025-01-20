import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../+store/movie';
import { Store } from '@ngrx/store';
import { selectSelectedMovie } from '../+store/movie.selectors';
import { addFavorite } from '../+store/movie.actions';

@Component({
  selector: 'app-movie-details',
  standalone: false,
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {
  selectedMovie$: Observable<Movie | null>;

  constructor(private store: Store) {
    this.selectedMovie$ = this.store.select(selectSelectedMovie);
  }

  onFavoriteClick(movie: Movie) {
    this.store.dispatch(addFavorite({ movie }));
  }

}
