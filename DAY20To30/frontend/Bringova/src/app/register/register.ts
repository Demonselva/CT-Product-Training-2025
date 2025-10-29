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
      this.userService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.message = 'Registration successful!';
          setTimeout(() => this.GotoLogin(), 1500);

        },
        
        error: (err) => {
          this.message = 'Registration failed: ' + err.error;
        }
      });
    }
  }
  GotoLogin(){
    this.router.navigate(['/login'])
  }

}
