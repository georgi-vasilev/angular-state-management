import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './+store/movie.effects';
import { movieReducer } from './+store/movie.reducers';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MovieSearchComponent } from './movie-search/movie-search.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MovieHomeComponent } from './movie-home/movie-home.component';

@NgModule({
  declarations: [
    MovieSearchComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieHomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    EffectsModule.forFeature([MovieEffects]),
    StoreModule.forFeature('movies', movieReducer)
  ],
  exports: [
    MovieSearchComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MovieHomeComponent,
  ],
})
export class MovieModule { }
