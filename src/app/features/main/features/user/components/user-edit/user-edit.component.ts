import {Component, EventEmitter, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';

import {UserService} from 'common/core/services/user.service';
import {User} from 'common/core/models/user';
import {CanComponentDeactivate} from 'common/core/guards/can-deactivate.guard';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, CanComponentDeactivate {

  date: any;
  goToAnotherPage: EventEmitter<boolean> = new EventEmitter<boolean>();
  form: FormGroup;
  user: User;
  userEdit: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private location: Location,
    private modalService: ModalDialogService,
    private route: ActivatedRoute,
    private router: Router,
    private viewRef: ViewContainerRef) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['user'];
    this.date = {
      date:
        {
          year: this.user.dateOfBirth.getFullYear(),
          month: this.user.dateOfBirth.getMonth() + 1,
          day: this.user.dateOfBirth.getDate()
        }
    };
    this.userEdit = {
      email: this.user.email,
      firstName: this.user.firstName,
      surName: this.user.surName,
      dateOfBirth: this.date,
      gender: this.user.gender,
      city: this.user.city,
    };
    this.formInit();
    this.form.patchValue(this.userEdit);
  }

  formInit() {
    /*this.form = this.formBuilder.group({
      email: [this.userEdit.email, Validators.required],
      firstName: [this.userEdit.firstName, Validators.required],
      surName: [this.userEdit.surName, Validators.required],
      dateOfBirth: [this.userEdit.dateOfBirth, Validators.required],
      gender: [this.userEdit.gender, Validators.required],
      city: [this.userEdit.city, Validators.required]
    });*/
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      firstName: [null, Validators.required],
      surName: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      gender: [null, Validators.required],
      city: [null, Validators.required]
    });
  }

  submit() {
    this.userEdit = this.form.value;
    const date = this.form.value.dateOfBirth.date;
    const editUser = _.assign({}, this.user, this.form.value,
      {dateOfBirth: new Date(date.year, date.month - 1, date.day)});
    this.userService.updateUser(editUser)
      .subscribe(
        () => {
          this.router.navigate(['/user']);
        }
      );
  }

  reset() {
    console.log(_.isEqual(this.form.value, this.userEdit));
    this.form.reset(this.userEdit);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (_.isEqual(this.form.value, this.userEdit)) {
      return true;
    } else {
      this.modalService.openDialog(this.viewRef, {
        title: 'Змінено дані',
        childComponent: SimpleModalComponent,
        data: {
          text: 'Ви змінили певні дані, однак для того щоб їх зберегти вам потрібно натиснути кнопку "Редагувати"'
        },
        settings: {
          closeButtonClass: 'close theme-icon-close'
        },
        actionButtons: [
          {
            text: 'Покинути',
            buttonClass: 'btn btn-success',
            onAction: () => { this.goToAnotherPage.emit(true); return true; }
          },
          {
            text: 'Залишитися',
            buttonClass: 'btn btn-info',
            onAction: () => { this.goToAnotherPage.emit(false); return true; }
          }
        ]
      });

      return this.goToAnotherPage;
    }
  }

  go() {
    this.router.navigate(['/auth/signup']);
  }

}
