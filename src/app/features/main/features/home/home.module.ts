import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './container/home/home.component';
import {HomeRoutingModule} from './home-routing.module';
import {DropdownDirectiveModule} from 'common/shared/directives/dropdown-directive.module';

@NgModule({
  imports: [
    CommonModule,
    DropdownDirectiveModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule {}
