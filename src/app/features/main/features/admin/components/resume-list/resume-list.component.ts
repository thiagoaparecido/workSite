import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

import * as _ from 'lodash';

import {Resume} from 'common/shared/models/resume';
import {StorageService} from 'common/core/services/storage.service';
import {ResumeService} from 'common/core/services/resume.service';
import {ProfessionService} from 'common/core/services/profession.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent implements OnInit {
  form: FormGroup;
  professions: string[];
  $resumes: Observable<Resume[]>;
  sortProp: string;
  sortOrder: string;
  showForm = false;
  searchParams: any;

  constructor(
    private resumeService: ResumeService,
    private professionService: ProfessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.professions = this.professionService.getProfessions();
    this.initForm();
    this.searchParams = this.form.value;
    this.$resumes = this.resumeService.getAllResumes();
  }

  changeShowForm(): void {
    this.showForm = !this.showForm;
  }

  changeSort(prop): void {
    if (prop === this.sortProp) {
      this.sortOrder = (this.sortOrder === 'asc') ? 'desc' : 'asc';
    } else {
      this.sortProp = prop;
      this.sortOrder = 'asc';
    }
  }

  goToDetail(resume): void {
    this.storage.setUserData({userId: resume.userId, resumeId: resume.id});
    this.router.navigate(['../', 'user', 'resume']);
  }

  initForm(): void {
    this.form = this.formBuilder.group(
      {
        userName: [null],
        profession: [null],
        city: [null],
        gender: [null],
        experienceGroup: this.formBuilder.group({
          experience1: [null],
          experience2: [null]
        }),
        salaryGroup: this.formBuilder.group({
          salary1: [null],
          salary2: [null]
        })
      }
    );
    this.form.valueChanges
      .subscribe(
        () => {
          this.submit();
        }
      );
  }

  submit(): void {
    /*this.checkGroupControl('experienceGroup', 'experience');
    this.checkGroupControl('salaryGroup', 'salary');*/
    if (this.form.get('gender').value === 'null') {
      this.form.patchValue({
        gender: null
      });
    }
    if (this.form.get('profession').value === 'null') {
      this.form.patchValue({
        profession: null
      });
    }
    this.searchParams = this.form.value;
  }
}
