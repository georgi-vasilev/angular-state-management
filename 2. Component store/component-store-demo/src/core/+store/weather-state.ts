export interface WeatherState {
  city: string;
  forecast: any | null;
  loading: boolean;
  error: string | null;
  favorites: string[];
}
