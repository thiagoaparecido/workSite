import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainComponent} from './container/main/main.component';
import {MainRoutingModule} from './main-routing.module';
import {HeaderComponentModule} from 'common/shared/components/header/header-component.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderComponentModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
  ]
})
export class MainModule {}
