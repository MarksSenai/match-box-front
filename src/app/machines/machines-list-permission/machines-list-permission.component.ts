import { MachinesService } from './../machines.service';
import { Machine } from './../machine.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-machines-list-permission',
  templateUrl: './machines-list-permission.component.html',
  styleUrls: ['./machines-list-permission.component.css']
})
export class MachinesListPermissionComponent implements OnInit {

machines : Machine[];
machine: string;
  constructor(private machineService: MachinesService) { }

  ngOnInit() {
    this.getMachines();
  }

  getMachines(){
    this.machineService.getMachines().subscribe((data: any) => {
      this.machines = data;
   });
  }


  setMachineArray(machine: Machine){
    this.machineService.machineUpdateEvent.emit(machine);
  }

  searchMachine(event: Event){
    this.machine = (<HTMLInputElement>event.target).value
    if(this.machine.length < 3){
      this.getMachines();
    } else if(this.machine.length >= 3){
      this.machineService.searchMachine(this.machine).subscribe((data: any) => {
        this.machines = data;
      })
    }

  }

}
