import { getTestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppComponent } from './../app.component';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {

  oauthTokenURL = AppComponent.pathLogin;
  jwtPayload: any;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.loadToken();
  }

  login(username: string, password: string) {
    const body = `{"username":"${username}", "password":"${password}"}` 
    return this.httpClient.post(this.oauthTokenURL, body)
      .toPromise()
      .then(response => {
      let json =  JSON.stringify(response)
      //this.storeToken(JSON.stringify(JSON.parse(json).accessToken));
      this.storeToken(JSON.parse(json).accessToken);
       
      })
      .catch(response => {
      if (response.status === 401) {
        if (response.error.message === 'Bad credentials') {
            return Promise.reject(false);
        }
      }
      return Promise.reject(response);
      });
  }

  private storeToken(token: string){
    this.jwtPayload = jwt_decode(token);
    localStorage.setItem('token', token);
    this.router.navigate(["../home"]);
  }

  private loadToken() {
    const token = localStorage.getItem('token');
  
    if (token) {
      this.storeToken(token);
    }
  }

  private getToken(): string {
    return localStorage.getItem('token');
  }

  cleanAccessToken(){
    localStorage.removeItem('token');
    this.jwtPayload = null;
    this.router.navigate(["../login"]);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) return null;
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public isTokenExpired() {
    const token = this.getToken();
    if (token == null) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if(date === undefined) {
      return true;
    } 
    return (date.valueOf() < new Date().valueOf());
  }

}
