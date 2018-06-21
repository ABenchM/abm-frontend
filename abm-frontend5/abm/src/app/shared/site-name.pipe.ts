import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siteName'
})
export class SiteNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (value.includes('github.com')) {
      return 'GitHub';

    } else if (value.includes('bitbucket.org')) {
      return 'BitBucket';
    } else if (value.includes('maven.com')) {
      return 'Maven';
    } else {
      return 'Unknown';
    }
  }

}
