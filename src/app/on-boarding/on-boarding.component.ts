import {
  Component,
  OnInit,
  ElementRef,
  HostListener,
  Inject,
  Input
} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as moment from 'moment';
import { from } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CssSelector } from '@angular/compiler';
@Component({
  selector: 'abm-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css']
})
export class OnBoardingComponent implements OnInit {
  userCookie: string;
  public steps: number;
  public currentStepIndex = 0;
  public currentStep: State;
  @Input() states: State[] = [
    {
      message: `Welcome to ABM, where you can create, edit, and persist collections of software projects. <br>
       To find out more about ABM, visit the <a href=/about>about</a> section.`,
      top: '20vh',
      left: '35%'
    },
    {
      message: `Collections that others have publicized are in the "Available collections" page.`,
      element: '#step1'
    },
    {
      message: `The available collections are shown in this list. You can download 
      them or reuse them to create your own collections.`,
      element: '#step5'
    },
      {
      message: `Your collections are available under the "My Collections" page. 
      From there, you can edit your collections, delete them, create new versions, or make them public.`,
      element: '#step0'
    },
       {
      message:
        `You can search for projects to create your own collections. <br><br>First, write a query using the metrics.
         For example, type "[astore_3 (opcode:78)]>0", click on the "Search" button, select a few projects,
          and click on the "Create New Collection" button.<br><br> You can also add projects to existing collections 
          with the button "Add Selected Projects to an Existing Collection"`,
      element: '#step2'
    }
  ];

  constructor(
    private el: ElementRef,
    private cookieService: CookieService,
    @Inject(DOCUMENT) private document: Document, private sanitizer: DomSanitizer, private router: Router
  ) {}

  ngOnInit() {
    this.currentStep = this.states[this.currentStepIndex];
    this.steps = this.states.length;
    this.userCookie = localStorage.getItem('currentUser') + this.router.url;
    // append the route to differentiate between use across different route

  }

  loggedInStatus() {
    return localStorage.getItem('loggedIn') === 'true';
  }

  isShowModal() {
    return this.cookieService.check(this.userCookie);
  }

  onSkip($event) {
    // disable for one week
    if (this.currentStep.element) {
      this.removeHighlight(this.currentStep.element); // remove highlight from current element
    }
    this.currentStepIndex = this.steps + 1;
    this.cookieService.set(this.userCookie, 'true', moment().add(1, 'w').toDate());
  }

  jump($index) {
    let tooltip = this.el.nativeElement.querySelector(`.tooltips`);

    if (this.currentStep.element) {
      this.removeHighlight(this.currentStep.element); // remove highlight from current element
    }

    this.currentStepIndex = $index;
    this.currentStep = this.states[this.currentStepIndex];

    if (this.currentStep.element && this.el.nativeElement.offsetParent.querySelector(this.currentStep.element)) {
      // use position of element by default else use the top left
      let position = this.getPosition(this.currentStep.element);
      this.highlight(this.currentStep.element);
      tooltip.style.top = position.y;
      tooltip.style.left = position.x;
    } else {
      tooltip.style.top = this.currentStep.top || '20vh';
      tooltip.style.left = this.currentStep.left || '35%';
    }
  }

  nextPrev($event) {

    if (this.currentStepIndex > 0 || this.currentStepIndex < this.steps) {
      switch ($event.target.innerText) {
        case 'Previous':
          this.currentStepIndex -= 1;
          this.jump(this.currentStepIndex);
          break;
        case 'Next':
          this.currentStepIndex += 1;
          this.jump(this.currentStepIndex);
          break;
        default:
          if (this.currentStep.element) {
              this.removeHighlight(this.currentStep.element); // remove highlight from current element
          }
          this.currentStepIndex = this.steps + 1;
          this.cookieService.set(this.userCookie, 'true', moment().add(5, 'y').toDate());
           // set cookies so it doesnt showup for current user again for the next 5 years;

          break;
      }
    }
  }

  sanitizeHtml(text: string) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
   }

  highlight(element) {
    this.el.nativeElement.offsetParent.querySelector(element).style.border = '4px solid red';
  }

  removeHighlight(element) {
    this.el.nativeElement.offsetParent.querySelector(element).style.border = '';
  }

  getPosition(element) {
    let container = window;
    let tooltip = this.el.nativeElement.querySelector(`.tooltips`);
    let tooltipRef = this.document.querySelector(element);
    let top = tooltipRef.offsetTop;
    let left = tooltipRef.offsetLeft + tooltipRef.offsetWidth + 11;

    if (left + tooltip.offsetWidth > container.innerWidth) { // handles case where tooltip is off right screen
        if ( tooltipRef.offsetLeft - tooltip.offsetWidth < 1) { // handles case where tooltip is off left screen
         left = tooltipRef.offsetLeft + 9;
          if ((top + tooltipRef.offsetHeight + tooltip.offsetHeight) < window.innerHeight) { 
            top = tooltipRef.offsetTop + tooltipRef.offsetHeight; }
              
        } else {
              left = tooltipRef.offsetLeft - tooltip.offsetWidth;
      }

    }



    return {
      x: left + 'px',
      y: top + 'px'
  };
  }
}

export interface State {
  message: string;
  element?: string;
  top?: string;
  left?: string;
}
