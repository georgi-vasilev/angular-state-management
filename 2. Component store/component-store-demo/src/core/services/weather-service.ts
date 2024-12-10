import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getCoordinates(cityName: string): Observable<{ lat: number; lon: number }> {
    return of({ lat: 59.9139, lon: 10.7522 });
  }

  getForecast(lat: number, lon: number): Observable<any> {
    const headers = new HttpHeaders({
      'User-Agent': 'MyWeatherApp/1.0 contact:myemail@example.com'
    });

    const url = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`;
    return this.http.get<any>(url, { headers });
  }
}
