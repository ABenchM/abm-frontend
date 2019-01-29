import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class CollectionService {


  toCreate: any[];
  toAdd: any[];
  constructor(private http: Http) { }

  private onSuccess(res: Response) {
    const statusCode = res.status;
    return statusCode;
  }

  private handleError(error: any) {

    console.error('post error : ', error);
    if (error.status === 403) {
      localStorage.removeItem('loggedIn');
    }
    return observableThrowError(error.statusText);

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

  getCollections(username): Observable<any> {
    const data = {'user': username };
    return this.http.get('/rest/collection', {params: data}).pipe(
       catchError(this.handleError));



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

  getPublicCollections(): Observable<any> {
    const data = { 'privateStatus': false };
    return this.http.get('/rest/collection', { params: data }).pipe(
      catchError(this.handleError));
  }

  getSearchCollections(query) {
    const data = { 'privateStatus': false, 'keywords': query };
    return this.http.get('rest/collection', { params: data });
  }

  getPinnedCollections(currentUser): Observable<any>  {
    const data = { 'type': 'collection', 'user': currentUser };
    return this.http.get('/rest/pin', { params: data }).pipe(
      catchError(this.handleError));
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





