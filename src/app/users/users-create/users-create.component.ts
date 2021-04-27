import { FormsModule, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Users } from './../users.model';
import { UsersService } from './../users.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { AlertService } from './../../alert/alert.service';


@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {
 @Input() user: Users;

 
 
  constructor(private usersService: UsersService,
    private route: Router,
    private alertService: AlertService) {}

  onSubmit(form: NgForm){
    this.route.navigate(['../users']);
    this.user = form.value.userData;
    let perfil: any;
    if(this.user.perfis === 'USER'){
      perfil = 1;
    } else if (this.user.perfis == "ADMIN"){
      perfil = 2;
    }

    let user : any = {
      name: this.user.name,
      email: this.user.email,
      rfid: this.user.rfid,
      reg: this.user.reg,
      func: this.user.func,
      password: this.user.password,
      picture: this.user.picture,
      type: this.user.type
}
    this.usersService.storeUsers(user, perfil)
    .subscribe(
      (response) => {
        if(response == 200){
          this.alertService.success("Usuário "+this.user.name+" criado com sucesso!");
        }
         this.usersService.userUpdateEvent.next(this.user)},
      (error) => {
        this.alertService.error(error);
      });
  }
  
  onAddUser(){
    this.user;
  }

  onGetUsers(){
    this.usersService.getUsers()
    .subscribe(
      (users: any []) =>  console.log(users),
      (error) => console.log(error));
  }

  ngOnInit() {
    this.usersService.userUpdateEvent
    .subscribe(
       (user: Users) => {
        this.usersService.getUser(user.id).subscribe((data: any[]) => {
        })
    });
  }

}
