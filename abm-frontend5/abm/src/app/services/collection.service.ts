import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CollectionService {

  constructor(private http: Http) { }

  private onSuccess(res: Response) {

  }

  private handleError() {

  }

  getCollections(username) {
     return this.http.get('/rest/collection' + '?user=' + username);
    // .map(this.onSuccess);


  }

  getPublicCollections() {
    const data = { 'privateStatus': false };
    return this.http.get('/rest/collection', { params: data });
  }

  getSearchCollections(query) {
    const data = { 'privateStatus': false, 'keywords': query };
    return this.http.get('rest/collection', { params: data });
  }

  getPinnedCollections() {
    console.log('calling pin service');
    const data = {'type': 'collection', 'user': 'demo'};
   return this.http.get('/rest/pin', {params: data});
  }

}


