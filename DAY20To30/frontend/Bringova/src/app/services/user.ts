import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7296/api/User'; // your backend base URL

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(loginData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }
   getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/update/${id}`, data);
  }

  updatePassword(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/update-password/${id}`, data);
  }
  getUserDetails(){
    return this.http.get(`${this.apiUrl}/user`);
  }
}
