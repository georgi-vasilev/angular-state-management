import { Component } from '@angular/core';
import { WeatherDashboardStore } from '../+store/weather-store';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  favorites$ = this.store.favorites$;

  constructor(private store: WeatherDashboardStore) { }

  selectCity(city: string) {
    this.store.setCity(city);
    this.store.getForecast(city);
  }

  removeFavorite(favorite: string) {
    this.store.removeFavorite(favorite);
  }
}
