import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MyDatePickerModule} from 'mydatepicker';

import {UserComponent} from './container/user/user.component';
import {UserRoutingModule} from './user-routing.module';
import { MyModalComponent } from './modals/my-modal/my-modal.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ResumeDetailComponent } from './components/resume-detail/resume-detail.component';
import { ResumeEditComponent } from './components/resume-edit/resume-edit.component';
import {UserDetailModule} from 'common/shared/components/user-detail/user-detail.module';
import { SuggestionDetailComponent } from './components/suggestion-detail/suggestion-detail.component';
import { SuggestionEditComponent } from './components/suggestion-edit/suggestion-edit.component';

@NgModule({
  imports: [
    CommonModule,
    MyDatePickerModule,
    ReactiveFormsModule,
    UserRoutingModule,
    UserDetailModule
  ],
  declarations: [
    MyModalComponent,
    ResumeDetailComponent,
    ResumeEditComponent,
    UserComponent,
    UserDataComponent,
    UserEditComponent,
    SuggestionDetailComponent,
    SuggestionEditComponent
  ]
})
export class UserModule {}
