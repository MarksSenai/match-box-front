import { AlertService } from './../alert/alert.service';
import { Machine } from './../machines/machine.model';
import { MachinesService } from './../machines/machines.service';
import { PermissionsService } from './permissions.service';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Users } from '../users/users.model';
import { UsersService } from '../users/users.service';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
  @Input() user: Users;
  @Input() machines: any[];
 
    constructor(private usersService: UsersService,
       private permissionService :PermissionsService,
      private machinesService: MachinesService,
      private alertService: AlertService) {}

  ngOnInit() {
    this.permissionService.userPermissionEvent.subscribe((user: Users) => { 
      this.user = user;  
    });  
       
    this.permissionService.machinePermissionEvent.subscribe((machines: any[])=> {
      this.machines = machines;
    });
    
  }

  onCreatePermission(){
      this.permissionService.storePermission(this.user, this.machines).subscribe(response =>{
      this.permissionService.permissionEventCreate.emit(response);   
      if(response === 200){
        // this.alertService.success("Permissões cadastradas com sucesso para "+this.user.name);
      } else if(response != 200){
        // this.alertService.error("Erro no cadastro de permissões para "+this.user.name);
      }    
    })
  }
}
