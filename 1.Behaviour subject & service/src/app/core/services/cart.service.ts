import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IProduct } from "../product.model";

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSource = new BehaviorSubject<IProduct[]>([]);
  public cart$ = this.cartSource.asObservable();

  public updateCart(product: IProduct): void {
    const exists: IProduct | undefined = this.cartSource.value
      .find(x => x.id === product.id)
    if (exists) {
      const updatedCart = this.cartSource.value
        .map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1, price: p.price * p.quantity } : p
        );
      this.cartSource.next(updatedCart);
    } else {
      const updatedCart = [...this.cartSource.value, product];
      product.quantity = 1;
      this.cartSource.next(updatedCart);
    }
  }

  public removeProduct(product: IProduct): void {
    const updatedCart = this.cartSource.value
      .filter(p => p.id !== product.id);
    this.cartSource.next(updatedCart);
  }
}
