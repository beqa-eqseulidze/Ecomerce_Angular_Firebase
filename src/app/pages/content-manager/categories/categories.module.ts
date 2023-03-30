import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesAddEditComponent } from './categories-add-edit/categories-add-edit.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesAddEditComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
