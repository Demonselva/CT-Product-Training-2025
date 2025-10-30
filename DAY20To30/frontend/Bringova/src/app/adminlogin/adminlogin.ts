import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  imports: [ReactiveFormsModule],
  templateUrl: './adminlogin.html',
  styleUrl: './adminlogin.css',
})
export class Adminlogin {

  adminForm!:FormGroup;
  router=inject(Router)
  fb=inject(FormBuilder)
   ngOnInit(): void {
    this.adminForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const { username, password } = this.adminForm.value;

    if (username === 'admin@' && password === 'admin123') {
      alert('Login successful ');
      this.router.navigate(['/admin']);
    } else {
      alert('Invalid credentials ');
    }
  }
GotoLogin(){
  this.router.navigate(['/login'])
}
GotoRegister(){
   this.router.navigate(['/register'])
}
}
