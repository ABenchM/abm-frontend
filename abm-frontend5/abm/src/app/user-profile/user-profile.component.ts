import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { Register } from '../services/register.service';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';

import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';

@Component({
  selector: 'abm-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  public invalidUsername: boolean;
  constructor(private register: Register, private router: Router, private dialogService: DialogService) { }
  public newPassword: string;
  public confirmNewPassword: string;

  model = new User('', '', '', '', '', '', '', true);

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

  // Method to load the current user details 
  loadUserData() {
    this.register.getUserDetails(localStorage.getItem('currentUser')).subscribe(response => this.model = response.json());
  }

  deleteUser() {
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Removal is irreversible! Continue?'
    }).subscribe( (isConfirmed) => {
       if(isConfirmed) {
        this.register.deleteUser(localStorage.getItem('currentUser')).subscribe(
          response => {
            if (response.status === 200) {
              this.router.navigateByUrl('/login');
            }
          }
        )
       }
    }
      
    );
   
  }

  savePassword() {
    this.model.password = this.newPassword;
    this.register.updateUser(this.model).subscribe(
      response => {
        if(response.status === 200) {
          this.router.navigateByUrl('/save-success');
        }
        
      }
    )
  }

  ngOnInit() {
    this.loadUserData();
  }

}
