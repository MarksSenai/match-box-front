import { UsersService } from './../users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Users } from '../users.model';
import { Subject, Subscription } from 'rxjs/';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: Users[];
  subscription: Subscription;
  
  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.searchUser();
   this.usersService.getUsers()
    .subscribe(
      (data: any[]) => {
        this.users = data;
      }),
         this.usersService.userUpdateEvent
          .subscribe(
             (user: Users) => {
              this.usersService.getUsers().subscribe((data: any[]) => {
                this.users = data;
        })
       });
  }

  getUser(index: number){
    return this.users[index];
  }

  searchUser(){
    this.usersService.userSearchEvent.subscribe((user: string) =>{
      if(user.length >= 3){
        this.usersService.searchUser(user).subscribe((users: Users[]) => {
          this.users = users;
        });       
      } else if (user.length < 3) {
        this.usersService.getUsers().subscribe((users: Users[]) => {
          this.users = users;
        });
      }

    });
  }
}
