import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataServiceService {

  buildResultExists: BehaviorSubject<boolean>;
  private running  =  new BehaviorSubject<boolean>(false);
  public repositoryList: any[] = [];
  public pinned: any[] = [];
  public buildStatus: boolean;

  cast = this.running.asObservable();
  constructor() {
    this.buildResultExists = new BehaviorSubject(false);

  }

   setRunning(newValue) {
     this.running.next(newValue);
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
