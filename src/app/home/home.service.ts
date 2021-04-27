import { AppComponent } from './../app.component';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Report } from '../shared/report.model';

@Injectable()
export class HomeService {
  private home: Report[];
  homeUpdateEvent = new EventEmitter<any[]>();
  constructor(private httpClient: HttpClient) {}

  getMachineStatus(){
    return this.httpClient.get<any>(AppComponent.path+'/report/machines');
  }

  getConfigurations(){
    return this.httpClient.get<any>(AppComponent.path+'/configuration');
  }

}
