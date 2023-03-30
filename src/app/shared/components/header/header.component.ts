import { AfterContentChecked, Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, takeUntil, Subject, Observable, forkJoin, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { IProductInCart } from '../../../core/interface/interface.product.in.cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy,AfterViewChecked{

  @ViewChild('dropdownBtn',{static:true}) "dropdownBtnRef":ElementRef;

  constructor(
    private authService: AuthService,
    private productservice:ProductService,
    private cartService:CartService,
    private router: Router
    ) {}

    productQuantityInCart=this.cartService.productInCart$
    .pipe(map((item:IProductInCart[])=>{
      let result:number=0;
      item.map(p=>{result+=p.orderQuantity})
      return result;
    }))

    unsubscribe$:Subject<any>=new Subject();
    isAuth?:BehaviorSubject<boolean>=this.authService.isAuth$;

    ngOnInit(): void {
     if(this.authService.isAuth$.getValue()){
      this.cartService.getCartProducts().subscribe(a=>a);
      this.cartService.cartOwner.next(this.authService.getEmail$.getValue());
     }
    this.productservice.getProducts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data=>this.productservice.products$.next(data));
   }

  logout(): void {
    if(confirm("You Leav your acount ,\n Are you sure? ")){
       this.authService.logout();
       this.router.navigate([''])
      };
  }
  ngAfterViewChecked(): void {
  this.dropdownBtnRef.nativeElement.innerText=this.authService.getEmail$.getValue();
 }
  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  }

}
