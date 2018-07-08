import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hermesName'
})
export class HermesNamePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.replace('org.opalj.hermes.queries.', '');
  }

}
