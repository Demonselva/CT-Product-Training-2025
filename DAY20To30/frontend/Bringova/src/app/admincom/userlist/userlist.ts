import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../Model/User';


@Component({
  selector: 'app-userlist',
  imports: [CommonModule,FormsModule],
  templateUrl: './userlist.html',
  styleUrl: './userlist.css',
})
export class Userlist implements OnInit {
  userDetails: User[] = [];
  currentUser: User = {
    user_id: 0,
    username: '',
    email: '',
    password: '',
    dob: '',
    user_added_date: '',
    mobile_number: '',
    gender: ''
  };

  constructor(private userService: UserService) {}

  
  ngOnInit(): void {
    this.fetchUserDetails();
  }


  fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe({
      next: (res: User[]) => {
        this.userDetails = res;
        console.log('✅ User Details:', this.userDetails);
      },
      error: (err) => {
        console.error('❌ Error fetching users:', err);
        alert('Error fetching user details. Please try again later.');
      }
    });
  }


  editUser(user: User): void {
    this.currentUser = { ...user }; 
    const modal = document.getElementById('editModal');
    if (modal) {
      (modal as any).style.display = 'block';
    }
  }


  closeModal(): void {
    const modal = document.getElementById('editModal');
    if (modal) {
      (modal as any).style.display = 'none';
    }
  }


  saveChanges(): void {
    this.userService.updateUser(this.currentUser.user_id,this.currentUser).subscribe({
      next: () => {
        alert('User updated successfully!');
        this.closeModal();
        this.fetchUserDetails(); 
      },
      error: (err) => {
        console.error('❌ Error updating user:', err);
        alert('Failed to update user. Try again.');
      }
    });
  
  }
   deleteUser(id : number): void{
    
    if(confirm(`are sure to delete the user of id:${id}`)){
      this.userService.deleteUserDetails(id).subscribe({
        next:()=>{
          alert(`this User_id :${id} user deleted`);
          this.fetchUserDetails()
        },error:(err)=>{
          alert("unable to delete the user")
          console.error("error on delete"+err);
        }
      })
    }
    }
  }
  





