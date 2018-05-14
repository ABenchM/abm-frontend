import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siteName'
})
export class SiteNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value.includes("github.com")){return 'Github';}
		else if(value.includes("bitbucket.com")){return 'Bitbucket';}
		else if(value.includes("maven.com")){return 'Maven';}
		else{return 'Unknown';}
  }

}
