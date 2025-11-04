import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8005/api/User'; // your backend base URL

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
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  updatePassword(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/update-password/${id}`, data);
  }
  getUserDetails():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
  deleteUserDetails(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  checkUserExists(email: string, username: string) {
  return this.http.get<{ exists: boolean }>(
    `${this.apiUrl}/check-user?email=${email}&username=${username}`
  );
}
}

