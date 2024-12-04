import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<IProduct[]>;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cartItems$ = this.productService.cart$;
  }

}
