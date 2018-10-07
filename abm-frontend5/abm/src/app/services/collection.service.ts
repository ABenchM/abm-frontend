import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Collection} from '../models/collection.model';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
@Injectable({ providedIn: 'root' })
export class CollectionService {

  private heroesUrl = 'rest/deletepubliccollection';

  toCreate: any[];
  toAdd: any[];
  constructor(private http: Http, private httpClient: HttpClient) { }

  private onSuccess(res: Response) {
  }

  private handleError<T> (operation = 'operation', result?: T) {
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

  updateVersion(version) {
    return this.http.put('/rest/version/', version);
  }

  deleteVersion(versionId) {
    return this.http.delete('/rest/version/' + versionId);
  }

  deleteCollection(collectionId) {
    return this.http.delete('rest/collection/' + collectionId);
  }

  deletePublicCollection (collection: Collection | string): Observable<Collection> {
    const id = typeof collection === 'string' ? collection : collection.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.httpClient.delete<Collection>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Collection>('deleteCollection'))
    );
  }

  postDeriveVersion(version) {
    return this.http.post('rest/version/derive', version);
  }

  getPublicCollections() {
    alert("byID");

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
    const data = { 'type': 'collection', 'user': 'demo' };
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


