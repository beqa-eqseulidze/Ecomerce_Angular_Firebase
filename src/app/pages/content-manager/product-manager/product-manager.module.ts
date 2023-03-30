import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductManagerRoutingModule } from './product-manager-routing.module';
import { ProductMenegerComponent } from './product-meneger.component';
import { ProdactAddEditComponent } from './prodact-add-edit/prodact-add-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductMenegerComponent,
    ProdactAddEditComponent
  ],
  imports: [
    CommonModule,
    ProductManagerRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductManagerModule { }
