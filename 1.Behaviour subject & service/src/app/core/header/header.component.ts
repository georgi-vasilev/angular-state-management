import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart$!: Observable<IProduct[]>;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cart$ = this.productService.cart$;
  }

}
