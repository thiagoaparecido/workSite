import {Component, EventEmitter, OnInit, ViewContainerRef} from '@angular/core';
import {AuthService} from 'common/core/services/auth.service';
import {StorageService} from 'common/core/services/storage.service';

import {Observable} from 'rxjs/Observable';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import {ProfessionService} from 'common/core/services/profession.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import * as _ from 'lodash';
import {Suggestion} from 'common/core/models/suggestion';
import {ActivatedRoute} from '@angular/router';
import {SuggestionService} from 'common/core/services/suggestion.service';
import {CanComponentDeactivate} from 'common/core/guards/can-deactivate.guard';

@Component({
  selector: 'app-suggestion-edit',
  templateUrl: './suggestion-edit.component.html',
  styleUrls: ['./suggestion-edit.component.scss']
})
export class SuggestionEditComponent implements OnInit, CanComponentDeactivate {

  suggestion: Suggestion;
  userId: number;
  suggestionEdit: any;
  professions: string[];
  newFlag: boolean;
  form: FormGroup;
  goToAnotherPage: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private suggestionService: SuggestionService,
    private professionService: ProfessionService,
    private formBuilder: FormBuilder,
    private modalService: ModalDialogService,
    private viewRef: ViewContainerRef,
    private location: Location,
    private auth: AuthService,
    private storage: StorageService) {}

  ngOnInit(): void {
    this.professions = this.professionService.getProfessions();
    this.newFlag = this.route.snapshot.data['new'];
    this.userId = this.storage.getUserData().userId;
    if (!this.newFlag) {
      this.suggestionService.getSuggestion(this.storage.getUserData().suggestionId)
        .subscribe(
          (suggestion) => {
            this.suggestion = suggestion;
            this.suggestionEdit = _.clone(this.suggestion);
            delete this.suggestionEdit.id;
            delete this.suggestionEdit.userId;
            this.form.setValue(this.suggestionEdit);
          }
        );
    } else {
      this.suggestionEdit = {
        profession: null,
        city: null,
        employerName: null,
        salary: null,
        description: null
      };
    }
    this.formInit();
    if (this.newFlag) {
      this.form.setValue(this.suggestionEdit);
    }
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      profession: [null, Validators.required],
      city: [null, Validators.required],
      employerName: [null, Validators.required],
      salary: [null, Validators.required],
      description: [null, [Validators.minLength(10), Validators.maxLength(4000), Validators.required]]
    });
  }

  reset(): void {
    this.form.reset(this.suggestionEdit);
  }

  submit(): void {
    this.suggestionEdit = this.form.value;
    const subscription =  this.newFlag ? this.suggestionService.addSuggestion(this.userId, this.suggestionEdit) :
      this.suggestionService.updateSuggestion(this.suggestion.id, this.suggestionEdit);
    subscription.subscribe(() => this.location.back());
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (_.isEqual(this.form.value, this.suggestionEdit)) {
      return true;
    } else {
      this.modalService.openDialog(this.viewRef, {
        title: 'Змінено дані',
        childComponent: SimpleModalComponent,
        data: {
          text: 'Ви змінили певні дані, однак для того щоб їх зберегти вам потрібно натиснути кнопку "Застосувати"'
        },
        settings: {
          closeButtonClass: 'close theme-icon-close'
        },
        actionButtons: [
          {
            text: 'Покинути',
            buttonClass: 'btn btn-success',
            onAction: () => { this.goToAnotherPage.emit(true); return true; }
          },
          {
            text: 'Залишитися',
            buttonClass: 'btn btn-info',
            onAction: () => { this.goToAnotherPage.emit(false); return true; }
          }
        ]
      });

      return this.goToAnotherPage;
    }
  }

}
