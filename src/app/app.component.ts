import { EnvService } from './env.service';
import { Configuration } from './configurations/configuration';
import { ConfigService } from './configurations/config.service';
import { AuthService } from './security/auth.service';
import { Router } from '@angular/router';
import { Component, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  private companyname: string;
  private config: Configuration;
  private static url: string;
  public static path;
  public static pathLogin;
  constructor(private router : Router, private titleService: Title,
     private configService : ConfigService, private env: EnvService){}

ngOnInit() {
  AppComponent.url = this.env.apiUrl;
  AppComponent.path = AppComponent.url+'/portal'; 
  AppComponent.pathLogin = AppComponent.url+'/auth/login'; 
  this.getCompayName();
  this.configService.configEvent.subscribe((config: Configuration) => {
    this.companyname = config.companyname
  });
}

private getCompayName() {
  this.configService.getConfiguration().subscribe((response)=>{
    if (response === null) {
      this.companyname = 'Matchbox';
    } else if (response.companyname === null || response.companyname === undefined) {
      this.companyname = 'Matchbox';  
    } else {
      this.companyname = response.companyname;
    }
    this.companyname = response.companyname;
  });
}

public setTitle( newTitle: string) {
  this.titleService.setTitle( "Match-Box" );
}
  
  title = 'app';
  disableNavBar() {
    return this.router.url !== '/login'
  }
}