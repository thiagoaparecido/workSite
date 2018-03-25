import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {MyDatePickerModule } from 'mydatepicker';

import {AuthComponent} from './container/auth/auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {HeaderComponentModule} from 'common/shared/components/header/header-component.module';

@NgModule({
  imports: [
    AuthRoutingModule,
    CommonModule,
    HeaderComponentModule,
    MyDatePickerModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent,
    SignupComponent,
    SigninComponent
  ]
})
export class AuthModule {}
