import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.css',
})
export class OrderHistory {
  orders: any[] = [];
  totalorderslist: any[] = [];
  userId!: number;

  totalOrders = 0;
  totalPending = 0;
  totalDispatch = 0;
  hasOrders: boolean |null=null;
  selectedOrder: any;
  orderForm!:FormGroup;
   filteredOrders: any[] = [];  
  selectedFilter: string = 'All';
  

  constructor(private fb: FormBuilder,private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId)  this.checkUserOrders();;
    
    });
   this.orderForm = this.fb.group({
      address: ['', Validators.required],
      payment_method: ['', Validators.required],
      payment_status: ['', Validators.required],
      delivery_status: ['', Validators.required],
      quantity: [1, Validators.required],
      total_Price: [0, Validators.required],
      message: ['']
    });
  }

  loadOrders(): void {
     if(this.hasOrders){
        this.orderService.getOrdersByUserId(this.userId).subscribe({
          next: (res: any[]) => {
            this.orders = res;
          this.filteredOrders=res;
            
          },
          error: (err) => console.error('Error fetching orders:', err)
        });
  }else{
    console.log('buy Product');
  }
}

  
  


  cancelOrder(orderId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          alert('✅ Order cancelled successfully!');

          this.loadOrders();
        },
        error: (err) => console.error('Error cancelling order:', err)
      });
    }
  }

 showMessageModal = false;

 messageSeller(order: any): void {
    this.selectedOrder = order;
    this.showMessageModal = true;
    this.orderForm.patchValue(order);
  }

  updateOrderDetails(): void {
  if (this.orderForm.invalid || !this.selectedOrder) return;

  const updatedOrder = {
    order_id: this.selectedOrder.order_id,   
    user_id: this.userId,                   
    product_id: this.selectedOrder.product_id,
    address: this.orderForm.value.address,
    payment_method: this.orderForm.value.payment_method,
    payment_status: this.orderForm.value.payment_status,
    delivery_status: this.orderForm.value.delivery_status,
    total_price: this.orderForm.value.total_Price,
    quantity: this.orderForm.value.quantity,
    message: this.orderForm.value.message,
  };

  this.orderService.updateOrder(updatedOrder)
    .subscribe({
      next: (res: any) => {
        alert('Order updated successfully!');
        this.loadOrders()
        this.showMessageModal = false;
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update order. Check console for details.');
      }
    });
}

  closeMessageModal(): void {
    this.showMessageModal = false;
  }

  filterOrders() {
    if (this.selectedFilter === 'All') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter(
        (order) => order.delivery_status === this.selectedFilter
      );
    }
  }
   checkUserOrders() {
    this.orderService.hasOrders(this.userId).subscribe({
      next: (response) => {
        this.hasOrders = response.hasOrders;
         if (this.hasOrders) {
        this.loadOrders(); 
      } else {
        console.log("buy product");
      }
      
      },
      error: (error) => {
        console.error('Error checking user orders:', error);
      
      }
    });
}
}
