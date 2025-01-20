import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFavoriteComponent } from 'src/core/movie/edit-favorite/edit-favorite.component';
import { MovieFavoritesComponent } from 'src/core/movie/movie-favorites/movie-favorites.component';
import { MovieHomeComponent } from 'src/core/movie/movie-home/movie-home.component';

const routes: Routes = [
  {
    path: '',
    component: MovieHomeComponent,
  },
  { path: 'favorites', component: MovieFavoritesComponent },
  {
    path: 'favorites/:imdbID/edit',
    component: EditFavoriteComponent,
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
