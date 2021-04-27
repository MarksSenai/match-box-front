import { AppComponent } from './../app.component';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Report } from '../shared/report.model'
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReportService {
  private report: Report[];
  private token: any;
  reportUpdateEvent = new EventEmitter<Report[]>();

  constructor(private httpClient: HttpClient) {
  }

  getReports(limit: number){
    return this.httpClient.get(AppComponent.path+'/report/'+limit)
  }

  getAllReport(initialDate, finalDate, limit: number){
    return this.httpClient.get(AppComponent.path+'/report/'+initialDate+"/"+finalDate+"/"+limit)
   }

  getReportByUser(userId, initialDate, finalDate, limit: number) {
    return this.httpClient.get(AppComponent.path+'/report/user/'+userId+"/"+initialDate+"/"+
    finalDate+"/"+limit);
  }

  getReportByMachine(machineId, initialDate, finalDate, limit) {
    return this.httpClient.get(AppComponent.path+'/report/machine/'+machineId+"/"+initialDate+"/"+
    finalDate+"/"+limit);
  }

  getReportByUserAndMachine(userId, machineId, initialDate, finalDate, limit) {
    return this.httpClient.get(AppComponent.path+'/report/usermachine/'+userId+"/"+machineId+"/"+
    initialDate+"/"+finalDate+"/"+limit);
  }
  //Excel file requests
  generateExcelAll(initialDate, finalDate, limit): Observable<any> {
    return this.httpClient.get(AppComponent.path+'/genexcelall/'+initialDate+'/'+finalDate+'/'+limit);
 }

  generateExcelByUser(userId, initialDate, finalDate, limit): Observable<any>{
    return this.httpClient.get(AppComponent.path+'/genexceluser/'+initialDate+'/'+finalDate+'/'+
    userId+"/"+limit,
    { responseType: 'blob' });

  }

  generateExcelByMachine(macId, initialDate, finalDate, limit): Observable<Blob>{
    return this.httpClient.get(AppComponent.path+'/genexcelmac/'+initialDate+'/'+finalDate+'/'+
    macId+"/"+limit, { responseType: 'blob' });
  }

  generateExcelByUserAndMachine(initialDate, finalDate, userId, macId, limit): Observable<Blob>{
    return this.httpClient.get(AppComponent.path+'/genexcelusermac/'+initialDate+'/'+finalDate+'/'+
    userId+"/"+macId+"/"+limit, { responseType: 'blob' });
  }
}