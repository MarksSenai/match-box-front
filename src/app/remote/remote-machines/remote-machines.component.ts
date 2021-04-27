import { RemoteService } from './../remote.service';
import { Machine } from './../../machines/machine.model';
import { MachinesService } from './../../machines/machines.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'remote-machines',
  templateUrl: './remote-machines.component.html',
  styleUrls: ['./remote-machines.component.css']
})
export class RemoteMachinesComponent implements OnInit {
  machines : Machine;

  constructor(private machinesService: MachinesService,
     private remoteService : RemoteService) { }

  ngOnInit() {
    this.getMachines();
  }

  selectMachine(machine: any) {
    this.remoteService.remoteEvent.emit(machine);
  }

  getMachines() {
    this.machinesService.getMachines().subscribe((machines : Machine) => {
      this.machines = machines;
    } );
  }

}
