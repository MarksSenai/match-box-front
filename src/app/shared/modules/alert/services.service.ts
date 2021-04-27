import { Alert } from './model/Alert';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ServicesService {
  alertSettings$ = new Subject<Alert>()

  constructor() { }

  create(
  	title: string, type: string , time: number, body: string){
  	this.alertSettings$.next({
  		title,
  		type,
  		time,
  		body
  	});
  }

}
