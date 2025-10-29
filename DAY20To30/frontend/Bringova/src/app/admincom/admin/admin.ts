import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebaradmin } from '../sidebaradmin/sidebaradmin';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,Sidebaradmin],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  router=inject(Router);
  logout(){
    this.router.navigate(['/login'])

  }
}
