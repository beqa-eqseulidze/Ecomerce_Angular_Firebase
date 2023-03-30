import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interface/interfaceProduct';
import { map, Observable, BehaviorSubject, Subscription, of, forkJoin } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http:HttpClient,
    ) {
      this.baseUrl=environment.baseUrl
    }

    baseUrl!:string;
    documentName:string='products'

    addProduct(product:IProduct):Observable<any>{
      return this.http.post<IProduct>(`${this.baseUrl}/${this.documentName}.json`,product)
    }

    getProducts():Observable<IProduct[]>{
        return this.http.get<IProduct[]>(`${this.baseUrl}/${this.documentName}.json`)
          .pipe(map(res=>{
            let result:IProduct[]= [];
            for(let key in res){
              result.push({...res[key],id:key});
            }
            return result;
          }))
        }

    getProductById(id:string):Observable<IProduct>{
          return this.http.get<IProduct>(`${this.baseUrl}/${this.documentName}/${id}.json`)
              .pipe(map(product=>{
                return {...product,id:id}
              }))
          }

    getProductsByIds(ids:string[]):Observable<IProduct[]>{
        let responece=ids.map(id=>this.http.get<IProduct>(`${this.baseUrl}/${this.documentName}/${id}.json`)
        .pipe(map(res=>{return {...res,id:id}}))
        )
        return forkJoin(responece).pipe(map(d=>d.filter(item=>item!==null)))
      }



    delete(id:string):Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/${this.documentName}/${id}.json`)
    }

    update(id:string,data:IProduct):Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/${this.documentName}/${id}.json`, data)
    }





  products$:BehaviorSubject<IProduct[]>=new BehaviorSubject<IProduct[]>([])




}
