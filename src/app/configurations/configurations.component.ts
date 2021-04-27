import { Component, OnInit } from '@angular/core';
import { Configuration } from './configuration';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
  config: Configuration = null;

  constructor(private configService: ConfigService) { }

  ngOnInit() {
    this.createConfigListener(); 
    this.checkConfigValue();
  }

  createConfigListener(){
    this.configService.configEvent
    .subscribe((config: Configuration) => {
      this.config = config;
      this.configService.configEvent.emit(config);
    });
  }

  getConfigurations(){
    this.configService.getConfiguration().subscribe((config: Configuration) => {
      this.config = config;
    });
  }
  checkConfigValue(){
    if (this.config === null) {
      this.getConfigurations();
    }
  }

}
