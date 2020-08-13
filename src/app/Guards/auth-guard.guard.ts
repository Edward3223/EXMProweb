import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private auth: AuthService, private routes: Router ){}
  canActivate(): boolean  {
    if (this.auth.authentication() ) {
      return true;
    } else {
      this.routes.navigateByUrl('/login');
      return false;
    }
  
}

}
