import { WeatherState } from "./weather-state";

import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { switchMap, tap, catchError } from 'rxjs/operators';
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
    });
  }

  // selectors
  readonly city$ = this.select((state) => state.city);
  readonly forecast$ = this.select((state) => state.forecast);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);

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

  // effects
  readonly getForecast = this.effect<string>((cityName$) =>
    cityName$.pipe(
      tap(() => this.setLoading(true)),
      switchMap((cityName) =>
        this.weatherService.getCoordinates(cityName)
          .pipe(
            switchMap(({ lat, lon }) =>
              this.weatherService.getForecast(lat, lon)
                .pipe(
                  tap((forecast) => this.setForecast(forecast)),
                  catchError((_) => {
                    this.setError('Unable to fetch forecast');
                    return of(null);
                  })
                )
            ),
            catchError((_) => {
              this.setError('Invalid city name or geocoding failed');
              return of(null);
            })
          )
      )
    )
  );
}

