import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'privateStatus'
})
export class PrivateStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return 'Private';

    } else {
      return 'Public';
    }
  }

}
