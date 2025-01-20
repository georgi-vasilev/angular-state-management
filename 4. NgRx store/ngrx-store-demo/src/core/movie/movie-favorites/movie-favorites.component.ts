import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectFavorites } from '../+store/movie.selectors';
import { removeFavorite } from '../+store/movie.actions';
import { Movie } from '../+store/movie';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-favorites',
  templateUrl: './movie-favorites.component.html',
  styleUrls: ['./movie-favorites.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class MovieFavoritesComponent {
  favorites$: Observable<Movie[]>;

  constructor(private store: Store) {
    this.favorites$ = this.store.select(selectFavorites);
  }

  onRemoveFavorite(imdbID: string) {
    this.store.dispatch(removeFavorite({ imdbID }));
  }
}

