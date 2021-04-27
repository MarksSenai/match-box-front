import { Machine } from './machine.model';
import { AppComponent } from './../app.component';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';

@Injectable()
export class MachinesService {
  private users: Machine[];
  machineUpdateEvent = new EventEmitter<Machine>();

  constructor(private httpClient: HttpClient) {}

  storeMachines(machines: any){
   return this.httpClient.post(AppComponent.path+'/machine', machines);
  }

  updateMachine(machine: Machine){
    return this.httpClient.put(AppComponent.path+'/machine', machine);
  }

  getMachines(){    
    return this.httpClient.get(AppComponent.path+'/machines');
  }

  getMachine(id){
    return this.httpClient.get(AppComponent.path+'/machineid/'+id);
  }

  searchMachine(machine){
    return this.httpClient.get(AppComponent.path+'/searchmachine/'+machine)
    .map((response: Response) => {
      const data = response.json();
      return data;
    });
  }
}
