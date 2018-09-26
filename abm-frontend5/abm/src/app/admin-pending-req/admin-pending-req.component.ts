import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort,MatFormFieldModule, MatCheckboxModule} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DailogBoxComponent } from '../dailog-box/dailog-box.component';

@Component({
  selector: 'admin-pending-req-root',
  templateUrl: './admin-pending-req.component.html',
  styleUrls: ['./admin-pending-req.component.css']
})
export class AdminPendingReqComponent implements OnInit {
  dialogResult = "";
  dialogResultAdd = "";
  displayedColumns  = ['Name', 'LastName', 'UserName', 'EmailId', 'City', 'Affilition', 'Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

constructor(public dialog: MatDialog) {

  }

  openDialog(){
    let dialogRef = this.dialog.open(DailogBoxComponent, {
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
  this.dataSource = new MatTableDataSource(this.dataSource.data);
  this.dataSource.paginator = this.paginator;
  }

}
export interface PeriodicElement {
  Name: string;
  LastName: string;
  UserName: string;
  EmailId: string;
  City: string;
  Affilition: string;
  Action: string
}


const ELEMENT_DATA: PeriodicElement[] = [
  {Name: 'Minal', LastName: 'Lad', UserName: 'minal_lad', EmailId: 'minal0110@gmail.com', City: 'Paderborn', Affilition: 'IBM', Action: 'Approve'}, 
  {Name: 'Namita', LastName: 'Bhore', UserName: 'Nami_08', EmailId: 'Nami0808@gmail.com', City: 'Bonn', Affilition: 'BMW', Action: 'Approve'},
  {Name: 'Neha', LastName: 'Kumari', UserName: 'Neha@19', EmailId: 'Neha1992@gmail.com', City: 'Munich', Affilition: 'IBM', Action: 'Approve'},
  {Name: 'Vishal', LastName: 'Joshep', UserName: 'Vishal_VJ', EmailId: 'Visha10@gmail.com', City: 'Hamburg', Affilition: 'TCS', Action: 'Approve'},
  {Name: 'Anu', LastName: 'Thottam', UserName: 'Anu_30', EmailId: 'Anu7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Saman', LastName: 'Ali', UserName: 'Saman_10', EmailId: 'Saman123@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Aitha', LastName: 'Lakshminarayan', UserName: 'Anitha_45', EmailId: 'Anitha7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
  {Name: 'Mohit', LastName: 'Sharma', UserName: 'Sharma_30', EmailId: 'Mac7698@gmail.com', City: 'Lipzig', Affilition: 'TeamB', Action: 'Approve'},
];
