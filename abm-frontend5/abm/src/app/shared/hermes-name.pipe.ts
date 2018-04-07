import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hermesName'
})
export class HermesNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
