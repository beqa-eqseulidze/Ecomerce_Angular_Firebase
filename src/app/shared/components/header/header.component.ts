import { AfterContentChecked, Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, takeUntil, Subject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

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

    cartQuantity:Observable<number>=this.cartService.cartQuantiti$ as Observable<number>;
    unsubscribe$:Subject<any>=new Subject();
    isAuth?:BehaviorSubject<boolean>=this.authService.isAuth$;

    ngOnInit(): void {
      console.log(this.cartService.cartQuantiti$.getValue());
    this.productservice.getProducts()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data=>this.productservice.products$.next(data));
    this.cartService.getCart().subscribe(data=>data);

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
