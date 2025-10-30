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

addOrders(order: Orders): Observable<any> {
  return this.http.post(`${this.apiurl}/add`, order);
}

  
}
