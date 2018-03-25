import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainComponent} from './container/main/main.component';
import {AuthUserGuard} from './guards/auth-user-guard.service';
import {AdminGuard} from './guards/admin-guard.service';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
      { path: '', loadChildren: './features/home/home.module#HomeModule' },
      { path: 'user', loadChildren: './features/user/user.module#UserModule', canActivate: [AuthUserGuard] },
      { path: 'admin', loadChildren: './features/admin/admin.module#AdminModule', canActivate: [AdminGuard] }
    ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuard,
    AuthUserGuard
  ]
})
export class MainRoutingModule {}
