import { AlertService } from './../../alert/alert.service';
import { Machine } from './../machine.model';
import { MachinesService } from './../machines.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-machine-update',
  templateUrl: './machine-update.component.html',
  styleUrls: ['./machine-update.component.css']
})
export class MachineUpdateComponent implements OnInit {

  machine: any;

  /**
	 * Constructor
	 *
	 * @param {NotifierService} notifier Notifier service
	 */

  constructor(private router: ActivatedRoute,
              private route: Router,
              private machineService: MachinesService,
              private alertService: AlertService,
              private toastr: ToastrService) {
               }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.machineService.getMachine(params.machineid)
      .subscribe((machine: Machine) => {
        this.machine = machine;
      });
    })
  }

  onUpdateMachine(){
      this.machineService.updateMachine(this.machine).subscribe(response =>{
        if(response == 200){
          this.machine = JSON.stringify(response);
          this.showSuccess("Máquina " +this.machine.name+ " editada com sucesso!");
        } else if(this.machine.status != 200) {
          this.showSuccess("Máquina " +this.machine.name+ " editada com sucesso!");
        } 
      this.route.navigate(['../machines']);

    });
  }

  private showError(message) {
    this.toastr.error(message);
  }

  private showSuccess(message) {
    this.toastr.success(message);
  }
}
