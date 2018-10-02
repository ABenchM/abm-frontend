import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource } from '@angular/material';
import {DailogboxComponent} from  '../dailogbox/dailogbox.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort} from '@angular/material';

@Component({
  selector: 'admin-pending-req-root',
  templateUrl: './admin-pending-req.component.html',
  styleUrls: ['./admin-pending-req.component.css']
})
export class AdminPendingReqComponent implements OnInit {
  dialogResult = "";
  displayedColumns  = ['Name', 'Last_name', 'Username', 'Email_id', 'City', 'Affilition', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;

constructor(public dialog: MatDialog) {

  }

  openDialog(){
    let dialogRef = this.dialog.open(DailogboxComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogResult = result;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  ngOnInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
  }

}
export interface PeriodicElement {
  Name: string;
  Last_name: string;
  Username: string;
  Email_id: string;
  City: string;
  Affilition: string;
  Action: string
}


const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'Minal', Last_name: 'Lad', Username: 'minal_lad', Email_id: 'minal0110@gmail.com', City: 'Paderborn', Affilition: 'IBM', Action: 'Approve'}, 
  {Name: 'Namita', Last_name: 'Bhore', Username: 'Nami_08', Email_id: 'Nami0808@gmail.com', City: 'Bonn', Affilition: 'BMW', Action: 'Approve'},
  {Name: 'Neha', Last_name: 'Kumari', Username: 'Neha@19', Email_id: 'Neha1992@gmail.com', City: 'Munich', Affilition: 'IBM', Action: 'Approve'},
  {Name: 'Vishal', Last_name: 'Joshep', Username: 'Vishal_VJ', Email_id: 'Visha10@gmail.com', City: 'Hamburg', Affilition: 'TCS', Action: 'Approve'},
  {Name: 'Anu', Last_name: 'Thottam', Username: 'Anu_30', Email_id: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Anu', Last_name: 'Thottam', Username: 'Anu_30', Email_id: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Anu', Last_name: 'Thottam', Username: 'Anu_30', Email_id: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Anu', Last_name: 'Thottam', Username: 'Anu_30', Email_id: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Anu', Last_name: 'Thottam', Username: 'Anu_30', Email_id: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Anu', Last_name: 'Thottam', Username: 'Anu_30', Email_id: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Anu', Last_name: 'Thottam', Username: 'Anu_30', Email_id: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Anu', Last_name: 'Thottam', Username: 'Anu_30', Email_id: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'}, 
];
