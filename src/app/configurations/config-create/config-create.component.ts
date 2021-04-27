import { Configuration } from './../configuration';
import { ConfigService } from './../config.service';
import { Component, OnInit, Injectable, Input } from '@angular/core';
import { FormsModule, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-config-create',
  templateUrl: './config-create.component.html',
  styleUrls: ['./config-create.component.css']
})
export class ConfigCreateComponent implements OnInit {
  @Input() config: any
  expirationTime: number = 60;

  constructor(private configService: ConfigService,
    private route: Router) { }

  onSubmit(form: NgForm){
    
    this.config = form.value.configData;
    this.configService.storeConfiguration(this.config).subscribe((response) => {
      this.route.navigate(['../config-update']);
      this.configService.configEvent.emit(this.config);
    });
  }

  ngOnInit() {
    this.expirationTime = 60;
  }

}
