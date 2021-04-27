import { Configuration } from './../configuration';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from './../config.service';
import { AlertService } from './../../alert/alert.service';
import { Observable } from  "rxjs/Observable";

@Component({
  selector: 'app-config-update',
  templateUrl: './config-update.component.html',
  styleUrls: ['./config-update.component.css']
})
export class ConfigUpdateComponent implements OnInit {
  config: any;
  isDisabled: boolean = false;

  constructor(private configService: ConfigService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.setConfig();
    this.checkConfigValue();
  }

  setConfig() {
      this.configService.configEvent.subscribe((config: Configuration) => {
        this.config = config;
      });
  }
  
  getConfig(){
    this.configService.getConfiguration().subscribe((response)=>{
      this.config = response;
    });
  }

  onUpdateConfig() {
    this.configService.updateConfiguration(this.config).subscribe((response) => {
      if(response != undefined){
        this.alertService.success("Configurações editadas com sucesso!");
        this.setConfig();
        this.configService.configEvent.emit(response);
      }  
    });
  }

  checkConfigValue() {
    if(this.config == undefined || this.config == null){
      this.getConfig();
    }
  }

  onFilterChange() {
    if (this.isDisabled == true) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }  
  }
}