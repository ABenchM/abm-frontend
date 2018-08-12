import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tabTitle'
})
export class TabTitlePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.name;

  }

}
