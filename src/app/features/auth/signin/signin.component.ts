import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from 'common/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  notAccessMSG = false;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submit(): void {
    this.auth.signin(this.form.value)
      .subscribe(
        (isAuth: any): void => {
          if (isAuth) {
            if (isAuth.isAdmin) {
              this.router.navigate(['/admin']);
              return;
            }
            this.router.navigate(['/user']);
          } else {
            this.notAccessMSG = true;
          }
          return;
        }
      );
  }
}
