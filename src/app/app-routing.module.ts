import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from 'common/core/guards/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './features/main/main.module#MainModule' },
  { path: 'auth', loadChildren: './features/auth/auth.module#AuthModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
