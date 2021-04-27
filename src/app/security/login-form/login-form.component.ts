import { Login } from './../../shared/login.model';
import { FormsModule, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginFormComponent implements OnInit {
  login: Login;
  auth: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) { }

  onAuth(form: NgForm){
    this.login = form.value.loginData;
    this.authService.login(this.login.email, this.login.password)
    .catch(erro => {
      this.auth = erro;
    });
  }

  redirectToHome() {
   if (this.authService.isTokenExpired()) {
     this.router.navigate(["../home"]);
   }
  }

  ngOnInit() {
    this.redirectToHome();
  }
}
