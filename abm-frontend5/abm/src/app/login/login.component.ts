import { Component, OnInit } from '@angular/core';
import {Credentials} from '../models/credentials.model';

@Component({
  selector: 'abm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  model = new Credentials('', '');

  ngOnInit() {
  }

}
