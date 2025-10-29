import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  imports: [],
  templateUrl: './demo.html',
  styleUrl: './demo.css',
})
export class Demo implements OnInit {
  constructor(private http:HttpClient,){

  }
  userdetails:any[]=[];
  ngOnInit(): void {
    this.getAllUsers()

  }
 getAllUsers() {
  this.http.get("https://localhost:7296/api/Demo").subscribe({
    next: (result) => {
      this.userdetails.push(result)
      console.log(result);
    },
    error: (error) => {
      console.error('Error fetching users:', error);
    }
  });
}

removeitemat(id:number){
  if (confirm(`Are you sure you want to delete item at index ${id}?`)){}
    this.http.delete("https://localhost:7296/api/User/"+id).subscribe({
      next:()=>{
        alert("successfully removed")

      },
      error:(error)=>{
        console.error(error);
      }
    })
}

}
