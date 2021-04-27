import { AuthService } from './../../security/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService) {
  }

  ngOnInit() {
  }

  private logout() {
    this.auth.cleanAccessToken();
  }
}
