import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../services/order-service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  imports: [CommonModule,FormsModule],
  templateUrl: './message.html',
  styleUrl: './message.css',
})
export class Message {
  messages: any[] = [];
  userId!: number;  

  constructor(private http: HttpClient,private ordersev :OrderService,private route:ActivatedRoute) {}

  ngOnInit(): void {
   
    this.route.parent?.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.loadMessages();
  }

  
  loadMessages(): void {
    this.ordersev.getOrdersByUserId( this.userId).subscribe({
      next: (res) => {
      
        this.messages = res.filter(o => o.message && o.message.trim() !== '');
      },
      error: (err) => {
        console.error('Error loading messages:', err);
      }
    });
  }

deleteMessage(order: any): void {
  if (confirm('Are you sure you want to delete this message?')) {
    const updatedOrder = { ...order, message: '' };

    this.ordersev.updateOrder(updatedOrder).subscribe({
      next: () => {
        alert('Message deleted successfully');
        this.loadMessages();
      },
      error: (err) => {
        console.error('Error deleting message:', err);
      }
    });
  }
}
}
