import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class storageService {

  constructor() { }

  setItem(key:string,value:any):void{
    localStorage.setItem(key,JSON.stringify(value));
  }

  getItem(key:string):any{
    let res=localStorage.getItem(key)
    if(res) return JSON.parse(res)
  }


}
