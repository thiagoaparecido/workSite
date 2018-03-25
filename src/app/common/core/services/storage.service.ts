import {Injectable} from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class StorageService {

  getAuth(): any {
    return JSON.parse(localStorage.getItem('authData'));
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem('userData'));
  }

  setAuth(authData: any): void {
    localStorage.setItem('authData', JSON.stringify(authData));
  }

  setUserData(userData: any): void {
    if (!userData) {
      localStorage.removeItem('userData');
      return;
    }
    const verifyData = localStorage.getItem('userData');
    if (!verifyData) {
      const data = _.assign({}, userData);
      localStorage.setItem('userData', JSON.stringify(data));
    } else {
      let data = JSON.parse(verifyData);
      data = _.assign({}, data, userData);
      localStorage.setItem('userData', JSON.stringify(data));
    }
  }
}
