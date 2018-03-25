import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import { AdminComponent } from './container/admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { ResumeListComponent } from './components/resume-list/resume-list.component';
import {FilterArrayPipeModule} from 'common/shared/pipes/filter-array-pipe/filter-array-pipe.module';
import {GenderPipeModule} from 'common/shared/pipes/gender-pipe/gender-pipe.module';
import {OrderByPropModule} from 'common/shared/pipes/order-by-prop-pipe/order-by-prop-pipe.module';
import {UserDetailModule} from 'common/shared/components/user-detail/user-detail.module';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    FilterArrayPipeModule,
    GenderPipeModule,
    OrderByPropModule,
    ReactiveFormsModule,
    UserDetailModule
  ],
  declarations: [
    AdminComponent,
    AdminDetailComponent,
    ResumeListComponent,
    UserListComponent
  ]
})
export class AdminModule { }
