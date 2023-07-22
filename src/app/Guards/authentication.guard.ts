import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/Authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuardGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private routService: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn$.value) {
      return true;
    }

    this.routService.navigateByUrl('/Authentication/login');
    return false;
  }
}
