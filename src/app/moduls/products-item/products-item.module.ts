import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsItemComponent } from './products-item.component';




@NgModule({
  declarations: [
    ProductsItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductsItemComponent
  ]

})
export class ProductsItemModule { }
