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

  forecast$ = this.store.forecast$;
  loading$ = this.store.loading$;
  error$ = this.store.error$;

  constructor(private store: WeatherDashboardStore) {}

  getForecast() {
    this.store.getForecast(this.cityName);
  }
}

