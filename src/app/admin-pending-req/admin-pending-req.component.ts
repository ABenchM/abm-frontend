import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import {MatPaginator, MatTableDataSource } from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { UserService } from '../services/user.service';
import { User} from '../models/user.model';

@Component({
  selector: 'abm-admin-pending-req',
  templateUrl: './admin-pending-req.component.html',
  styleUrls: ['./admin-pending-req.component.css']
})
export class AdminPendingReqComponent implements OnInit {
  public usersList: any[] = [];
  loading: boolean;
  dialogResult = '';
  displayedColumns: string[] = ['select', 'firstname', 'lastname', 'username', 'email', 'affiliation', 'Approve', 'Reject'];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(true, []);

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

constructor(private service: UserService , private orderPipe: OrderPipe, public dialog: MatDialog) {

  }

  /*openDialog() {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogResult = result;
    });
  }*/

  loadUsers() {
    this.loading = true;
    this.service.getAllUsers(0).subscribe(response => {
      this.usersList = this.orderPipe.transform(response.json());
      this.dataSource.data = this.usersList;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<User>(true, []);
    });
    this.loading = false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  ngOnInit() {
    this.loadUsers();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  approveUser(user: string) {
    /*this.openDialog();*/
    this.service.approveRejectUser(user, true).subscribe(result => {
      this.loadUsers();
    });

  }

  rejectUser(user: string) {
    /*this.openDialog();*/
    this.service.approveRejectUser(user, false).subscribe(result => {
      this.loadUsers();
    });

  }

  approveSelectedUsers() {
    let userlist = '';
    this.selection.selected.forEach(item => {
      userlist = userlist.concat(item.username, ',');
    });
    this.approveUser(userlist);
  }

  rejectSelectedUsers() {
    let userlist = '';
    this.selection.selected.forEach(item => {
      userlist = userlist.concat(item.username, ',');
    });
    this.rejectUser(userlist);
  }

  isselected() {
    if (this.selection.selected.length >= 1) {
      return false;
    } else {
      return true;
    }
  }

}
