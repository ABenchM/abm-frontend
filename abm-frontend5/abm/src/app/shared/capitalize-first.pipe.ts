import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: string, args?: string): any {
    if (value == null)  {
      return null;

  } else {
     return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
}
