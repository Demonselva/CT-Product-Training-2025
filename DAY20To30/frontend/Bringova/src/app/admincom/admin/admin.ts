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
