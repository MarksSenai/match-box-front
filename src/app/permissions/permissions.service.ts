import { UsersService } from './../users/users.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Users } from '../users/users.model';
import { Machine } from '../machines/machine.model';
import { AppComponent } from './../app.component';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Permission } from '../shared/permission.model';

@Injectable()
export class PermissionsService {
  private users: Users[];
  private machines: any;
  userPermissionEvent = new EventEmitter<Users>();
  machinePermissionEvent = new EventEmitter<any[]>();
  permissionEventList = new EventEmitter<Permission[]>();
  permissionDeleteEvent = new EventEmitter<number>();
  permissionEventCreate = new EventEmitter<any>();


  constructor(private httpClient: HttpClient) {}

  storePermission(user: Users, machines: any[]){
    this.machines = JSON.stringify(machines);
    return this.httpClient.post(AppComponent.path+'/permission/'+user.id, machines);
 
   }

   getPermissionsByUser(id){
    return this.httpClient.get( AppComponent.path+'/permissions/user/'+id);
  }

  deletePermission(id){
    return this.httpClient.delete( AppComponent.path+'/permission/'+id);
 }
}
