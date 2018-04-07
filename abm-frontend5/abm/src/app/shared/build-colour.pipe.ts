import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildColour'
})
export class BuildColourPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
