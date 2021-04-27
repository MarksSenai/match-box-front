import { AppComponent } from './../../app.component';
import { Machine } from './../../machines/machine.model';
import { Remote } from './../../shared/remote.module';
import { RemoteService } from './../remote.service';
import { Configuration } from './../../configurations/configuration';
import { MachinesService } from './../../machines/machines.service';
import { ConfigService } from './../../configurations/config.service';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'remote-update',
  templateUrl: './remote-update.component.html',
  styleUrls: ['./remote-update.component.css']
})
export class RemoteUpdateComponent implements OnInit {
  config : Configuration;
  machine : Machine;
  remote : Remote;

  constructor(private configService : ConfigService,
     private macService : MachinesService,
     private remoteService : RemoteService, 
     private httpClient : HttpClient) { }

  ngOnInit() {
    this.getConfigurations();
    this.remoteService.remoteEvent.subscribe((machine : any) => {
      this.machine = machine;
    })
  }

  getConfigurations() {
    this.configService.getConfiguration().subscribe((config: Configuration) => {
      this.config = config;
    }); 
  }

  sendDataDevice() {    
    let remote: any = this.remoteObjectBuilder();
    console.log("OK", remote);
    console.log("APP POST", AppComponent.path+'/remoteUpdate');
    this.httpClient.post(AppComponent.path+'/remoteUpdate', remote)
    .subscribe(response =>{

    });
  }

  private remoteObjectBuilder(): any {
    let remote: any = {
      factory: this.config.companyname,
      macId: this.machine.macid,
      machineIP: this.machine.machineIP,
      machinePort: this.machine.machinePort,
      autoLogOutTime: this.config.rotationtime,
      companyLogo: this.config.companypicture 
    }
    return remote;
  }
}