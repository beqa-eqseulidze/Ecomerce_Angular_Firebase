import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../../core/interface/interface.cart';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/interface/interfaceProduct';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:Observable<IProduct[]>=this.cartService.getCart();
  constructor(
    private cartService:CartService,
    private productService:ProductService
  ) { }

  ngOnInit(): void {

  }

 }
