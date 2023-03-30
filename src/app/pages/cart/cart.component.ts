import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subject, BehaviorSubject, takeUntil, map, forkJoin, observable, tap } from 'rxjs';
import { ICart } from '../../core/interface/interface.cart';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/interface/interfaceProduct';
import { storageService } from '../../core/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy,OnChanges {
  constructor(
    private cartService:CartService,
    private productService:ProductService,
    private storageService:storageService
    ) { }
   
    productIdsInCart:string[]=[];

    productsInCart=this.cartService.productInCart$

  ngOnInit():void{

  }

ngOnChanges(productIdsInCart: SimpleChanges): void {
  console.log('change happend')
}

  decriment(productId:string|undefined) {
    if(productId)
     this.cartService.deleteFormCart(productId)
      }

 increment(productId:string|undefined) {
  if(productId)
   this.cartService.addToCart(productId)
    }

  ngOnDestroy(): void {
    // this.unsubscribe$.next(null);
    // this.unsubscribe$.complete();
  }
 }
