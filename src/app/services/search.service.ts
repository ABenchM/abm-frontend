import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';




import { AppErrorHandler } from '../app-error-handler';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class SearchService {

  project: any[] = [];
  constructor(private http: Http) { }

  getSearchResults(query, language) {
    return this.http.get('/rest/search/' + query + '?language=' + language);

  }

  getFilters() {
    return this.http.get('/rest/delphifeatures');
  }

  getFiltersSearch(query: string) {
    let body = JSON.stringify({query});
    return this.http.post('/rest/searchquery', body);
  }
}
