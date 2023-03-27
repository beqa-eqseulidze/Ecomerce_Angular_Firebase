import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthGuard } from '../core/guards/is-auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  {path: '',
  component:LayoutComponent,
    children:[
      {path:'',loadChildren:()=>import('.././pages/home/home.module').then(m=>m.HomeModule)},
      {path:'auth',loadChildren:()=>import('.././pages/auth/auth.module').then(m=>m.AuthModule)},
      {path:'products',loadChildren:()=>import('.././pages/products/products.module').then(m=>m.ProductsModule)},
      {
        path:'cart',
        loadChildren:()=>import('.././pages/cart/cart.module').then(m=>m.CartModule),
        canActivate:[IsAuthGuard]
      },
      {
        path:'product-manager',
        loadChildren:()=>import('.././pages/product-manager/product-manager.module').then(m=>m.ProductManagerModule),
        canActivate:[IsAuthGuard]
      },
      {path:'**',component:NotFoundComponent}
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
