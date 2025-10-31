import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../Model/Product';
import { OrderService } from '../services/order-service';
import { ProductService } from '../services/product-service';
import { UserService } from '../services/user';

@Component({
  selector: 'app-stock',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './stock.html',
  styleUrl: './stock.css',
})
export class Stock {
 products :Product[]= [];
    userId!: number;
 userData: any;
  selectedProduct: any;
  showDetails = false;
  showOrderForm = false;
  orderForm!: FormGroup;

  constructor(private fb: FormBuilder,private productserv :ProductService, private userService: UserService, private route: ActivatedRoute,private orderService :OrderService) {}

  ngOnInit(): void {
    this.loadProducts();
      this.route.parent?.params.subscribe(params => {
      this.userId = params['id'];
    });


    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.userData = data;
        this.initializeForm();
      },
      error: (err) => console.error('Error fetching user:', err)
    });
 
  }
  initializeForm(){
    this.orderForm = this.fb.group({
      user_id: [this.userId],
  product_id: ['', Validators.required],
  product_name: ['', Validators.required],
  customerName: [this.userData.username, Validators.required],
  quantity: [1, [Validators.required, Validators.min(1)]],
  address: ['', Validators.required],
  total_price: ['', Validators.required],     
  payment_method: ['', Validators.required],   
  payment_status: [''],                       
  delivery_status: ['Pending'],                
  message: [''],                               
  message_date: [new Date()]     
    });
  }
  loadProducts(){
    this.productserv.getProducts().subscribe({
      next:(res : Product[])=>{
         this.products = res.filter(item =>item.stock=='Available');
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
    this.orderForm.patchValue({
      product_id: product.product_id, 
      product_name: product. product_name,
      total_price: product.offer_price??product.price,
      delivery_status:'Pending',
    });
    this.selectedProduct=product;
    this.showOrderForm = true;
  }

  closeOrderForm() {
    this.showOrderForm = false;
    this.closeDetails()
  }

   placeOrder() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      if (orderData) {
  const Quantity = this.orderForm.get('quantity')?.value || 1;
  const Total_Price = this.orderForm.get('total_price')?.value || 1;

 orderData.Total_Price=Total_Price*Quantity;
}

     if (orderData.payment_method === 'COD') { orderData.payment_status = 'Not Paid'; } else { orderData.payment_status = 'Paid'; }

      console.log('Sending order:', orderData); 
      this.orderService.addOrders(orderData).subscribe({
        next: (res : any) => {
          alert('✅ Order placed successfully!');
          this.closeOrderForm();
        },
        error: (err:any) => {
          console.error('Error placing order:', err);
          alert('❌ Failed to place order.');
          this.closeOrderForm()
        }
      });
    } else {
      alert('Please fill all fields.');
    }
  }



}
