import {Injectable} from '@angular/core';
import {DexieService} from 'ngx-dexie/dexie.service';
import {UserService} from 'common/core/services/user.service';
import {User} from 'common/core/models/user';
import {switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {Observable} from 'rxjs/Observable';
import {Resume} from 'common/core/models/resume';
import {Suggestion} from 'common/core/models/suggestion';
import {of} from 'rxjs/observable/of';
import * as _ from 'lodash';

@Injectable()
export class SuggestionService {

  constructor(
    private userService: UserService,
    private dexieService: DexieService
  ) {}

  addSuggestion(userId: number, suggestion: any): Observable<any> {
    suggestion.userId = userId;
    return fromPromise(this.dexieService.addOne('suggestions', suggestion));
  }

  deleteSuggestion(suggestionId: number): Observable<any> {
    return fromPromise(this.dexieService.deleteOne('suggestions', suggestionId));
  }

  getSuggestions(suggestionId: number): Observable<Suggestion[]> {
    return fromPromise(this.dexieService.filter('suggestions', (resume) => resume.userId === suggestionId).toArray());
  }

  getAllSuggestions(): Observable<Suggestion[]> {
    return fromPromise(this.dexieService.toArray('suggestions'));
  }

  getSuggestion(suggestionId: number): Observable<Suggestion> {
    return fromPromise(this.dexieService.getByPrimaryKey('suggestions', suggestionId));
  }

  updateSuggestion(suggestionId: number, suggestion: any): Observable<any> {
    return fromPromise(this.dexieService.update('suggestions', suggestionId, suggestion));
  }

  getFilterSuggestions(params: any, group: any, regRule: any): Observable<Suggestion[]> {
    return this.getAllSuggestions()
      .pipe(
        switchMap((array): Observable<Suggestion[]> => {
          let result = array;
          let obj = _.clone(params);
          if (group) {
            for (const key in group) {
              obj = this.checkGroupControl(key, group[key], obj);
            }
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
