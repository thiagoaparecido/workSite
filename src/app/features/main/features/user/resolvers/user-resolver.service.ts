import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {User} from 'common/shared/models/user';
import {AuthService} from 'common/core/services/auth.service';
import {StorageService} from 'common/core/services/storage.service';
import {UserService} from 'common/core/services/user.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private storage: StorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(this.storage.getUserData().userId);
  }
}
