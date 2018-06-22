import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CollectionService {

  constructor(private http: Http) { }

  private onSuccess(res: Response) {

  }

  private handleError() {

  }

  getViewCollection(id) {
  const data = {'privateStatus': false, 'id': id};
  return this.http.get('/rest/collection', {params: data});
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
    return this.http.get('/rest/collection', { params: data });
    // .subscribe(
    // response => { console.log(response.json());

    // });
  }

  getSearchCollections(query) {
    const data = { 'privateStatus': false, 'keywords': query };
    return this.http.get('rest/collection', { params: data });
  }

  getPinnedCollections() {
   const data = {'type': 'collection', 'user': 'demo'};
   return this.http.get('/rest/pin', {params: data});
  }

  updateCollection(fargCollection) {

    return this.http.put('/rest/collection', fargCollection, null);
  }

}


