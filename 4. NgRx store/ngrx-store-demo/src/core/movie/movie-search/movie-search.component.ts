import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { searchMovies } from '../+store/movie.actions';

@Component({
  selector: 'app-movie-search',
  standalone: false,
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss'
})
export class MovieSearchComponent {
  searchTerm = '';

  constructor(private store: Store) { }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.store.dispatch(searchMovies({ query: this.searchTerm }));
    }
  }
}

