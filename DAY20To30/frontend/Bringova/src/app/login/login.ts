import { Component } from '@angular/core';
import { RouterLink ,Router} from '@angular/router';
import { Auth} from '../services/auth';
import { FormBuilder, FormGroup, MinLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  validate() {
    debugger;
    const { email, password } = this.loginForm.value;
    debugger;
    this.auth.login(email, password).subscribe(success => {
      if (success) {
        alert('Login successful!');
        // Placeholder: Navigate to dashboard or main page
        this.router.navigate(['/main']);
      } else {
        alert('Invalid email or password');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToAdmin(){
    this.router.navigate(['/admin'])
  }
}
