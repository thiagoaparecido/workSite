import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {User} from 'common/core/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;
  tab = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  changeTab(): void {
    this.tab = !this.tab;
  }
}
