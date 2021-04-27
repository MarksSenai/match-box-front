import { MachinesService } from './../machines.service';
import { Machine } from './../machine.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs/';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.css']
})
export class MachinesListComponent implements OnInit {
  machines: Machine[];
  subscription: Subscription;

  constructor(private machinesService: MachinesService) {}

  ngOnInit() {
    this.machinesService.getMachines()
     .subscribe(
       (data: any[]) => {
         this.machines = data;
       }),
          this.machinesService.machineUpdateEvent
           .subscribe(
              (machine: Machine) => {
               this.machinesService.getMachines().subscribe((data: any[]) => {
                 this.machines = data;
               })
        });
   }
}
