import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {User} from 'common/core/models/user';
import {StorageService} from 'common/core/services/storage.service';
import {UserService} from 'common/core/services/user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  sortProp: string;
  sortOrder: string;
  users: Observable<User[]>;

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: StorageService) { }

  ngOnInit(): void {
    this.users = this.userService.getUsers();
  }

  changeSort(prop): void {
    if (prop === this.sortProp) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    } else {
      this.sortProp = prop;
      this.sortOrder = 'asc';
    }
  }

  goToDetail(userId: number): void {
    this.storage.setUserData({userId: userId});
    this.router.navigate(['/user']);
  }
}
