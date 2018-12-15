import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CollectionService {


  toCreate: any[];
  toAdd: any[];
  constructor(private http: Http) { }

  private onSuccess(res: Response) {

  }

  private handleError() {

  }


  createCollection(collection) {
    return this.http.post('/rest/collection', collection, null);
  }

  getViewCollection(id) {
    const data = { 'privateStatus': false, 'id': id };
    return this.http.get('/rest/collection', { params: data });
  }
  getCollectionById(id) {
    const data = { 'id': id };
    return this.http.get('/rest/collection', { params: data });
  }

  getCollections(username) {
    return this.http.get('/rest/collection' + '?user=' + username);
    // .map(this.onSuccess);


  }

  updateVersion(version) {
    return this.http.put('/rest/version/', version);
  }

  deleteVersion(versionId) {
    return this.http.delete('/rest/version/' + versionId);
  }

  deleteCollection(collectionId) {
    return this.http.delete('rest/collection/' + collectionId);
  }

  postDeriveVersion(version) {

    return this.http.post('rest/version/derive', version);

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

  getPinnedCollections(currentUser) {
    const data = { 'type': 'collection', 'user': currentUser };
    return this.http.get('/rest/pin', { params: data });
  }

  updateCollection(fargCollection) {

    return this.http.put('/rest/collection', fargCollection, null);
  }

  getBuild(version) {
    return this.http.get('/rest/build/' + version.id);
  }

  deleteBuild(version) {
    return this.http.post('/rest/version/unfreeze', version);
  }

}


