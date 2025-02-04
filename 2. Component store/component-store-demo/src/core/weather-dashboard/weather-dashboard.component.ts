import { Component } from '@angular/core';
import { WeatherDashboardStore } from '../+store/weather-store';

@Component({
  selector: 'app-weather-dashboard',
  templateUrl: './weather-dashboard.component.html',
  styleUrls: ['./weather-dashboard.component.scss'],
  providers: [WeatherDashboardStore] // provide store at component level
})
export class WeatherDashboardComponent {
  cityName = '';

  city$ = this.store.city$;
  forecast$ = this.store.forecast$;
  loading$ = this.store.loading$;
  error$ = this.store.error$;

  constructor(private store: WeatherDashboardStore) { }

  onCityChange(newCity: string): void {
    this.cityName = newCity
    this.store.setCity(newCity);
  }

  getForecast() {
    const currentCity = this.store.getCurrentCity();
    this.store.getForecast(currentCity);
  }

  addToFavorites() {
    const currentCity = this.store.getCurrentCity();
    this.store.addFavorite(currentCity);
  }
}

