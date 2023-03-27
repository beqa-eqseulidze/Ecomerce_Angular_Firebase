import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from '../../core/interface/interfaceProduct';

@Component({
  selector: 'app-product-meneger',
  templateUrl: './product-meneger.component.html',
  styleUrls: ['./product-meneger.component.scss']
})
export class ProductMenegerComponent implements OnInit {

  products?:BehaviorSubject<IProduct[]>=this.productService.products$

  constructor(
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {

  }

  delete(id:string|undefined){
    if(id) {
      this.productService.delete(id).subscribe({
        next: data=>{
            let NewProducts=this.productService.products$.getValue().filter(prod=>prod.id!==id)
             this.productService.products$.next(NewProducts)
          },
        error:({error})=>alert(error.mesage)
      })
    }
  }

}
