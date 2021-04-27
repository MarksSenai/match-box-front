import { Component, OnInit } from '@angular/core';
import { UsersService } from './../users.service';
import { Users } from '../users.model';
import { Subject, Subscription } from 'rxjs/';

@Component({
  selector: 'app-user-list-permission',
  templateUrl: './user-list-permission.component.html',
  styleUrls: ['./user-list-permission.component.css']
})
export class UserListPermissionComponent implements OnInit {

  users: Users[];
  user: string;
  subscription: Subscription;
  
  constructor(private usersService: UsersService) {}

  ngOnInit() {
         this.usersService.userUpdateEvent
          .subscribe(
             (user: Users) => {
              this.usersService.getUsers().subscribe((data: any[]) => {
                this.users = data;
        })
       });
  }

  getUser(index: number){
    this.usersService.userPermissionEvent.emit(this.users[index]);
  }

  searchUser(event: Event){
    this.user = (<HTMLInputElement>event.target).value
    if(this.user.length < 3){
      this.usersService.getUsers().subscribe((data: any[]) => {
        this.users = data;
})
    } else if(this.user.length >= 3){
      this.usersService.searchUser(this.user).subscribe((data: any) => {
        this.users = data
      })
    }
   
  }

}
