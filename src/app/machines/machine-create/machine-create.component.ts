import { FormsModule, NgForm } from '@angular/forms';
import { MachinesService } from './../machines.service';
import { Machine } from './../machine.model';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-machine-create',
  templateUrl: './machine-create.component.html',
  styleUrls: ['./machine-create.component.css']
})
export class MachineCreateComponent implements OnInit {
  @Input() machine: Machine;

  constructor(private machinesService: MachinesService,
    private route: Router) {}

  onSubmit(form: NgForm){
    
    this.machine = form.value.machineData;
    this.machinesService.storeMachines(this.machine)
    .subscribe(
      (response) => {console.log(response),
         this.machinesService.machineUpdateEvent.emit(this.machine)},
      (error) => console.log(error));
      this.route.navigate(['../machines']);
  }

  onGetMachines(){
    this.machinesService.getMachines()
    .subscribe(
      (users: any []) =>  console.log(users),
      (error) => console.log(error));
  }

  ngOnInit() {
       
    this.machinesService.machineUpdateEvent
    .subscribe(
       (machine: Machine) => {         
        this.machinesService.getMachine(machine.id).subscribe((data: any[]) => {
        })
    });
  }
}
