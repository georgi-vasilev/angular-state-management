import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  @Input() product!: IProduct;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  public addToCart(product: IProduct): void {
    this.productService.updateCart(product);
  }

  public viewProduct(product: IProduct): void {
  }

}
