import { PermissionsService } from '../permissions/permissions.service';
import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from '../users/users.service';
import { Users } from '../users/users.model';

@Component({
  selector: 'app-permissions-user',
  templateUrl: './permissions-user.component.html',
  styleUrls: ['./permissions-user.component.css']
})

export class PermissionsUserComponent implements OnInit {
  @Input() user: Users;

  constructor(private permissionsService :PermissionsService,
     private usersService: UsersService) {}


  ngOnInit() {
    this.usersService.userPermissionEvent
    .subscribe(
      (user: Users) => {
        this.setUser(user);
     });
     this.permissionsService.permissionEventCreate.subscribe((data: any) => {
        this.cleanSelectedUser();
     });
  }

  setUser(user){
    this.user = user;
    this.permissionsService.userPermissionEvent.emit(this.user);
  }
  cleanSelectedUser(){
    this.user = null;
  }

}
