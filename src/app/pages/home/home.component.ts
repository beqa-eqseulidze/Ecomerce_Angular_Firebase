import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../../core/interface/interfaceProduct';
import { ProductService } from '../../core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products:BehaviorSubject<IProduct[]>=this.productService.products$;
  
  constructor(
    private productService:ProductService
  ) { }

  ngOnInit(): void {}

}
