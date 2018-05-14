import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value < 1024){
			return value + ' kB';
		} else if(value < 1048576){
			return (value / 1024).toFixed(2) + ' MB';
		} else {
			return (value / 1048576).toFixed(2) + ' GB';
		}
  }

}
