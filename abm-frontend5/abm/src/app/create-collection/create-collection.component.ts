import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from '../register/username.validators';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'abm-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {


  loading: boolean;
  collection: any = {};
  constructor(private dataService: DataServiceService) { }




  ngOnInit() {

  }
  save() {
    this.loading = true;
    this.collection.creation_date = new Date();
    this.collection.privateStatus = true;

  console.log(this.dataService.repositoryList);
  }

}
