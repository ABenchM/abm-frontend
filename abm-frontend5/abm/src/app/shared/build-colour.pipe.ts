import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buildColour'
})
export class BuildColourPipe implements PipeTransform {

  transform(value: any, args?: any): any {
     if (value == 'RUNNING') { return 'rgb(102, 217, 255)';}
     else if(value  == 'FINISHED'){return 'rgb(140, 255, 102)';}
		else if(value == 'CANCELLED'){return 'rgb(255, 232, 102)';}
		else if(value == 'FAILED'){return 'rgb(255, 51, 51)'}
		else{return 'gray';}
  }

}
