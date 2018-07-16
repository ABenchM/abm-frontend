import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'projectCount'
})
export class ProjectCountPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if ( value === 1) {
      return value.toString().concat(' ').concat('Project');
    } else {
      return value.toString().concat(' ').concat('Projects');
    }
  }

}
