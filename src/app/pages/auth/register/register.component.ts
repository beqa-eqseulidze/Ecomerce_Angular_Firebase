import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IAuthResponce } from 'src/app/core/interface/interface.signUp';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})

export class RegisterComponent implements OnInit,OnDestroy{

  unsubscribe$:Subject<any>=new Subject();

  errors?:string
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

    form:FormGroup=new FormGroup({
      email:new FormControl('',[Validators.email,Validators.required]),
      password:new FormControl('',[Validators.required,Validators.minLength(5)]),
      confirmPassword:new FormControl('',[Validators.required,])
    });

    submit() {
      if(this.form.controls['password'].value!==this.form.controls['confirmPassword'].value){
        this.errors='configPassword not match to password'
        return
      }
      this.form.markAllAsTouched();
      if(this.form.invalid){
        this.errors='fill all filds'
        return;
      }
      this.authService.signIn(this.form.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next:(data:IAuthResponce)=>{
          this.router.navigate(['']);
          this.errors=undefined;
          this.form.reset();
        },
        error:({error}) =>this.errors=error.error.message
      })
    }

    ngOnDestroy(): void {
      this.unsubscribe$.next(null);
      this.unsubscribe$.complete();
    }
}
