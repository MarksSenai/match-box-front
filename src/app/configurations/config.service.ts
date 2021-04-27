import { Observable } from 'rxjs/Observable';
import { Configuration } from './configuration';
import { Injectable, EventEmitter } from '@angular/core';
import { AppComponent } from './../app.component';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable()
export class ConfigService {
  companyLogo: string = 'companyLogo';

  configEvent = new EventEmitter<any>();
  constructor(private httpClient: HttpClient) {}

    getConfiguration(){
      return this.httpClient.get<Configuration>(AppComponent.path+"/configuration");
    }

    getCompanyLogo() {
      return this.httpClient.get(
        AppComponent.path+'/companyLogo/'+this.companyLogo, { responseType: 'blob' });
    }

    storeConfiguration(config: any){
      return this.httpClient.post(AppComponent.path+'/configuration', config);
    }

    updateConfiguration(config: Configuration){
     return this.httpClient.put(AppComponent.path+"/configuration", config);
    }
}
