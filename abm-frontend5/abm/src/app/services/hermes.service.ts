import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class HermesService {

  constructor(private http: Http) { }

  getActiveFilters(version) {
    return this.http.get('/rest/activeFilters/' + version.id );
  }

  runHermes(id, filterList) {
     return this.http.post('/rest/hermes/' + id, filterList );

  }

  getHermesStatus(versionId) {
  return this.http.get('/rest/instance/' + versionId);
  }

  deleteHermes(id) {
    return this.http.delete('/rest/instance/' + id);
  }
}

