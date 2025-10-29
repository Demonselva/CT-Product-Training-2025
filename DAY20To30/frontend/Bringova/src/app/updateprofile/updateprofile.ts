import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateprofile',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './updateprofile.html',
  styleUrl: './updateprofile.css',
})
export class Updateprofile{
  //  userId!: any;
  // message = '';
  // public fb=inject(FormBuilder);
  // constructor(
  
  //   private route: ActivatedRoute,
  //   private userService: UserService
  // ) {}

  // profileForm = this.fb.group({
  //   username: ['', Validators.required],
  //   email: ['', [Validators.required, Validators.email]],
  //   dob: [''],
  //   gender: [''],
  //   mobile_number: [''],
  // });

  // passwordForm = this.fb.group({
  //   currentPassword: ['', Validators.required],
  //   newPassword: ['', [Validators.required, Validators.minLength(6)]],
  // });

  // ngOnInit() {
  //   this.route.params.subscribe(params => {
  //     this.userId = params['id'];
  //     if (this.userId) this.userService.getUserDetails();
  //   });
  //   this.loadUserDetails();
  // }

  // loadUserDetails() {
  //   this.userService.getUserById(this.userId).subscribe({
  //     next: (res:any) => this.profileForm.patchValue(res),
  //     error: (err: any) => console.error('Error loading user details', err),
  //   });
  // }

  // onUpdateProfile() {
  //   if (this.profileForm.valid) {
  //     this.userService.updateUser(this.userId, this.profileForm.value).subscribe({
  //       next: () => (this.message = 'Profile updated successfully!'),
  //       error: (err) => console.error('Error updating profile', err),
  //     });
  //   }
  // }

  // onChangePassword() {
  //   if (this.passwordForm.valid) {
  //     this.userService
  //       .updatePassword(this.userId, this.passwordForm.value)
  //       .subscribe({
  //         next: () => (this.message = 'Password changed successfully!'),
  //         error: (err) => (this.message = 'Invalid current password'),
  //       });
  //   }
  // }

}
