import { Component, inject } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Router, RouterOutlet } from '@angular/router';
import { Register } from '../register/register';


@Component({
  selector: 'app-mainlayout',
  imports: [Sidebar,RouterOutlet],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.css',
})
export class Mainlayout {
  router=inject(Router)
  logout(){
      this.router.navigate(['/login']);
  }
}
