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

  getBranches(repo) {
    const data = {
     'repository': repo
    };
  return this.http.post('/rest/branches', data);
  }

  getTags(repo) {
     const data = {
       'repository': repo
     };
     return this.http.post('/rest/tags', data);
  }

  changeCommit(commit) {
    return this.http.put('/rest/commit', commit);

  }
  getCommits(repo, page) {
  const data = {
    'repository': repo,
    'page': page
  };
  return this.http.post('/rest/commits', data);
  }

}
