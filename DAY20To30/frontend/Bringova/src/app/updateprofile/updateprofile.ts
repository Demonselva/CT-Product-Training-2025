import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateprofile',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './updateprofile.html',
  styleUrl: './updateprofile.css',
})
export class Updateprofile implements OnInit{
   userId!: number;
  message = '';
  user:any;
  public fb=inject(FormBuilder);
  constructor(
  
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  profileForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dob: [''],
    gender: [''],
    mobile_number: [''],
  });

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.getUserById(this.userId).subscribe({
      next: (res:any) => this.profileForm.patchValue(res),
      error: (err: any) => console.error('Error loading user details', err),
    });
  }

  onUpdateProfile() {
    if (this.profileForm.valid) {
      this.userService.updateUser(this.userId, this.profileForm.value).subscribe({
        next: () => {
          alert("profile updated");
          this.loadUserDetails()
        }
          ,
        error: (err) => console.error('Error updating profile', err),
      });
    }
  }

  onChangePassword() {
    if (this.passwordForm.valid) {
      this.userService
        .updatePassword(this.userId, this.passwordForm.value)
        .subscribe({
          next: () => (this.message = 'Password changed successfully!'),
          error: (err) => (this.message = 'Invalid current password'),
        });
    }
  }

}
