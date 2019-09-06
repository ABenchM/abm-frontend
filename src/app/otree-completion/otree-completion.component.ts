import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'abm-otree-completion',
  templateUrl: './otree-completion.component.html',
  styleUrls: ['./otree-completion.component.css']
})
export class OtreeCompletionComponent implements OnInit {

  constructor(private nav: NavbarService) { }

  ngOnInit() {
    this.nav.hide();
    window.location.href = 'https://app.prolific.co/submissions/complete?cc=7Y1LD2FE';
  }

}
