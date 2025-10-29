import { Component, inject } from '@angular/core';
import { RouterLink ,Router} from '@angular/router';
import { Auth} from '../services/auth';
import { FormBuilder, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  message = '';
  private fb=inject(FormBuilder)
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor( private userService: UserService, private router: Router) {}

  onSubmit() {
  if (this.loginForm.valid) {
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        if (res && res.user.user_id) {
          
          localStorage.setItem('user', JSON.stringify(res.user));

          this.router.navigate(['/main', res.user.user_id]);
        } else {
          this.message = 'Login successful but user ID not found!';
        }
      },
      error: (err) => {
        this.message = 'Invalid credentials';
      }
    });
  }
}

GotoRegister() {
  this.router.navigate(['/register']);
}

}
