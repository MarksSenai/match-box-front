import { Permission } from './../../shared/permission.model';
import { AlertService } from './../../alert/alert.service';
import { NgForm, FormGroup, FormControl, Validators, } from "@angular/forms"
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { UsersService } from './../users.service';
import { PermissionsService } from '../../permissions/permissions.service';
import { UploadFileService } from '../../upload/upload-file.service';
import { Users } from '../users.model';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  id: number;
  editMode = false;
  user: any;
  userUpdate: Users;
  permissionList: Permission[];

  constructor(private userService: UsersService,
    private permissionsService: PermissionsService,
    private uploadService: UploadFileService,
    private router: ActivatedRoute,
    private route: Router,
    private alertService: AlertService,
    private toastr: ToastrService) {}


   setDefaultImage(){
    if (this.user.picture === null
       || this.user.picture === "" || this.user.picture === "assets/user-default.jpg") {
      this.user.picture = "assets/user-default.jpg"; 
    }
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.userService.getUser(params.userid)
        .subscribe((userResponse: Users) => {
          this.userService.regEmitEvent.emit(userResponse.reg);
          let user = {
            id: userResponse.id,
            name: userResponse.name,
            email: userResponse.email,
            rfid: userResponse.rfid,
            reg: userResponse.reg,
            func: userResponse.func,
            password: userResponse.password,
            perfis: userResponse.perfis[0],
            picture: userResponse.picture,
            type: userResponse.type
      }
      
        this.user = user;
      
        this.userService.userImageEvent.emit(this.user);
        this.setDefaultImage();
      });
      this.permissionsService.getPermissionsByUser(params.userid)
      .subscribe((permissions: Permission[]) => {
        this.permissionList = permissions;
        this.permissionsService.permissionEventList.emit(this.permissionList)
      });
    })
    this.uploadService.imageEvent.subscribe((fileName: string) => {
      this.user.picture = fileName;
    });
  }

  onUpdateUser(){
    let perfil;

    if(this.user.perfis === 'USER'){
      perfil = 1;
    } else if (this.user.perfis == "ADMIN"){
      perfil = 2;
    }

    let user : any = this.userObjectBuilder();

    this.userService.updateUser(user, perfil).subscribe((response) => {   
      if(response == 200){
        this.user = JSON.stringify(response);
      } else if(response != 200){
        this.showSuccess("Usuário " + user.name + " editado com sucesso!");
      } 
  
    });
    this.route.navigate(['../users']);
 }
   onSubmit(){}

  private showError(message) {
    this.toastr.error(message);
  }

  private showSuccess(message) {
    this.toastr.success(message);
  }

  private userObjectBuilder(): any{
    let user : any = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email,
      rfid: this.user.rfid,
      reg: this.user.reg,
      func: this.user.func,
      password: btoa(this.user.password),
      picture: this.user.picture,
      type: this.user.type
    }
    return user;
  }  
}
