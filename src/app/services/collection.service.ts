import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Collection } from '../models/collection.model';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
@Injectable({ providedIn: 'root' })
export class CollectionService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  toCreate: any[];
  toAdd: any[];
  parentVersionId: any;
  toAddVersion: any;
  index: any;
  constructor(private http: Http, private httpClient: HttpClient) { }

  private onSuccess(res: Response) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
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

 getVersionsByCollection(collectionId) {

  return this.http.get('/rest/collectionversions/' + collectionId);

 }

  updateVersion(version) {
    console.log('Version DOI '  + version.doi);
    return this.http.put('/rest/version/', version);
  }

  deleteVersion(versionId) {
    return this.http.delete('/rest/version/' + versionId);
  }

  deleteCollection(collectionId) {
    return this.http.delete('rest/collection/' + collectionId);
  }

  deleteSingleCol(collection: Collection | string): Observable<Collection> {
    const id = typeof collection === 'string' ? collection : collection.id;
    const body = { 'deleteCollections': id };

    return this.httpClient.post<Collection>('/rest/publiccollection', body, httpOptions).pipe(
      tap(_ => this.log(`delete single Collection`)),
      catchError(this.handleError<Collection>('deleteCollection'))
    );
  }

  deleteCollectionByAdmin(colIDs: String) {
    const body = { 'deleteCollections': colIDs };
    return this.http.delete('/rest/publiccollection/' + colIDs);
  }

  changeCollectionStatus(collection: Collection | string): Observable<Collection> {
    const id = typeof collection === 'string' ? collection : collection.id;
    const body = { 'collectionid': id };

    return this.httpClient.put<Collection>('/rest/collectionstatus', body, httpOptions).pipe(
      tap(_ => this.log(`Change collection status id=${id}`)),
      catchError(this.handleError<Collection>('changeCollectionStatus'))
    );
  }

  postDeriveVersion(version) {
    return this.http.post('/rest/version/', version);
  }

  getVersionParentDetails(versionId) {
    // const data = { 'id': versionId };
    return this.http.get('/rest/versionDetails/' + versionId);

  }

  getPublicCollections(): Observable<any> {
    const data = { 'privateStatus': false };
    return this.http.get('/rest/collection', { params: data }).pipe(
      catchError(this.handleError<any>('getPublicCollections')));
  }

  getAllCollections() {
    const data = { 'isAdmin': true };
    return this.http.get('/rest/collection', { params: data });
  }

  getSearchCollections(query) {
    const data = { 'privateStatus': false, 'keywords': query };
    return this.http.get('rest/collection', { params: data });
  }

  getPinnedCollections(currentUser): Observable<any> {
    const data = { 'type': 'collection', 'user': currentUser };
    return this.http.get('/rest/pin', { params: data }).pipe(
      catchError(this.handleError<any>('getPinnedCollections')));
  }

  updateCollection(fargCollection) {
    return this.http.put('/rest/collection', fargCollection, null);
  }


  postPublishCollection(version) {
    return this.http.post('/rest/publishCollection/', version);
  }


  deleteProject (projectId) {
     return this.http.delete('/rest/removeproject/' + projectId);
  }

}
