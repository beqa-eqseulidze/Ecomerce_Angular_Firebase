import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../interface/interfaceProduct';
import { storageService } from './storage.service';
import { ICart } from '../interface/interface.cart';
import { ProductService } from './product.service';
import { IsAuthGuard } from '../guards/is-auth.guard';
import { Subject, takeUntil, Observable, BehaviorSubject, of, map, from, forkJoin, observable } from 'rxjs';
import { IProductInCart } from '../interface/interface.product.in.cart';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit,OnDestroy{

  constructor(
    private storageService:storageService,
    private productService:ProductService
    ) {
      // this.cartOwner.subscribe(cartOwner=>this.cartOwnerValue='cart-'+ cartOwner)
     }
  ngOnInit(): void {
    // console.log('call cartServis oninit')
  }
  cartOwner:BehaviorSubject<string>=new BehaviorSubject<string>('');

  cartOwnerValue:string='cart-'+localStorage.getItem('email')||''

  unsubscribe$:Subject<any>=new Subject<any>();

  productInCart$:BehaviorSubject<IProductInCart[]>=new BehaviorSubject<IProductInCart[]>([]);;

  carts$:BehaviorSubject<ICart[]>=new BehaviorSubject<ICart[]>(this.storageService.getItem('cart-'+localStorage.getItem('email')));

addToCart(productId:string):ICart[]{
    const cartsInStorage:ICart[]=this.storageService.getItem('cart-'+localStorage.getItem('email'));
    let itemExists:boolean=false
    let newCarts:ICart[]=cartsInStorage.map((cart:ICart)=>{
            if(productId===cart.id){
              itemExists=true;
              return  {...cart,quantity:(cart.quantity+1)}
            }
            else{
              return cart
            }
          })
        if(itemExists===false){
          newCarts=[...newCarts,{id:productId,quantity:1}]
          this.storageService.setItem('cart-'+localStorage.getItem('email'), newCarts)
          this.carts$.next(newCarts);
          this.getCartProducts().subscribe(p=>p)
          return newCarts
        }
        else{
          this.storageService.setItem('cart-'+localStorage.getItem('email'), newCarts)
          this.carts$.next(newCarts);
          this.getCartProducts().subscribe(p=>p)
          return newCarts
        }


    }

deleteFormCart(productId:string):ICart[]{
    const cartsInStorage:ICart[]=this.storageService.getItem('cart-'+localStorage.getItem('email'));
    let newCarts:ICart[]=[]
        for(let cart of cartsInStorage){
            if(productId===cart.id){
                if(cart.quantity>1){
                  newCarts.push({...cart,quantity:(cart.quantity-1)})
                }
            }
            else{
               newCarts.push(cart)
            }
          }
          this.storageService.setItem('cart-'+localStorage.getItem('email'), newCarts)
          this.carts$.next(newCarts)
          this.getCartProducts().subscribe(p=>p)
          return newCarts
        }

deleteCartById(productId:string):ICart[]{
    const cartsInStorage:ICart[]=this.storageService.getItem('cart-'+localStorage.getItem('email'));
    let newCarts:ICart[]=[]
        for(let cart of cartsInStorage){
           if(productId!==cart.id){
                newCarts.push(cart)
               }
        }
        this.storageService.setItem('cart-'+localStorage.getItem('email'), newCarts)
        this.carts$.next(newCarts)
        this.getCartProducts().subscribe(p=>p)
        return newCarts
  }

  getCartProducts():Observable<IProductInCart[]>{
    let carts=[...this.carts$.getValue()] //copy array from carts$;
    console.log('carts$:', carts);
    console.log('cartOwnerValue :', 'cart-'+localStorage.getItem('email'))
    let cartsIds=carts.map(c=>c.id)
    if(!cartsIds.length) this.productInCart$.next([])
    return this.productService.getProductsByIds(cartsIds)
    .pipe(map(data=>{
      let result:IProductInCart[]=[]
      data.map((p:IProduct)=>{
        let orderQuantity=carts.find(c=>c.id===p.id)?.quantity
        if(orderQuantity&&p) result.push({...p,orderQuantity:orderQuantity})
      })
      this.productInCart$.next(result)
       return result
      }))
  }


ngOnDestroy(): void {
  this.unsubscribe$.next(null);
  this.unsubscribe$.complete();
}

}
