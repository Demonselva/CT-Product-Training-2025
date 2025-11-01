import { Injectable } from '@angular/core';
import { Orders } from '../Model/Orders';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiurl='https://localhost:7296/api/Order'
  constructor(private http :HttpClient){}
getOrders(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiurl}`);
}

addOrders(order: Orders): Observable<any> {
  return this.http.post(`${this.apiurl}/add`, order);
}
getOrdersByUserId(userId: number) {
  return this.http.get<any[]>(`${this.apiurl}/user/${userId}`);
}

cancelOrder(orderId: number) {
  return this.http.delete(`${this.apiurl}/${orderId}`);
}
updateOrder(order : Orders):Observable<any>{
  return this.http.put(`${this.apiurl}/update`,order);
}


  
}
