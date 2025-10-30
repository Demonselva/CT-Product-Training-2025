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
        product_id: [null, Validators.required],  
      productName: ['', Validators.required],
      customerName: [this.userData.username, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
      totalPrice: ['', Validators.required],
      paymentMethod: ['', Validators.required]
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
      payment_method:product.payment_method,
      product_id: product.product_id, 
      productName: product. product_name,
      totalPrice: product.price
    });
    this.showOrderForm = true;
  }

  closeOrderForm() {
    this.showOrderForm = false;
  }

   placeOrder() {
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      console.log('Sending order:', orderData); 
      this.orderService.addOrders(orderData).subscribe({
        next: (res) => {
          alert('✅ Order placed successfully!');
          this.closeOrderForm();
        },
        error: (err) => {
          console.error('Error placing order:', err);
          alert('❌ Failed to place order.');
        }
      });
    } else {
      alert('Please fill all fields.');
    }
  }


openOrderModal(product: any) {
  this.orderForm.patchValue({
    productName: product.name,
  });
  const modal = document.getElementById('orderModal');
  modal?.classList.add('show');
  modal?.setAttribute('style', 'display: block;');
}


}



