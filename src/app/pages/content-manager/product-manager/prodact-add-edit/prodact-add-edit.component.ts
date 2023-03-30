import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Subject, takeUntil, map, Subscription, Observable } from 'rxjs';
import { IProduct } from '../../../../core/interface/interfaceProduct';

@Component({
  selector: 'app-prodact-add-edit',
  templateUrl: './prodact-add-edit.component.html',
  styleUrls: ['./prodact-add-edit.component.scss']
})
export class ProdactAddEditComponent implements OnInit,OnDestroy {

  errors?:string;

  productId:string|undefined


  constructor(
    private router:Router,
    private productService:ProductService,
    private activatedRoute:ActivatedRoute
    ) {}

  subscribtion:Subscription=new Subscription();

  form:FormGroup=new FormGroup({
    title:new FormControl('',Validators.required),
    price:new FormControl('',[Validators.required,Validators.min(0)]),
    image:new FormControl('',),
    description:new FormControl('',),
    quantity:new FormControl('',[Validators.required,Validators.min(1)])
  })


  ngOnInit(): void {
    this.subscribtion.add(
      this.activatedRoute.params
      .subscribe(params=>{
        this.productId=params['id']
        if(this.productId)this.setForm(this.productId)
      })
    )


  }

  setForm(id:string){
      let products=this.productService.products$.getValue().map(p=>p);
      let product=products.find(p=>p.id===id)
    if (product) this.form.patchValue(product)
  }

  submit(): void {
    this.form.markAllAsTouched;
    if(this.form.invalid){
      this.errors="fill this form correctly";
      return
    }
    if(this.productId){
      this.edit(this.productId,this.form.value)
    }else{
      this.add();
    }
    this.router.navigate(['/product-manager']);
   }

  add():void{
    let products=this.productService.products$.getValue();
    // this.subscribtion.add(
      this.productService.addProduct(this.form.value)
      .subscribe({
        next:res=>products.push({...this.form.value,id:res.name}),
        error: ({error}) => this.errors=error.mesage
            })
    // )
  }

  edit(id:string,product:IProduct):void{
    let products=this.productService.products$.getValue().map(p=>p);
    //  this.subscribtion.add(
      this.productService.update(id,product)
      .subscribe({
        next: data=>{
            products=products.map(p=>{
              if(p.id === id) return{...p,...this.form.value}
              else return p
            })
            this.productService.products$.next(products);
      },
        error: ({error})=>this.errors=error.mesage
      })
    //  )
  }


  ngOnDestroy(): void {
   this.subscribtion.unsubscribe();
  }
}
