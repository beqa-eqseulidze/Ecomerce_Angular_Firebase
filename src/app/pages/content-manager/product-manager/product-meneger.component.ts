import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IProduct } from '../../../core/interface/interfaceProduct';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-meneger',
  templateUrl: './product-meneger.component.html',
  styleUrls: ['./product-meneger.component.scss']
})
export class ProductMenegerComponent implements OnInit {

  products?:BehaviorSubject<IProduct[]>=this.productService.products$

  constructor(
    private productService: ProductService,
    private cartService:CartService
  ) {
  }

  ngOnInit(): void {

  }

  delete(id:string|undefined){
    if(id) {
      this.productService.delete(id).subscribe({
        next: data=>{
            let NewProducts=this.productService.products$.getValue().filter(prod=>prod.id!==id)
            this.productService.products$.next(NewProducts);
            this.cartService.deleteCartById(id)
          },
        error:({error})=>alert(error.mesage)
      })
    }
  }

}
