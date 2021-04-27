import { AlertService } from './../alert/alert.service';
import { PermissionsService } from '../permissions/permissions.service';
import { MachinesService } from './../machines/machines.service';
import { Component, OnInit, Input} from '@angular/core';
import { Machine } from '../machines/machine.model';

@Component({
  selector: 'app-permissions-machine',
  templateUrl: './permissions-machine.component.html',
  styleUrls: ['./permissions-machine.component.css']
})
export class PermissionsMachineComponent implements OnInit {
  @Input() machine: Machine;
  machines: Machine[] = [];
  machineArray: any;

  constructor(private permissionsService : PermissionsService,
              private machinesService: MachinesService,
              private alertService: AlertService) {
     }

  ngOnInit() {
    
    this.machinesService.machineUpdateEvent.subscribe(
      (machine: Machine) => {
        this.setMachinesArray(machine)
    });
    this.permissionsService.permissionEventCreate.subscribe((data: any) =>{
        this.cleanSelectedMachines();
    });
  }

  setMachinesArray(machine){
     this.machines.forEach(function(i, index, mac){
      if(i.id == machine.id){
        this.alertService.error("Máquina "+machine.name+" já se encontra na lista ");
        this.showError(machine)
      }
    });
    this.machines.push(machine);
    this.machineArray = this.machines;
    this.permissionsService.machinePermissionEvent.emit(this.machineArray);
  }

  removePermission(id){
      this.machines.forEach(function(i, index, mac){
      if (id == i.id){
        mac.splice(index, 1)
      }
    });
  }
  
  cleanSelectedMachines(){
    this.machines = []
  }
}
