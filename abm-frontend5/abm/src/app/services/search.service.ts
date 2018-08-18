import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';




import { AppErrorHandler } from '../app-error-handler';

@Injectable()
export class SearchService {

  project: any[] = [];
  constructor(private http: Http) { }

  getSearchResults(query, language) {
      return this.http.get('/rest/search/' + query + '?language=' + language );

  }

}
