import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';

import {MatPaginator, MatTableDataSource, MatSort,MatFormFieldModule, MatCheckboxModule} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { SelectionModel} from '@angular/cdk/collections';
import { DeleteDialogboxComponent } from '../delete-dialogbox/delete-dialogbox.component';
import { UserService } from '../services/user.service';
import { User} from '../models/user.model'

@Component({
  selector: 'abm-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['../manage-public-collections/adminUIS.css']
})
export class ManageUsersComponent implements OnInit {
  public usersList: any[] = [];
  loading: boolean;
  confirm:boolean=false;
  displayedColumns: string[] = ['select','username', 'firstname', 'email', 'affiliation' ,'Account_status','Lockaction'];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);

  constructor(private service:UserService ,private orderPipe: OrderPipe, public dialog: MatDialog) {

  }

  loadUsers() {
    this.loading = true;
    this.service.getAllUsers(1).subscribe(response => {
      this.usersList = this.orderPipe.transform(response.json());
      this.dataSource.data = this.usersList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<User>(true, []);
    });
    this.loading = false;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  openDialog(user: string) : void{
    const dialogRef = this.dialog.open(DeleteDialogboxComponent, {
      width: '300px',
      data: {name:user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.confirm = dialogRef.componentInstance.callback();       
        if(this.confirm){
        this.deleteUser(user);
      } 
    });      
  }

   ngOnInit() {
    this.loadUsers();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }


  deleteUser(user: string ){
    this.service.deleteUsers(user).subscribe(result => {
      this.loadUsers();
    });
  }

  lockUser(user: User ){
    this.service.lockunlockUser(user,true).subscribe(result => {
      this.loadUsers();
    });
  }

  unlockUser(user: User ){
    this.service.lockunlockUser(user,false).subscribe(result => {
      this.loadUsers();
    });
  }

  updateRoletoAdmin(user: User ){
    this.service.updateUserRole(user,"UserAdmin").subscribe(result => {
      this.loadUsers();
    });
  }

  updateRoletoUser(user: User ){
    this.service.updateUserRole(user,"RegisteredUser").subscribe(result => {
      this.loadUsers();
    });
  }

  deleteSelectedUsers() {
    let userlist: string = "";
    this.selection.selected.forEach(item => {
      userlist= userlist.concat(item.username,",");      
    });
    this.openDialog(userlist);
  }

}