import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'builtStatus'
})
export class BuiltStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return 'Built';

    } else {
      return 'Not Built';
    }
  }

}
