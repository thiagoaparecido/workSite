import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import {DexieService} from 'ngx-dexie';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';

import {User} from 'common/shared/models/user';
import {users} from 'common/shared/constants/users';

@Injectable()
export class UserService {

  users = users;

  constructor(private dexieService: DexieService) {}

  addUser(user: any): Observable<User> {
    user.isAdmin = false;
    user.chats = [];
    user.firm = null;
    return fromPromise(this.dexieService.addOne('users', user));
  }

  deleteUser(id: number): void {
    _.remove(this.users, (user) => {
      return user.id === id;
    });
  }

  getUsers(): Observable<User[]> {
    return fromPromise(this.dexieService.toArray('users'));
  }

  getUser(id: number): Observable<User> {
    return fromPromise(this.dexieService.getByPrimaryKey('users', id));
  }

  getUserByEmail(email: string): Observable<User> {
    return fromPromise(this.dexieService.getByKeyToValueMap('users', {email: email}));
  }

  updateUser(user: User): Observable<any> {
    const userId = user.id;
    delete user.id;
    return fromPromise(this.dexieService.update('users', userId, user));
  }
}
