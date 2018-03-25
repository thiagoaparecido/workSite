import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from 'common/core/services/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authData = this.auth.getAuthData();
    if (authData) {
      if (authData.isAdmin) {
        return true;
      } else {
        this.router.navigate(['/user']);
        return false;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
