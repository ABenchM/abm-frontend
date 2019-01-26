import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ResetPasswordService } from '../services/reset-password.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'abm-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private resetPasswordService: ResetPasswordService) { }
  model = {};
  username = '';
  token = '';
  ngOnInit() {
    this.username = this.route.snapshot.queryParamMap.get('name');
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log(this.username, this.token);
  }

  resetPassword(form: NgForm) {
    this.model['username'] = this.username;
    this.model['token'] = this.token;
    console.log(this.model);
    this.resetPasswordService.approvePassword(this.model)
      .subscribe(
        data => {
          this.router.navigateByUrl('/reset-password-success');
        },
        err => console.log('error: ', err)
      );

  }

}
