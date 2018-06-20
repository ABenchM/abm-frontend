import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CollectionService {

  constructor(private http: Http) { }

  private onSuccess(res: Response) {

  } 

  private handleError() {

  }

  getCollections(username) {
     console.log('username is ' + username);
     return this.http.get('/rest/collection' + '?user=' + username);
     //.map(this.onSuccess);


  }

}
