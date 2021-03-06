import { AlertType } from './../AlertType';
import { Alert } from './../Alert';
import { AlertService } from './../alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
   moduleId: module.id,
   selector: 'alert',
   templateUrl: './alert.component.html',
   styleUrls: ['./alert.component.css']
})

export class AlertComponent {
   alerts: Alert[] = [];

   constructor(private alertService: AlertService) { }

   ngOnInit() {
       this.alertService.getAlert().subscribe((alert: Alert) => {
           if (!alert) {
               // clear alerts when an empty alert is received
               this.alerts = [];
               return;
           }

           // add alert to array
           this.alerts.push(alert);
           setTimeout(() => this.removeAlert(alert), 5000);
       });
   }

   removeAlert(alert: Alert) {
       this.alerts = this.alerts.filter(x => x !== alert);
   }

   cssClass(alert: Alert) {
       if (!alert) {
           return;
       }

       // return css class based on alert type
       switch (alert.type) {
           case AlertType.Success:
               return 'alert alert-success';
           case AlertType.Error:
               return 'alert alert-danger';
           case AlertType.Info:
               return 'alert alert-info';
           case AlertType.Warning:
               return 'alert alert-warning';
       }
   }
}
