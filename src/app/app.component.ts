import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{

  userObj: USER = new USER();

  http= inject(HttpClient);

  cityList$: Observable<string[]> = new Observable<string[]>();
  stateList$: Observable<string[]> = new Observable<string[]>();
  userList:USER[] = [];

  ngOnInit(): void {
    this.cityList$ =  this.http.get<string[]>("http://localhost:3000/cityList");
    this.stateList$ =  this.http.get<string[]>("http://localhost:3000/stateList");
    this.getUsers();
  }

  getUsers() {
    this.http.get<USER[]>("http://localhost:3000/userList").subscribe((res:USER[])=>{
      this.userList =  res;
    })
  }

  onSaveUser() {
     this.http.get<USER>("http://localhost:3000/createUser").subscribe((res:USER)=>{
      alert("User Created Success")
      this.userList.unshift( this.userObj)
    })
    // this.http.post<USER>("http://localhost:3000/createUser", this.userObj).subscribe((res:USER)=>{
    //   alert("User Created Success")
    // })
  } 

  onEdit(data: USER) {
    this.userObj =  data;
  }
  onDelete(id:number) {
    const isDelet =  confirm("Are you suire want ot delete");
    if(isDelet) {
      this.http.get<USER>("http://localhost:3000/deleteUser").subscribe((res:USER)=>{
        alert("User Delete Success") 
      })
    } 
  }


  
 

}

export class USER {
  userId: number;
  userName: string;
  fName: string;
  lName: string;
  city: string;
  state: string;
  zipCode: string;
  constructor() {
    this.userId = 0;
    this.city = '';
    this.fName = '';
    this.lName = '';
    this.state = '',
      this.userName = '';
    this.zipCode = '';
  }
}
