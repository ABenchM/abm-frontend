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

  ngOnInit() {
  }

  resetPassword(form: NgForm) {
    this.resetPasswordService.resetPassword(this.model)
      .subscribe(
        data => {
          this.router.navigateByUrl('/confirm-password');
        },
        err => console.log('error: ', err)
      );

  }
}
