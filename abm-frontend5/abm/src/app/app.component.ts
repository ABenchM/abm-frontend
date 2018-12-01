import { Component, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Logout } from './services/logout.service';
import { MessageService } from 'primeng/primeng';


@Component({
  selector: 'abm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  viewMode;

  pageTitle = 'Automated Benchmark Management';

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  isWarningShown = false;

  constructor(private router: Router, private idle: Idle, private keepalive: Keepalive,
    private logoutService: Logout, private messageService: MessageService) {

    // sets an idle timeout of 4 hours.
    idle.setIdle(14280);
    // sets a timeout period of 2 minutes. After 10 seconds of inactivity, the user will be considered as timed out.
    idle.setTimeout(120);
    // sets the default interrupts - things like clicks and scrolls.
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      try {
        this.messageService.clear();
      } catch (err) {
        console.log('toast error');
      }
      this.reset();
    });
    idle.onTimeout.subscribe(() => {
      this.router.navigateByUrl('/login');
      localStorage.removeItem('loggedIn');
      localStorage.removeItem('currentUser');
      this.logoutService.logout().subscribe();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.reset();

    });
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';

      if (!this.loggedInStatus()) {
        this.reset();
      } else {
        this.showLogoutWarning();
      }
    });

    this.reset();

  }

  reset() {
    this.idle.watch();
    this.idleState = 'No Longer Idle.';
    this.timedOut = false;
    this.isWarningShown = false;
  }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';

  }

  showLogoutWarning() {
    if (!this.isWarningShown) {
      this.messageService.add({ key: 'logout', severity: 'warn' });
      this.isWarningShown = true;
    }
  }


  sendMeHome() {
    this.router.navigate(['']);
  }
}
