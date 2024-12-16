import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCoordinates(cityName: string): Observable<{ lat: number; lon: number }> {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}`;
    return this.http.get<any>(url).pipe(
      map((response: any)=> {
        if (response && response.results && response.results.length > 0) {
          const place = response.results[0];
          return { lat: place.latitude, lon: place.longitude };
        } else {
          throw new Error('No coordinates found');
        }
      })
    );
  }
  getForecast(lat: number, lon: number): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'MyWeatherApp/1.0 contact:myemail@example.com'
    });

    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    return this.http.get<any>(url, { headers });
  }
}
