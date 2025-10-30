import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Register } from '../register/register';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mainlayout',
  imports: [Sidebar,RouterOutlet,FormsModule],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.css',
})
export class Mainlayout implements OnInit {

  router=inject(Router)
  userId!: number;
  user: any;
  constructor(private route: ActivatedRoute,private http:HttpClient){}
  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) this.getUserDetails();
    });
  }

  
 getUserDetails(): void {
  this.http.get(`https://localhost:7296/api/User/${this.userId}`).subscribe({
    next: (res: any) => {
      this.user = res;
      console.log('User details:', this.user);
    },
    error: (err) => {
      console.error('Error fetching user details:', err);
    }
  });
}


  gotoProfile(): void {
    this.router.navigate([`/update-profile/${this.userId}`]);
  }

 
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  toggleDarkMode(event: any) {
  const isChecked = event.target.checked;
  const elements = document.getElementsByClassName('main');

  for (let i = 0; i < elements.length; i++) {
    if (isChecked) {
      elements[i].classList.add('dark-mode');
    } else {
      elements[i].classList.remove('dark-mode');
    }
  }
}

}
