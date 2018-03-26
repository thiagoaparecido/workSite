import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';

import {Resume} from 'common/core/models/resume';
import {StorageService} from 'common/core/services/storage.service';
import {ResumeService} from 'common/core/services/resume.service';
import {ProfessionService} from 'common/core/services/profession.service';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.scss']
})
export class ResumeListComponent implements OnInit {
  form: FormGroup;
  professions: string[];
  $resumes: Resume[];
  sortProp: string;
  sortOrder: string;
  showForm = false;
  searchParams: any;

  private searchData: Subject<any> = new Subject<any>();

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
    this.resumeService.getAllResumes()
      .subscribe((resumes: Resume[]) => {

        this.$resumes = resumes;
      });
    this.searchData.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(
        (searchParams: any) => {
          return this.resumeService.getFilterResumes(
            searchParams,
            {'experienceGroup': 'experience', 'salaryGroup': 'salary'},
            {'userName': true, 'city': true});
        }
      )
    ).subscribe((resumes: Resume[]) => {
      this.$resumes = resumes;
    });
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
    this.passSearchData(this.form.value);
  }

  private passSearchData(serachParams: any) {
    this.searchData.next(serachParams);
  }
}
