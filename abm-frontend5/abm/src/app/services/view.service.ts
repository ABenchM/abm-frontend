import { Injectable, ViewContainerRef } from '@angular/core';
import {Http} from '@angular/http';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable()
export class ViewService {

 vcref: ViewContainerRef;
  constructor(private http: Http, private tostr: ToastService, private router: Router ) {
    this.tostr.vcRef = this.vcref;
  }

  checkFileStatus(id, type) {
    const data = {'id': id, 'type': type };
    return this.http.get('/rest/fe/', {params: data});
  }

  getBuildResult(id) {
    const data = {'id': id, 'privateStatus': false};
    return this.http.get('/rest/build', {params: data});
  }

  downloadBuild(buildResultId) {
   return this.http.get('/download' + buildResultId);
  }
 }

