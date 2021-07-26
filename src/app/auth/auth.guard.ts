import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHelper } from '../utils/auth-helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){

  }

  canActivate() {
      if(!AuthHelper.isLoggedIn()) {
        this.router.navigateByUrl("/login")
        return false
      }
      return true;
  }
  
}
