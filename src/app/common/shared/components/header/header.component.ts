import {Component, ChangeDetectorRef, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {DexieService} from 'ngx-dexie';

import {AuthService} from 'common/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dexieService: DexieService) { }

  ngOnInit(): void {

    this.getInfoAboutAuth();
    this.auth.changedAuth
      .subscribe(
        (bool: boolean) => {
          this.isAuth = bool;
        }
      );
  }

  getInfoAboutAuth(): void {
    this.isAuth = this.auth.isAuth();
  }

  goToCabinet(): void {
    const isAdmin = this.auth.getAuthData().isAdmin;
    isAdmin ?
      this.router.navigate(['/admin']) :
      this.router.navigate(['/user']);
  }

  logout(): void {
    this.auth.logout();
  }

  dexie() {
    this.dexieService.update('users', 1, {isAdmin: true});
  }
}
