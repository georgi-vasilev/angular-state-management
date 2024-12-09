import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  constructor(private cart: CartService) { }

  price: number = 0;

  @Input() product!: IProduct;
  @Output() productRemoved = new EventEmitter<number>();

  ngOnInit(): void{
    this.price = this.product.price * this.product.quantity;
  }

  incrementQuantity(product: IProduct): void {
    product.quantity += 1;
    this.price = this.product.price * this.product.quantity;
  }

  decrementQuantity(product: IProduct): void {
    if (product.quantity <= 1) {
      this.removeProduct(product)
      return;
    }
    product.quantity -= 1;
    this.price = this.product.price * this.product.quantity;
  }

  removeProduct(product: IProduct) {
    this.cart.removeProduct(product);
  }

}
