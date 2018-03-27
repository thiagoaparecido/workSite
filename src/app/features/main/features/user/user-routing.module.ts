import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserComponent} from './container/user/user.component';
import {UserDataComponent} from './components/user-data/user-data.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
import {ResumeDetailComponent} from './components/resume-detail/resume-detail.component';
import {ResumeEditComponent} from './components/resume-edit/resume-edit.component';
import {UserResolver} from './resolvers/user-resolver.service';
import {CanDeactivateGuard} from 'common/core/guards/can-deactivate.guard';
import {SuggestionEditComponent} from './components/suggestion-edit/suggestion-edit.component';
import {SuggestionDetailComponent} from './components/suggestion-detail/suggestion-detail.component';

const routes: Routes = [
  { path: '', component: UserComponent, children: [
      { path: '', component: UserDataComponent, resolve: { user: UserResolver } },
      { path: 'edit', component: UserEditComponent, resolve: { user: UserResolver }, canDeactivate: [CanDeactivateGuard] },
      { path: 'resume', component: ResumeDetailComponent },
      { path: 'resume/new', component: ResumeEditComponent, data: { new: true } },
      { path: 'resume/edit', component: ResumeEditComponent, data: { new: false }, canDeactivate: [CanDeactivateGuard] },
      { path: 'suggestion', component: SuggestionDetailComponent },
      { path: 'suggestion/new', component: SuggestionEditComponent, data: { new: true } },
      { path: 'suggestion/edit', component: SuggestionEditComponent, data: { new: false }, canDeactivate: [CanDeactivateGuard] }
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
