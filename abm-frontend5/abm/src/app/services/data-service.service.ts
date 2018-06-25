import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataServiceService {

  buildResultExists: BehaviorSubject<boolean>;
  public repositoryList: any[] = [];
  public pinned: any[] = [];
  public buildStatus: boolean;
  constructor() {
    this.buildResultExists = new BehaviorSubject(false);
  }

  setBuildResultStatus(value: boolean) {
    this.buildStatus = value;
    this.buildResultExists.observers.forEach( o => {
    o.next(this.buildStatus);
   });
  }

  resultObservable(type): Observable<boolean> {

    if ( type === 'build') {
      console.log(this.buildResultExists.asObservable().subscribe(s => console.log('s ' + s)));
      return this.buildResultExists.asObservable();
    } else if (type === 'hermes') {
       return null;
    }

  }

}
