import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../services/product-service';
import { Product } from '../Model/Product';

@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products :Product[]= [];
   

  selectedProduct: any;
  showDetails = false;
  showOrderForm = false;
  orderForm!: FormGroup;

  constructor(private fb: FormBuilder,private productserv :ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.orderForm = this.fb.group({
      productName: [''],
      quantity: [1],
      address: [''],
    });
  }
  loadProducts(){
    this.productserv.getProducts().subscribe({
      next:(res : Product[])=>{
        this.products=res;
        console.log(this.products)
      },
      error:(err)=>{
        console.error(err)
      }
    })
  }

  openDetails(product: any) {
    this.selectedProduct = product;
    this.showDetails = true;
  }

  closeDetails() {
    this.showDetails = false;
  }

  openOrderForm(product: any) {
    this.orderForm.patchValue({ productName: product.name });
    this.showOrderForm = true;
  }

  closeOrderForm() {
    this.showOrderForm = false;
  }

  placeOrder() {
    const orderData = this.orderForm.value;
    console.log('Order placed:', orderData);
    alert('✅ Order placed successfully!');
    this.closeOrderForm();
  }
}

