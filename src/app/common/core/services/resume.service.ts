import {Injectable} from '@angular/core';

import * as _ from 'lodash';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {of} from 'rxjs/observable/of';
import {DexieService} from 'ngx-dexie/dexie.service';

import {Resume} from 'common/core/models/resume';
import {resumes} from 'common/core/constants/resumes';
import {UserService} from 'common/core/services/user.service';
import {User} from 'common/core/models/user';

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

  getFilterResumes(params: any, group: any, regRule: any): Observable<Resume[]> {
    return this.getAllResumes()
      .pipe(
        switchMap((array): Observable<Resume[]> => {
          let result = array;
          let obj = _.clone(params);
          for (const key in group) {
            obj = this.checkGroupControl(key, group[key], obj);
          }
          const valueKeys = Object.keys(obj);
          const rangePropsArray = [];

          valueKeys.forEach((key) => {
            if ( obj[key] && typeof obj[key] === 'object') {
              const objectKeys = Object.keys(obj[key]);
              if ((obj[key][objectKeys[0]] !== 0) && !obj[key][objectKeys[0]]) {
                delete obj[key];
              } else {
                rangePropsArray.push(key);
              }
            }
            if (!obj[key]) {
              delete obj[key];
            }
          });

          if (rangePropsArray.length) {
            rangePropsArray.forEach(
              (key) => {
                result = _.filter(result, function(item) {
                  return _.inRange(
                    item[group[key]],
                    obj[key][group[key] + 1],
                    obj[key][group[key] + 2] + 1
                  );
                });
                delete obj[key];
              }
            );
          }

          result = _.filter(result, (item) => {
            let result: boolean;
            for (const key in obj) {
              if (regRule[key]) {
                const regexp = new RegExp(obj[key], 'ig');
                if (!regexp.test(item[key])) {
                  return false;
                }
              } else {
                if (item[key] != obj[key]) {
                  return false;
                }
              }
            }
            return true;
          });

          return of(result);
        })
      );
  }

  private checkGroupControl(groupControl, control, params): void {
    let group = _.clone(params);
    if (group[groupControl][control + 1] && !group[groupControl][control + 2]) {
      group[groupControl][control + 2] = group[groupControl][control + 1];
    }
    if (!group[groupControl][control + 1] && group[groupControl][control + 2]) {
      group[groupControl][control + 1] = group[groupControl][control + 2];
    }
    if (group[groupControl][control + 1] > group[groupControl][control + 2]) {
      group[groupControl] = {
        [control + 1]: group[groupControl][control + 2],
        [control + 2]: group[groupControl][control + 1]
      };
    }
    return group;
  }
}
