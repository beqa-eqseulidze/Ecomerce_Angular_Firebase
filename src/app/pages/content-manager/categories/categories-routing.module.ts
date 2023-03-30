import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesAddEditComponent } from './categories-add-edit/categories-add-edit.component';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  {
    path:'',
    component: CategoriesComponent
  },
  {
    path:'add',
    component:CategoriesAddEditComponent
  },
  {
    path:'edit/:id',
    component:CategoriesAddEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
