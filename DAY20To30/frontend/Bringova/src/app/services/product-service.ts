import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
   private apiUrl = 'https://localhost:7296/api/Product';

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteProducts(id:any){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
  updateProduct(id : any,product: any){
    return this.http.put(`${this.apiUrl}/${id}`,product);
  }
  
}
