import {Component, Input, OnInit} from '@angular/core';

import {User} from 'common/core/models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user: User;

  tab = true;

  constructor() { }

  ngOnInit(): void {}

  changeTab(): void {
    this.tab = !this.tab;
  }
}
