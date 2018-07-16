import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { AppErrorHandler } from '../app-error-handler';

@Injectable()
export class SearchService {

  project: any[] = [];
  constructor(private http: Http) { }

  getSearchResults(query, language) {
      return this.http.get('/rest/search/' + query + '?language=' + language );

  }

}
