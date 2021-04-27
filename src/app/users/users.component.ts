import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: string;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
  }
  searchUser(event: Event){
    this.user = (<HTMLInputElement>event.target).value
    this.usersService.userSearchEvent.emit(this.user);
  }
}
