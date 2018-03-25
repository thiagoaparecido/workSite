import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserDetailComponent } from './user-detail/user-detail.component';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { SuggestionListComponent } from './suggestion-list/suggestion-list.component';
import { ResumeItemComponent } from './resume-item/resume-item.component';
import {GenderPipeModule} from '../../pipes/gender-pipe/gender-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    GenderPipeModule,
    RouterModule
  ],
  declarations: [
    ResumeListComponent,
    ResumeItemComponent,
    SuggestionListComponent,
    UserDetailComponent
  ],
  exports: [
    UserDetailComponent
  ]
})
export class UserDetailModule { }
