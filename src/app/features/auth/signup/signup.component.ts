import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import * as _ from 'lodash';

import {UserService} from 'common/core/services/user.service';
import {Observable} from 'rxjs/Observable';
import {User} from 'common/core/models/user';
import {of} from 'rxjs/observable/of';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email], [this.matchEmail.bind(this)]],
      passwordGroup: this.formBuilder.group({
        password1: [null, Validators.required],
        password2: [null, Validators.required]
      }, {
        validator: (form: FormGroup) => {
          const password1 = form.get('password1').value;
          const password2 = form.get('password2').value;
          if (password1 !== password2) {
            return { nomatch: true };
          }
          return null;
        }
      }),
      firstName: [null, Validators.required],
      surName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      gender: [null, Validators.required],
      city: [null, Validators.required]
    });
  }

  matchEmail(control: FormControl): Observable<any> {
    return this.userService.getUserByEmail(control.value)
      .pipe(
        switchMap((user: User): Observable<any> => {
          return user ? of({'matchemail': true}) : of(null);
        })
      );


      /*.switchMap((user: User): Observable<any> => {
        return user ? of({'matchemail': true}) : of(null);
      });*/
  }

  reset(): void {
    this.form.reset();
  }

  submit(): void {
    const user = _.clone(this.form.value);
    delete user.passwordGroup;
    user.dateOfBirth = new Date(user.dateOfBirth.date.year, user.dateOfBirth.date.month - 1, user.dateOfBirth.date.day);
    user.password = this.form.value.passwordGroup.password1;
    this.userService.addUser(user)
      .subscribe();
    this.router.navigate(['/auth/signin']);
  }
}
