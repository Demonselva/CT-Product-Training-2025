import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderlist',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './orderlist.html',
  styleUrl: './orderlist.css',
})
export class Orderlist {
   orders: any[] = [];
  selectedOrder: any;
  orderForm!: FormGroup;
  showMessageModal = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadOrders();

 
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
    this.orderService.getOrders().subscribe({
      next: (res: any) => {
        this.orders = res;
      },
      error: (err: any) => console.error('❌ Error fetching orders:', err)
    });
  }

  cancelOrder(orderId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          alert('✅ Order cancelled successfully!');
          this.loadOrders();
        },
        error: (err) => console.error('❌ Error cancelling order:', err)
      });
    }
  }

  messageSeller(order: any): void {
    this.selectedOrder = order;
    this.showMessageModal = true;
    this.orderForm.patchValue(order);
  }

  updateOrderDetails(): void {
    if (this.orderForm.invalid || !this.selectedOrder) return;

    const updatedOrder = {
      order_id: this.selectedOrder.order_id,
      user_id: this.selectedOrder.user_id,
      product_id: this.selectedOrder.product_id,
      address: this.orderForm.value.address,
      payment_method: this.orderForm.value.payment_method,
      payment_status: this.orderForm.value.payment_status,
      delivery_status: this.orderForm.value.delivery_status,
      total_Price: this.orderForm.value.total_Price,
      quantity: this.orderForm.value.quantity,
      message: this.orderForm.value.message+"(By Admin)"
    };

    this.orderService.updateOrder(updatedOrder).subscribe({
      next: () => {
        alert('✅ Updated successfully!');
        this.loadOrders();
        this.closeMessageModal();
      },
      error: (err) => {
        console.error('❌ Failed to update order:', err);
        alert('❌ Failed to update order.');
      }
    });
  }


  acceptOrder(order: any): void {
    this.selectedOrder = order;
    if (confirm('Mark this order as Delivered?')) {
      const updatedOrder = {
        order_id: this.selectedOrder.order_id,
        user_id: this.selectedOrder.user_id,
        product_id: this.selectedOrder.product_id,
        address: this.selectedOrder.address,
        payment_method: this.selectedOrder.payment_method,
        payment_status: 'Paid',
        delivery_status: 'Delivered',
        total_Price: this.selectedOrder.total_Price,
        quantity: this.selectedOrder.quantity,
        message: this.selectedOrder.message
      };

      this.orderService.updateOrder(updatedOrder).subscribe({
        next: () => {
          alert('✅ Order marked as Delivered!');
          this.loadOrders();
        },
        error: (err) => console.error('❌ Error updating order:', err)
      });
    }
  }
  OnthewayOrder(order:any){
 this.selectedOrder = order;
    if (confirm('Mark this order as Delivered?')) {
      const updatedOrder = {
        order_id: this.selectedOrder.order_id,
        user_id: this.selectedOrder.user_id,
        product_id: this.selectedOrder.product_id,
        address: this.selectedOrder.address,
        payment_method: this.selectedOrder.payment_method,
        payment_status: 'Paid',
        delivery_status: 'On the Way',
        total_Price: this.selectedOrder.total_Price,
        quantity: this.selectedOrder.quantity,
        message: this.selectedOrder.message
      };

      this.orderService.updateOrder(updatedOrder).subscribe({
        next: () => {
          alert('✅ Order marked as Delivered!');
          this.loadOrders();
        },
        error: (err) => console.error('❌ Error updating order:', err)
      });
    }
  }

  // ✅ Close modal
  closeMessageModal(): void {
    this.showMessageModal = false;
  }

}
