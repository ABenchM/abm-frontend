import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CollectionService {

  constructor(private http: Http) { }

  private onSuccess(res: Response) {

  }

  private handleError() {

  }

  getCollectionById(id) {
    const data =  {'id': id};
    return this.http.get('/rest/collection', {params : data});
  }

  getCollections(username) {
     return this.http.get('/rest/collection' + '?user=' + username);
    // .map(this.onSuccess);


  }

  getPublicCollections() {
    const data = { 'privateStatus': false };
    console.log('Inside Public collection service');
    return this.http.get('/rest/collection', { params: data });
  }

  getSearchCollections(query) {
    const data = { 'privateStatus': false, 'keywords': query };
    return this.http.get('rest/collection', { params: data });
  }

  getPinnedCollections() {
   const data = {'type': 'collection', 'user': 'demo'};
   return this.http.get('/rest/pin', {params: data});
  }

}


