import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { movieReducer } from './+store/movie.reducers';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './+store/movie.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([MovieEffects]),
    StoreModule.forFeature('movies', movieReducer)
  ]
})
export class MovieModule { }
