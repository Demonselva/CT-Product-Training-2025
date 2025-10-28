import { Component } from '@angular/core';
import { RouterLink ,Router} from '@angular/router';
import { Auth} from '../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
   registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: Auth, private router: Router) {
  
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  register() {
    const userData = this.registerForm.value;

    this.auth.register(userData).subscribe(msg => {

      alert(msg);
      this.router.navigate(['/login']);
    });
  }
  back(){
    this.router.navigate(['/login']);
  }

}
