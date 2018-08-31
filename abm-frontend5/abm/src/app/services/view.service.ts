import { Injectable, ViewContainerRef } from '@angular/core';
import { Http, ResponseContentType, Headers } from '@angular/http';


import { Router } from '@angular/router';


@Injectable()
export class ViewService {

  vcref: ViewContainerRef;
  constructor(private http: Http, private router: Router) {

  }

  checkFileStatus(id, type) {
    const data = { 'id': id, 'type': type };
    return this.http.get('/rest/fe/', { params: data });

  }
  getBuildResult(id) {
    const data = { 'id': id, 'privateStatus': false };
    return this.http.get('/rest/build', { params: data });
  }

  getHermesResult(id) {

    const data = { 'id': id, 'privateStatus': false };
    return this.http.get('/rest/instance/', { params: data });

  }



}
