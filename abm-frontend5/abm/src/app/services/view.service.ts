import { Injectable, ViewContainerRef } from '@angular/core';
import {Http, ResponseContentType, Headers} from '@angular/http';
import { ToastService } from './toast.service';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';
import {saveAs} from 'file-saver/FileSaver';

@Injectable()
export class ViewService {

 vcref: ViewContainerRef;
  constructor(private http: Http, private tostr: ToastService, private router: Router) {
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
    const headers = new Headers();
   //  headers.append('Accept', 'text/html');
    this.http.get('/download/' + buildResultId, {
     // headers: headers,
     // responseType: ResponseContentType.Blob
   }).subscribe(response =>  {

      console.log(response.headers);
      const blob = new Blob([response.json()], { type: 'text/plain' });
     // saveAs(blob, 'archive.zip;');

    }
   );
   // .then(response => this.saveFile(response));

  }

  saveFile(response) {
    console.log(response.json());
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');

    console.log(contentDispositionHeader);

    // if (contentDispositionHeader !== null) {
    //   const parts: string[] = contentDispositionHeader.split(';');
    //   const filename = parts[1].split('=')[1];
    // }


    // const blob = new Blob([response._body], { type: 'text/plain' });
    // saveAs(blob, filename);
  }

 }

