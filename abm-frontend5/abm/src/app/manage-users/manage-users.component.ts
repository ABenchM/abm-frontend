import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';

import {MatPaginator, MatTableDataSource, MatSort,MatFormFieldModule, MatCheckboxModule} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';

//import { SelectionModel} from '@angular/cdk/collections';
import { DeleteDialogboxComponent } from '../delete-dialogbox/delete-dialogbox.component';
import { UserService } from '../services/user.service';
import { User} from '../models/user.model'

@Component({
  selector: 'abm-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  public usersList: any[] = [];
  loading: boolean;
  dialogResult = "";
  displayedColumns: string[] = ['UserName', 'Name', 'Emailid', 'Affiliation' ,'Account_status','Lockaction'];
  dataSource = new MatTableDataSource<User>();
  //selection = new SelectionModel<Element>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service:UserService ,private orderPipe: OrderPipe, public dialog: MatDialog) {

  }

  loadUsers() {
    this.loading = true;
    this.service.getAllUsers().subscribe(response => {
      this.usersList = this.orderPipe.transform(response.json());
      this.dataSource.data = this.usersList;
    });
    this.loading = false;
  }

  openDialog(){
    let dialogRef = this.dialog.open(DeleteDialogboxComponent, {
      width: '300px',
      data: 'Component Data'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogResult = result;
    });
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }


   ngOnInit() {
    this.loadUsers();
    // this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

// export interface Element {
//   UserName: string;
//   Name: string;
//   Emailid: string;
//   Affiliation: string;
//   Account_status:string;
//   Lockaction:string;
// }

// const ELEMENT_DATA: Element[] = [
//   { UserName: 'cdcad', Name: 'Hydrogen', Emailid: 'abc@gmail.com', Affiliation: 'H', Account_status:'Unlocked',Lockaction:"Active"},
//   { UserName: 'gvrwlm', Name: 'Helium', Emailid: 'abc@gmail.com', Affiliation: 'He', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'lkwrn', Name: 'Lithium', Emailid: 'abc@gmail.com', Affiliation: 'Li', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'v;fskm', Name: 'Beryllium', Emailid: 'abc@gmail.com', Affiliation: 'Be', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'gvorsk', Name: 'Boron', Emailid: 'abc@gmail.com', Affiliation: 'B', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vlgri', Name: 'Carbon', Emailid: 'abc@gmail.com', Affiliation: 'C', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vrwm', Name: 'Nitrogen', Emailid: 'abc@gmail.com', Affiliation: 'N', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vrsij', Name: 'Oxygen', Emailid: 'abc@gmail.com', Affiliation: 'O', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'bfrkn', Name: 'Fluorine', Emailid: 'abc@gmail.com', Affiliation: 'F', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'givrs', Name: 'Neon', Emailid: 'abc@gmail.com', Affiliation: 'Ne', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'givorwj', Name: 'Sodium', Emailid: 'abc@gmail.com', Affiliation: 'Na', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vglwrkn', Name: 'Magnesium', Emailid: 'abc@gmail.com', Affiliation: 'Mg', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vlkrm', Name: 'Aluminum', Emailid: 'abc@gmail.com', Affiliation: 'Al', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vlkrs', Name: 'Silicon', Emailid: 'abc@gmail.com', Affiliation: 'Si', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'beoru', Name: 'Phosphorus', Emailid: 'abc@gmail.com', Affiliation: 'P', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vsfkl', Name: 'Sulfur', Emailid: 'abc@gmail.com', Affiliation: 'S', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vkjr', Name: 'Chlorine', Emailid: 'abc@gmail.com', Affiliation: 'Cl', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vwlke', Name: 'Argon', Emailid: 'abc@gmail.com', Affiliation: 'Ar', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vrwkj', Name: 'Potassium', Emailid: 'abc@gmail.com', Affiliation: 'K', Account_status:'Unlocked',Lockaction:"Active" },
//   { UserName: 'vwrjln', Name: 'Calcium', Emailid: 'abc@gmail.com', Affiliation: 'Ca', Account_status:'Unlocked',Lockaction:"Active" },
// ];

