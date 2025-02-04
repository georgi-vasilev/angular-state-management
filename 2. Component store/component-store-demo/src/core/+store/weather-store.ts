import { WeatherState } from "./weather-state";
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap, catchError, delay, filter } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherService } from "../services/weather-service";

@Injectable()
export class WeatherDashboardStore extends ComponentStore<WeatherState> {
  constructor(private weatherService: WeatherService) {
    super({
      city: '',
      forecast: null,
      loading: false,
      error: null,
      favorites: ['Sofia', 'Johannesburg', 'Otawa', 'Tokyo'],
    });
  }

  public getCurrentCity(): string {
    return this.get().city;
  }

  // selectors
  readonly city$ = this.select((state) => state.city);
  readonly forecast$ = this.select((state) => state.forecast);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);
  readonly favorites$ = this.select((state) => state.favorites);

  // reducers
  readonly setCity = this.updater<string>((state, city) => ({
    ...state,
    city,
  }));

  readonly setLoading = this.updater<boolean>((state, loading) => ({
    ...state,
    loading,
    error: null,
  }));

  readonly setForecast = this.updater<any>((state, forecast) => ({
    ...state,
    forecast,
    loading: false,
    error: null,
  }));

  readonly setError = this.updater<string>((state, error) => ({
    ...state,
    loading: false,
    error,
  }));

  readonly addFavorite = this.updater<string>((state, favoriteCity) => ({
    ...state,
    favorites: state.favorites.includes(favoriteCity)
      ? state.favorites
      : [...state.favorites, favoriteCity],
  }));

  readonly removeFavorite = this.updater<string>((state, city) => ({
    ...state,
    favorites: state.favorites.filter((fav) => fav !== city),
  }));

  // effects
  readonly getForecast = this.effect<string>((cityName$) =>
    cityName$.pipe(
      tap((cityName) => {
        this.setCity(cityName);
        this.setLoading(true);
      }),
      switchMap(cityName =>
        this.weatherService.getCoordinates(cityName).pipe(
          catchError((_error) => {
            this.setError('Invalid city name or geocoding failed');
            return of(null);
          })
        )
      ),
      filter(
        (coords): coords is { lat: number; lon: number } =>
          coords !== null && coords !== undefined
      ),
      switchMap(({ lat, lon }) =>
        this.weatherService.getForecast(lat, lon).pipe(
          delay(2000), // artificial delay to simulate longer processing
          catchError((_error) => {
            this.setError('Unable to fetch forecast');
            return of(null);
          })
        )
      ),
      tap((forecast) => {
        if (forecast) {
          this.setForecast(forecast);
        }
      })
    )
  );
}

