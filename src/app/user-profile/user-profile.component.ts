import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { Register } from '../services/register.service';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'abm-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  public invalidUsername: boolean;
  constructor(private register: Register, private toastr: ToastrService, private router: Router, private dialogService: DialogService) { }
  public newPassword: string;
  public oldPassword: string;
  public confirmNewPassword: string;
  public cannotContainSpace: boolean;
  public passwordMatched = false;

  model = new User('', '', '', '', '', '', '', '', true);

  saveChanges(form: NgForm) {
    this.register.updateUser(this.model)
      .subscribe(
        data => {
          // this.invalidUsername = this.register.checkUsername;
          // if (this.invalidUsername === false) {
          this.router.navigateByUrl('/save-success');
          // }
        },
        err => console.log('error: ', err)
      );
  }


  loadUserData() {
    this.register.getUserDetails(localStorage.getItem('currentUser')).subscribe(response => this.model = response.json());
  }

  deleteUser() {
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Removal is irreversible! Continue?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.register.deleteUser(localStorage.getItem('currentUser')).subscribe(
          response => {
            if (response.status === 200) {
              this.router.navigateByUrl('/login');
            }
          }
        );
      }
    }

    );

  }

  checkPassword() {

    this.register.checkPassword('demo').subscribe(
      response => this.passwordMatched = response.json()
    );
    return this.passwordMatched;
  }

  savePassword(form) {
    console.log('New Password' + this.newPassword);
    this.model.password = this.newPassword;
    console.log('old password' + this.oldPassword);
    this.register.checkPassword(this.oldPassword).subscribe(
      response => {
        if (response.json() === true) {
          this.register.updateUser(this.model).subscribe(
            data => {
              if (data.status === 200) {
                this.router.navigateByUrl('/save-success');
              }

            }
          );
        } else {
          this.toastr.error('Old Password is incorrect');
        }
      }
    );

  }


  checkSpace(username) {
    if ((username.value as string).indexOf(' ') > 0) {
      this.cannotContainSpace = true;
    }
  }

  ngOnInit() {
    this.loadUserData();

  }

}
