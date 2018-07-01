import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HermesService {

  constructor(private http: Http) { }

  getActiveFilters(version) {
    return this.http.get('/rest/activeFilters/' + version.id );
  }
}
