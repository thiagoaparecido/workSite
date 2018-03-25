import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './container/user/user.component';
import {UserDataComponent} from './components/user-data/user-data.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {ResumeDetailComponent} from './components/resume-detail/resume-detail.component';
import {ResumeEditComponent} from './components/resume-edit/resume-edit.component';
import {UserResolver} from './resolvers/user-resolver.service';
import {CanDeactivateService} from 'common/core/guards/can-deactivate.service';

const routes: Routes = [
  { path: '', component: UserComponent, children: [
      { path: '', component: UserDataComponent, resolve: { user: UserResolver } },
      { path: 'edit', component: UserEditComponent, resolve: { user: UserResolver }, canDeactivate: [CanDeactivateService] },
      { path: 'resume', component: ResumeDetailComponent },
      { path: 'resume/new', component: ResumeEditComponent, data: { new: true } },
      { path: 'resume/edit', component: ResumeEditComponent, data: { new: false }, canDeactivate: [CanDeactivateService] }
    ] }
  ];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [UserResolver]
})
export class UserRoutingModule {}
