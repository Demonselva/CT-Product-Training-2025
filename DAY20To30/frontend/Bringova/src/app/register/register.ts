import { Component, inject } from '@angular/core';
import { RouterLink ,Router} from '@angular/router';
import { Auth} from '../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user';

@Component({
  selector: 'app-register',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
   message = '';
  constructor( private userService: UserService, private router: Router) {}
  public fb=inject(FormBuilder)
  
  registerForm = this.fb.group({
    username:['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    dob:['',Validators.required],
    gender:['',Validators.required],
    mobile_number:[0,Validators.required]
  });

 

 onSubmit() {
    if (this.registerForm.valid) {
      const email = this.registerForm.value.email ?? '';
    const username = this.registerForm.value.username ?? '';

      // ✅ Step 1: Check if the user already exists
      this.userService.checkUserExists(email, username).subscribe({
        next: (response) => {
          if (response.exists) {
            alert('User with this email or username already exists!');
            this.message = 'User already exists. Try logging in.';
          } else {
            
            this.userService.register(this.registerForm.value).subscribe({
              next: (res) => {
                this.message = 'Registration successful!';
                alert('Registration successful!');
                setTimeout(() => this.GotoLogin(), 1500);
              },
              error: (err) => {
                this.message = 'Registration failed: ' + err.error;
              }
            });
          }
        },
        error: (err) => {
          console.error('Error checking user existence:', err);
          this.message = 'Error checking user details. Try again.';
        }
      });
    } else {
      this.message = 'Please fill all required fields correctly.';
    }
  }
  GotoLogin(){
    this.router.navigate(['/login'])
  }

}
