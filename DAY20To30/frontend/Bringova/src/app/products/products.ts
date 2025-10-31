import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../services/product-service';
import { Product } from '../Model/Product';
import { UserService } from '../services/user';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order-service';
// ALTER TABLE Orders
// ADD total_price DECIMAL(10,2),
//     quantity INT;


@Component({
  selector: 'app-products',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
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
  }

   placeOrder() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      if (orderData) {
  const quantity = this.orderForm.get('quantity')?.value || 1;
  const total_price = this.orderForm.get('totalPrice')?.value || 1;

 orderData.total_price=total_price*quantity;
}

     if (orderData.payment_method === 'COD') { orderData.payment_status = 'Not Paid'; } else { orderData.payment_status = 'Paid'; }

      console.log('Sending order:', orderData); 
      this.orderService.addOrders(orderData).subscribe({
        next: (res) => {
          alert('✅ Order placed successfully!');
          this.closeOrderForm();
        },
        error: (err) => {
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



