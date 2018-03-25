import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthService} from 'common/core/services/auth.service';
import {StorageService} from 'common/core/services/storage.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: StorageService) {}

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authData = this.auth.getAuthData();
    if (authData) {
      if (!authData.isAdmin) {
        return true;
      } else {
        const userData = this.storage.getUserData();
        if (userData && (userData.userId === 0 || userData.userId)) {
          return true;
        }
        this.router.navigate([''], {relativeTo: this.route});
        return false;
      }
    }
    this.router.navigate(['/']);
    return false;
  }
}
