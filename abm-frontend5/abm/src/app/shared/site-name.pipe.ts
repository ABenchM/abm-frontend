import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siteName'
})
export class SiteNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
