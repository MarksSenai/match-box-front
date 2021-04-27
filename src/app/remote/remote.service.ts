import { Remote } from './../shared/remote.module';
import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { AppComponent } from './../app.component';

@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  public remoteEvent = new EventEmitter<any>();

  constructor() { }
}
