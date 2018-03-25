import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderByProp'
})
export class OrderByPropPipe implements PipeTransform {

  transform(value: any, prop?: any, order?: any): any {
    if (!prop || !order) {
      return value;
    }
    return _.orderBy(value, [prop], [order]);
  }

}
