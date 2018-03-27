import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {ModalDialogModule} from 'ngx-modal-dialog';

import {AppRoutingModule} from '../../app-routing.module';
import {AuthService} from './services/auth.service';
import {StorageService} from './services/storage.service';
import {CanDeactivateGuard} from './guards/can-deactivate.guard';
import {AuthGuard} from './guards/auth.guard';
import {UserService} from 'common/core/services/user.service';
import {ResumeService} from 'common/core/services/resume.service';
import {ProfessionService} from 'common/core/services/profession.service';
import {DatabaseModule} from 'common/core/modules/database/database.module';
import {SuggestionService} from 'common/core/services/suggestion.service';

@NgModule({
  imports: [
    AppRoutingModule,
    ModalDialogModule.forRoot(),
    ReactiveFormsModule,
    DatabaseModule
  ],
  declarations: [],
  exports: [
    AppRoutingModule,
    ModalDialogModule,
    ReactiveFormsModule,
    DatabaseModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CanDeactivateGuard,
    StorageService,
    UserService,
    ResumeService,
    SuggestionService,
    ProfessionService
  ]
})
export class CoreModule {}
