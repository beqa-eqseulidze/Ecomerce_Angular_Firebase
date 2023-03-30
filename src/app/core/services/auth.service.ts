  import { Injectable } from '@angular/core';
  import { environment } from 'src/environments/environment';
  import { HttpClient } from '@angular/common/http';
  import { BehaviorSubject, Observable, tap } from 'rxjs';
  import { ISignUpBody, IAuthResponce } from '../interface/interface.signUp';
import { CartService } from './cart.service';
import { storageService } from './storage.service';

  @Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    usersBaseUrl?:string ;
    apiKey?:string

    constructor(
      private http:HttpClient,
      private cartService:CartService,
      private storageService:storageService
    ) {
      this.usersBaseUrl= environment.usersBaseUrl;
      this.apiKey=environment.apiKey;
    }



  signup(params:ISignUpBody) :Observable<IAuthResponce>{
    return this.http.post<IAuthResponce>(`${this.usersBaseUrl}signUp?key=${this.apiKey}`,params)
    .pipe(tap(responce=>this.setAuth(responce)))
  }

  signIn(params:ISignUpBody) :Observable<IAuthResponce>{
    return this.http.post<IAuthResponce>(`${this.usersBaseUrl}signInWithPassword?key=${this.apiKey}`,params)
    .pipe(tap(responce=>this.setAuth(responce)))
  }

 setAuth(responce:IAuthResponce){
      localStorage.setItem('idToken',responce.idToken);
      localStorage.setItem('refreshToken',responce.refreshToken);
      localStorage.setItem('email',responce.email);
      this.isAuth$.next(!!localStorage.getItem('idToken'))   //if user logd in isAuth Subject value will be true otherwise false
      this.getEmail$.next(responce.email);
      this.cartService.carts$.next((this.storageService.getItem('cart-'+localStorage.getItem('email'))))

      // this.cartService.cartOwner.next(responce.email);
  }

  logout() {
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('email');
      this.isAuth$.next(!!localStorage.getItem('idToken')) //if user logd in isAuth Subject value will be true otherwise false
      this.getEmail$.next('Login')
      // this.cartService.cartOwner.next('');
      this.cartService.productInCart$.next([]);
    }

  isAuth$:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(!!localStorage.getItem('idToken'));// !!localStorage.getItem('idToken') this expresion is same as:  localStorage.getItem('idToken')?true:false

  getEmail$:BehaviorSubject<string>=new BehaviorSubject(localStorage.getItem('email')||'Login');

  }
