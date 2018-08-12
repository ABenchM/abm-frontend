import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildColour'
})
export class BuildColourPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 'RUNNING') {
      return 'blue';
    } else if (value === 'FINISHED') {
      return 'rgb(140, 255, 102)';
    } else if (value === 'CANCELLED') {
      return 'yellow';
    } else if (value === 'FAILED') {
      return 'red';
    } else { return 'gray'; }
  }

}
