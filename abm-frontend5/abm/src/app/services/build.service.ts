import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class BuildService {

  constructor(private http: Http) { }
  builds = [];
  initialSelection;
  postBuild(version) {
    return this.http.post('/rest/build', version, null);
  }


  deleteBuild(buildResultId) {
    return this.http.delete('/rest/build/' + buildResultId);
  }

  getBuild(versionId) {
    return this.http.get('/rest/build/' + versionId);
  }


}
