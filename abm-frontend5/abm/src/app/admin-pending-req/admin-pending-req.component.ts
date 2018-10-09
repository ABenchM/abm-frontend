import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource } from '@angular/material';
import {DailogboxComponent} from  '../dailogbox/dailogbox.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';


@Component({
  selector: 'admin-pending-req-root',
  templateUrl: './admin-pending-req.component.html',
  styleUrls: ['./admin-pending-req.component.css']
})
export class AdminPendingReqComponent implements OnInit {
  dialogResult = "";
  displayedColumns: string[] = ['select','Name', 'LastName', 'UserName', 'EmailId', 'City', 'Affilition', 'Approve', 'Reject'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

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

}

export interface PeriodicElement {
  Name: string;
  LastName: string;
  UserName: string;
  EmailId: string;
  City: string;
  Affilition: string;
  Approve: string;
  Reject: string
}


const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'Minal', LastName: 'Lad', UserName: 'minal_lad', EmailId: 'minal0110@gmail.com', City: 'Paderborn', Affilition: 'IBM', Approve: 'Check', Reject: 'Clear'}, 
  {Name: 'Namita', LastName: 'Bhore', UserName: 'Nami_08', EmailId: 'Nami0808@gmail.com', City: 'Bonn', Affilition: 'BMW', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Neha', LastName: 'Kumari', UserName: 'Neha@19', EmailId: 'Neha1992@gmail.com', City: 'Munich', Affilition: 'IBM', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Vishal', LastName: 'Joshep', UserName: 'Vishal_VJ', EmailId: 'Visha10@gmail.com', City: 'Hamburg', Affilition: 'TCS', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Anu', LastName: 'Thottam', UserName: 'Anu_30', EmailId: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Adarsh', LastName: 'Manepali', UserName: 'Manu_12', EmailId: 'Adarsh21@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Shubham', LastName: 'singh', UserName: 'Singh_297', EmailId: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Nitesh', LastName: 'Sahah', UserName: 'Nit_04', EmailId: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Shashank', LastName: 'Khude', UserName: 'Shasha', EmailId: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Snehal', LastName: 'Chitnis', UserName: 'Mau_10', EmailId: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Amu', LastName: 'Lohiya', UserName: 'Amu_20', EmailId: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Approve: 'Check', Reject: 'Clear'},
  {Name: 'Mohit', LastName: 'Lohiya', UserName: 'Mohit_17', EmailId: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Approve: 'Check', Reject: 'Clear'}, 
];
