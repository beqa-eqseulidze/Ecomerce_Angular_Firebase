import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../interface/interface.category';
import { map, Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient,
    ) {
      this.baseUrl=environment.baseUrl
    }

    baseUrl!:string;
    documentName:string='category'

    addCategory(category:ICategory):Observable<any>{
      return this.http.post<ICategory>(`${this.baseUrl}/${this.documentName}.json`,category)
    }

    getCategories():Observable<ICategory[]>{
        return this.http.get<ICategory[]>(`${this.baseUrl}/${this.documentName}.json`)
          .pipe(map(res=>{
            let result:ICategory[]= [];
            for(let key in res){
              result.push({...res[key],id:key});
            }
            return result;
          }))
        }

    getCategoryById(id:string):Observable<ICategory>{
          return this.http.get<ICategory>(`${this.baseUrl}/${this.documentName}/${id}.json`)
              .pipe(map(category=>{
                return {...category,id:id}
              }))
          }

    delete(id:string):Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/${this.documentName}/${id}.json`)
    }

    update(id:string,data:ICategory):Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/${this.documentName}/${id}.json`, data)
    }





  caregories$:BehaviorSubject<ICategory[]>=new BehaviorSubject<ICategory[]>([])





}
