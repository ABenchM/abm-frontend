import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'abm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewMode;

  pageTitle = 'Automated Benchmark Management';

  constructor(private router: Router, viewContainerRef: ViewContainerRef, service: ToastService) {

    service.vcRef = viewContainerRef;


  }
  // Use local storage

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';

  }


  sendMeHome() {
    this.router.navigate(['']);
  }
}
