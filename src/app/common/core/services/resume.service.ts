import {Injectable} from '@angular/core';

import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {DexieService} from 'ngx-dexie/dexie.service';
import {fromPromise} from 'rxjs/observable/fromPromise';

import {Resume} from 'common/shared/models/resume';
import {resumes} from 'common/shared/constants/resumes';
import {UserService} from 'common/core/services/user.service';
import {User} from 'common/shared/models/user';

@Injectable()
export class ResumeService {

  constructor(
    private userService: UserService,
    private dexieService: DexieService
  ) {}

  resumes: Resume[] = resumes;

  addResume(userId: number, resume: any): Observable<any> {
    return this.userService.getUser(userId)
      .pipe(
        switchMap((user: User): Observable<any> => {
          resume.userId = userId;
          resume.userName = `${user.firstName} ${user.surName}`;
          resume.gender = user.gender;
          return fromPromise(this.dexieService.addOne('resumes', resume));
        })
      );
  }

  deleteResume(userId: number, resumeId: number): Observable<any> {
    return fromPromise(this.dexieService.deleteOne('resumes', resumeId));
  }

  getAllResumes(): Observable<Resume[]> {
    return fromPromise(this.dexieService.toArray('resumes'));
}

  getResumes(userId: number): Observable<Resume[]> {
    return fromPromise(this.dexieService.filter('resumes', (resume) => resume.userId === userId).toArray());
  }

  getResume(userId: number, resumeId: number): Observable<Resume> {
    return fromPromise(this.dexieService.getByPrimaryKey('resumes', resumeId));
  }

  updateResume(userId: number, resumeId: number, resume: any): Observable<any> {
    return fromPromise(this.dexieService.update('resumes', resumeId, resume));
  }
}
