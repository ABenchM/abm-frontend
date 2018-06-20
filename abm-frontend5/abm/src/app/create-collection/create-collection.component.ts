import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from '../register/username.validators';

@Component({
  selector: 'abm-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {

  constructor() { }


  );

  ngOnInit() {
  }
  save(collection) {
  console.log(collection);
  }

}
