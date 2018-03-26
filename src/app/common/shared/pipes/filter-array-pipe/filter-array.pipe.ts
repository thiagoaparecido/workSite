import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';

@Pipe({
  name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {

  transform(array: any, params: any, group: any, regRule: any): any {
    let result = array;
    let obj = _.clone(params);
    for (const key in group) {
      obj = this.checkGroupControl(key, group[key], obj);
    }
    //obj = this.checkGroupControl('experienceGroup', 'experience', obj);
    //obj = this.checkGroupControl('salaryGroup', 'salary', obj);
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

    return result;
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
