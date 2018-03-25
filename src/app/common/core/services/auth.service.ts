import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {switchMap} from 'rxjs/operators';

import {StorageService} from './storage.service';
import {UserService} from 'common/core/services/user.service';
import {User} from 'common/shared/models/user';

@Injectable()
export class AuthService {

  changedAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.getAuthData());

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: StorageService) {}

  getAuthData(): any {
    return this.storage.getAuth();
  }

  isAuth(): boolean {
    return !!this.storage.getAuth();
  }

  logout(): void {
    this.storage.setAuth(false);
    this.storage.setUserData(false);
    this.router.navigate(['/']);
    this.changedAuth.next(false);
  }

  signup(user: any): boolean {
    const isExist = this.userService.getUserByEmail(user.email);
    if (isExist) {
      return false;
    } else {
      this.userService.addUser(user);
      return true;
    }
  }

  signin(signinData: any): any {
    return this.userService.getUserByEmail(signinData.email)
      .pipe(
        switchMap((user: User): Observable<any> => {
            console.log(user);
            if (user) {
              if (user.password === signinData.password) {
                const authData = {
                  token: true,
                  isAdmin: user.isAdmin,
                  userId: user.id,
                };
                if (!authData.isAdmin) {
                  this.storage.setUserData({
                    userId: authData.userId
                  });
                }
                this.storage.setAuth(authData);
                this.changedAuth.next(true);
                return of(authData);
              }
            }
            this.storage.setAuth(false);
            return of(false);
        })
      );
  }
}
