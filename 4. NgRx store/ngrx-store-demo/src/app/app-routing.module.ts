import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieFavoritesComponent } from 'src/core/movie/movie-favorites/movie-favorites.component';
import { MovieHomeComponent } from 'src/core/movie/movie-home/movie-home.component';

const routes: Routes = [
  {
    path: '',
    component: MovieHomeComponent,
  },
  { path: 'favorites', component: MovieFavoritesComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
