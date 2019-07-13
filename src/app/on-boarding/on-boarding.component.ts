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
      message: `Welcome to ABM, a web application for creating corporas to analyze and test software tools. <br> <br>
      To find out more about ABM visit the <a href=/about>about</a> section`,
      top: '20vh',
      left: '35%'
    },
    {
      message: `Available collections are a list of public collections. You can search for public collection
      and also use them to create your own collection.`,
      element: '#step1'
    },
    {
      message: `A list of public collections that can be downloaded from Zenodo are show here`,
      element: '#step5'
    },
      {
      message: `Go to 'My Collections' to find a list of all the collections you have created. You can edit, create a new version, pin and
      create another collection from one of your existing collections.`,
      element: '#step0'
    },
       {
      message:
        `To Create collections, first you have to create a filter, then you select projects you wish to be a
         part of your collection after which you can decide to add to an existing collection or create an entirely new collection`,
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
    let container = this.document.body;
    let tooltip = this.el.nativeElement.querySelector(`.tooltips`);
    let tooltipRef = this.document.querySelector(element);
    let top = tooltipRef.offsetTop;
    let left = tooltipRef.offsetLeft + tooltipRef.offsetWidth + 11;

    if (left + tooltip.offsetWidth > container.offsetWidth) { // handles case where tooltip is off right screen
      if ( tooltipRef.offsetLeft - tooltip.offsetWidth < 1) { // handles case where tooltip is off left screen
        top = tooltipRef.offsetTop + tooltipRef.offsetHeight ;
        left = tooltipRef.offsetLeft;
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
