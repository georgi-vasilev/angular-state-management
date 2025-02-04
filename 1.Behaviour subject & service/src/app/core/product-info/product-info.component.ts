import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  @Input() product!: IProduct;

  constructor(private cart: CartService) { }

  ngOnInit(): void { }

  addToCart(product: IProduct): void {
    this.cart.updateCart(product);
  }

  viewProduct(product: IProduct): void { }

}
