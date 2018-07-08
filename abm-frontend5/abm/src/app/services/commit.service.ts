import { Injectable } from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class CommitService {

  constructor(private http: Http) { }


  deleteRepos (commitId) {
    const data = {
      action: 'delete_multi',
      ids: commitId
    };
    return this.http.delete('/rest/commit/' + commitId);
  }

}
