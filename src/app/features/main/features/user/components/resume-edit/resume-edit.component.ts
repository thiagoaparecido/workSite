import {Component, EventEmitter, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {ModalDialogService, SimpleModalComponent} from 'ngx-modal-dialog';
import * as _ from 'lodash';

import {Resume} from 'common/shared/models/resume';
import {StorageService} from 'common/core/services/storage.service';
import {AuthService} from 'common/core/services/auth.service';
import {CanComponentDeactivate} from 'common/core/guards/can-deactivate.service';
import {ResumeService} from 'common/core/services/resume.service';
import {ProfessionService} from 'common/core/services/profession.service';

@Component({
  selector: 'app-resume-edit',
  templateUrl: './resume-edit.component.html',
  styleUrls: ['./resume-edit.component.scss']
})
export class ResumeEditComponent implements OnInit, CanComponentDeactivate {

  resume: Resume;
  userId: number;
  resumeEdit: any;
  professions: string[];
  newFlag: boolean;
  form: FormGroup;
  goToAnotherPage: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
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
      this.resumeService.getResume(this.userId, this.storage.getUserData().resumeId)
        .subscribe(
          (resume) => {
            this.resume = resume;
            this.resumeEdit = _.clone(this.resume);
            delete this.resumeEdit.id;
            delete this.resumeEdit.userId;
            delete this.resumeEdit.userName;
            delete this.resumeEdit.gender;
            this.form.setValue(this.resumeEdit);
          }
        );
    } else {
      this.resumeEdit = {
        profession: null,
        city: null,
        experience: null,
        salary: null,
        description: null
      };
    }
    this.formInit();
    if (this.newFlag) {
      this.form.setValue(this.resumeEdit);
    }
  }

  formInit(): void {
    this.form = this.formBuilder.group({
      profession: [null, Validators.required],
      city: [null, Validators.required],
      experience: [null, Validators.required],
      salary: [null, Validators.required],
      description: [null, [Validators.minLength(10), Validators.maxLength(4000), Validators.required]]
    });
  }

  reset(): void {
    this.form.reset(this.resumeEdit);
  }

  submit(): void {
    this.resumeEdit = this.form.value;
    const subscriptio$ =  this.newFlag ? this.resumeService.addResume(this.userId, this.resumeEdit) :
      this.resumeService.updateResume(this.userId, this.resume.id, this.resumeEdit);
    subscriptio$.subscribe(() => this.location.back());
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (_.isEqual(this.form.value, this.resumeEdit)) {
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
