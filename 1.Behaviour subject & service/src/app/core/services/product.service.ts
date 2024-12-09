import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, shareReplay, map } from "rxjs";
import { IApiResponse, IProduct } from "../product.model";

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsUrl = 'https://fakestoreapi.in/api/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IApiResponse>(this.productsUrl).pipe(
      map(response => response.products),
      shareReplay(1)
    )
  }
}
