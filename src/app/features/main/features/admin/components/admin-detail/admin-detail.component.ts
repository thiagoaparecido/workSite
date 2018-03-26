import { Component, OnInit } from '@angular/core';

import {User} from 'common/core/models/user';
import {UserService} from 'common/core/services/user.service';
import {AuthService} from 'common/core/services/auth.service';
import {StorageService} from 'common/core/services/storage.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

  user: User;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    const authData = this.auth.getAuthData();
    this.storage.setUserData({userId: authData.userId});
    this.userService.getUser(authData.userId)
      .subscribe(
        (user: User) => {
          this.user = user;
        }
      );
  }

}
