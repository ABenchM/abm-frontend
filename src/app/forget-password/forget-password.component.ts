import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'abm-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private router: Router, private resetPasswordService: ResetPasswordService) { }

  model: any = {};
  public cannotContainSpace: boolean;
  ngOnInit() {
  }

  // Removed the ngform parameter from here and html file it was irrelevant.
  resetPassword() {
    this.resetPasswordService.resetPassword(this.model)
      .subscribe(
        data => {
          this.router.navigateByUrl('/confirm-password');
        },
        err => console.log('error: ', err)
      );

  }

  checkSpace(username) {
    if (username.indexOf(' ') > 0) {
      this.cannotContainSpace = true;
    } else {
      this.cannotContainSpace = false;
    }
  }
}
