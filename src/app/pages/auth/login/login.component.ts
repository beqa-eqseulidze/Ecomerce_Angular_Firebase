import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IAuthResponce } from 'src/app/core/interface/interface.signUp';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})

export class LoginComponent implements OnInit,OnDestroy{

  unsubscribe$:Subject<any>=new Subject();

  errors?:string
  constructor(
    private authService:AuthService,
    private router:Router,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
  }

    form:FormGroup=new FormGroup({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(5)])
    });

    login() {
      this.form.markAllAsTouched();
      if(this.form.invalid){
        this.errors='fill all filds'
        return;
      }
      this.authService.signIn(this.form.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next:(data:IAuthResponce)=>{
          this.errors=undefined;
          this.form.reset();
          this.cartService.getCartProducts().subscribe(a=>a)
          this.router.navigate(['']);
        },
        error:({error}) =>this.errors=error.error.message
      })
    }



    ngOnDestroy(): void {
      this.unsubscribe$.next(null);
      this.unsubscribe$.complete();
    }
}
