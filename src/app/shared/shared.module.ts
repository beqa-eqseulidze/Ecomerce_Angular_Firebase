import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NotFoundComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  
  ]
})
export class SharedModule { }
