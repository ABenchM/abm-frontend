import { Injectable } from '@angular/core';

@Injectable()
export class UtilityService {

  constructor() { }
  
  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

}
