import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AdminComponent} from './container/admin/admin.component';
import {AdminDetailComponent} from './components/admin-detail/admin-detail.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {ResumeListComponent} from './components/resume-list/resume-list.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', component: AdminDetailComponent },
      { path: 'user-list', component: UserListComponent },
      { path: 'resume-list', component: ResumeListComponent }
    ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
