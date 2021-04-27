import { HomeService } from './home.service';
import { Component, OnInit } from '@angular/core';
import { Report } from '../shared/report.model';
import { Configuration } from '../shared/conf.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  home: Report;
  homeArray: any[] = []
  conf = Configuration
  confArray: any[] = []

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getMachineStatus()
    .subscribe((home: any[]) => {  
      this.homeArray = home;
      this.homeService.homeUpdateEvent.emit(this.homeArray); 
      });

      this.homeService.getConfigurations()
    .subscribe((conf: any[]) => {  
      this.confArray = conf;
      this.homeService.homeUpdateEvent.emit(this.confArray); 
      });
  }
}
