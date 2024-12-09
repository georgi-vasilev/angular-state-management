import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart$!: Observable<IProduct[]>;
  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cart.cart$;
  }

}
