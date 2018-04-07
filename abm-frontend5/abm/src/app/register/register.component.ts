import { Component, OnInit } from '@angular/core';
import {User} from '../models/user.model';

@Component({
  selector: 'abm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  model = new User('','','','','','');
  ngOnInit() {
  }

}
