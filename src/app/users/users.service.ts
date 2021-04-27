import { Users } from './users.model';
import { AppComponent } from './../app.component';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';
import { BehaviorSubject } from "rxjs/Rx";


@Injectable()
export class UsersService {
  private token: any;
  private headers = new Headers();
  private users: Users[];
  userUpdateEvent = new BehaviorSubject<Users>(null);
  userImageEvent = new EventEmitter<Users>();
  userPermissionEvent = new EventEmitter<Users>(null);
  userIndexEvent = new EventEmitter<number>();
  userSearchEvent = new EventEmitter<string>();
  regEmitEvent = new EventEmitter<string>();
  
  constructor(private httpClient: HttpClient) {
  }
  
  storeUsers(user: any, perfil: any){
    return this.httpClient.post(AppComponent.path+'/user/'+perfil, user);
  }

  updateUser(user: any, perfil: any){
    return this.httpClient.put(AppComponent.path+'/user/'+perfil, user);
  }

  getUsers(){
    return this.httpClient.get(AppComponent.path+'/users');
  }

  getUser(id){
    return this.httpClient.get( AppComponent.path+'/user/'+id);
  }

  getUserImage(imageName, rec): Observable<Blob>{
    return this.httpClient.get(AppComponent.path+'/downloadFile/'+imageName+"/"+rec, { responseType: 'blob' });
  }

  searchUser(user){
    return this.httpClient.get( AppComponent.path+'/searchuser/'+user);
  }
}
