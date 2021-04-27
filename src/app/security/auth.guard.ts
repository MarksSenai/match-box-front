import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate,
   ActivatedRouteSnapshot,
   RouterStateSnapshot,
   Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
  private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this.auth.isTokenExpired()) {
        return true;
      } else if (this.auth.isTokenExpired()) {
        this.router.navigate(["../login"]);
        return false;
      }
  }
}
