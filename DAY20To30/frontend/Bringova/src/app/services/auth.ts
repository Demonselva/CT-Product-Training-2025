import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  name: string;
  dob: string;
  email: string;
  password: string;
  mobile: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  private users: User[] = [];

  register(user: User): Observable<string> {
    this.users.push(user);
    console.log('Registered Users:', this.users);
    // Placeholder for future API call
    return of('Registration successful');
  }

  login(email: string, password: string): Observable<boolean> {
    const found = this.users.find(u => u.email === email && u.password === password);
    // Placeholder for future API call
    return of(!!found);
  }
}
