import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent {
  constructor(private productService: ProductService){}

  @Input() product!: IProduct;
  @Output() productRemoved = new EventEmitter<number>();

  removeProduct(product: IProduct) {
    this.productService.removeProduct(product);
  }

}
