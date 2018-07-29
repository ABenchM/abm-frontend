import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class BuildService {

  constructor(private http: Http) { }

  postBuild(version) {
    return this.http.post('/rest/build', version, null);
  }

}
