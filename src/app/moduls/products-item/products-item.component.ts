import { Component, OnInit,Input } from '@angular/core';
import { IProduct } from '../../core/interface/interfaceProduct';
import { AuthService } from '../../core/services/auth.service';
import { storageService } from '../../core/services/storage.service';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.scss']
})
export class ProductsItemComponent implements OnInit {

  @Input() product!:IProduct;

  constructor(
    private storageService:storageService,
    private cartService:CartService,
    private productService:ProductService,
    private authService:AuthService,
    private route:Router
  ) { }

  ngOnInit(): void {

  }

  add(productId:string|undefined):void {
    if(productId && this.authService.isAuth$.getValue()){
      this.cartService.addToCart(productId);
    }
    else{
      this.route.navigate(['/auth/login'])
    }
  }

}
