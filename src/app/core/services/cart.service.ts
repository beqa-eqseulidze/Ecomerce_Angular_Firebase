import { Injectable, OnDestroy } from '@angular/core';
import { IProduct } from '../interface/interfaceProduct';
import { storageService } from './storage.service';
import { ICart } from '../interface/interface.cart';
import { ProductService } from './product.service';
import { IsAuthGuard } from '../guards/is-auth.guard';
import { Subject, takeUntil, Observable, BehaviorSubject, of, map, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy{

  constructor(
    private storageService:storageService,
    private productService:ProductService
  ) {
    this.getQuantity().subscribe(q=>{console.log(q);this.cartQuantiti$.next(q)});
    console.log(26)

  }
unsubscribe$:Subject<any>=new Subject<any>();

setCart(id:string,quantity:number){
  let cart:ICart[]=this.storageService.getItem('cart');
  this.cartQuantiti$.next(this.cartQuantiti$.getValue()+quantity)
  if(cart){
    let IdExist=false
    cart.forEach((item:ICart)=>{
      if(item.id===id){
        item.quantity=item.quantity+quantity;
        IdExist=true;}
      })
      if(!IdExist) cart.push({id:id, quantity:quantity});
      this.storageService.setItem('cart',cart)
    }else{
      this.storageService.setItem('cart',[{id:id, quantity:quantity}])
    }
  }

  getCart():Observable<IProduct[]>{
     let cart:ICart[]=this.storageService.getItem('cart');
     if(!cart) return of([])
     let result:IProduct[]=[];
     let products=this.productService.products$.getValue().map(p=>p);
     cart.forEach((item:ICart)=>{
      let prod=products.find(p=>p.id===item.id)
      if(prod){
       let quantity
       prod.quantity >= item.quantity?quantity=item.quantity:quantity=prod.quantity;
       result.push({...prod, quantity:quantity});
        }
      else{
        this.productService.getProductById(item.id).subscribe({
          next: prod=>{
            let quantity
            prod.quantity >= item.quantity?quantity=item.quantity:quantity=prod.quantity;
            result.push({...prod, quantity:quantity});
          },
          error:({error})=>console.error(error.message)
        })
      }

    })
     return of(result)
  }
 getQuantity():Observable<number>{
  let res=0
  this.storageService.getItem('cart').map((item:ICart)=>res+=item.quantity);
  return of(res)
 }

cartQuantiti$:BehaviorSubject<number>=new BehaviorSubject<number>(0)

ngOnDestroy(): void {
  this.unsubscribe$.next(null);
  this.unsubscribe$.complete();
}

}
