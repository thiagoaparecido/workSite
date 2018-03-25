import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {
  array = ['чоловік', 'жінка'];

  transform(value: any): string {
    if (value === 'male') {
      return this.array[0];
    } else if (value === 'female') {
      return this.array[1];
    }
    return value;
  }

}
