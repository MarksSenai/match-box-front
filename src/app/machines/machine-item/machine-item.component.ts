import { Component, OnInit, Input } from '@angular/core';
import { Machine } from './../machine.model';
import { MachinesService } from './../machines.service';

@Component({
  selector: 'app-machine-item',
  templateUrl: './machine-item.component.html',
  styleUrls: ['./machine-item.component.css']
})
export class MachineItemComponent implements OnInit {
  @Input() machine: Machine;

  constructor(private machinesService: MachinesService) {}

  getMachine(i){
    this.machinesService.getMachine(i).subscribe(
      (machine: any []) =>  {
      this.machinesService.machineUpdateEvent.emit(this.machine)
      })
  }

  public setMachine(machine){
    this.machine = machine;
  }

  ngOnInit() {
  }

}
