import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';

import {User} from 'common/core/models/user';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data
      .subscribe(
        (data: Data) => {
          this.user = data['user'];
        }
      );
  }
}
