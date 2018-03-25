import { NgModule } from '@angular/core';
import { GenderPipe } from './gender.pipe';

@NgModule({
  imports: [],
  declarations: [GenderPipe],
  exports: [GenderPipe]
})
export class GenderPipeModule { }
