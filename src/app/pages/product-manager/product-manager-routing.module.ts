import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductMenegerComponent } from './product-meneger.component';
import { ProdactAddEditComponent } from './prodact-add-edit/prodact-add-edit.component';

const routes: Routes = [
 {
  path: '',
  component:ProductMenegerComponent
 },
 {
  path:'product-add',
  component: ProdactAddEditComponent
},
{
  path:'product-edit/:id',
  component: ProdactAddEditComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagerRoutingModule { }
