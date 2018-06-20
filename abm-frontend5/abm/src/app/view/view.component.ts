import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import 'rxjs/add/operator/take';
import { CollectionService } from '../services/collection.service';


@Component({
  selector: 'abm-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  viewCollection = [{}];
  id;
  loading: boolean;

  constructor(private service: CollectionService, private router: Router, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log('id'  + this.id);
  }

  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  loadViewCollection(viewCollectionId) {
    this.loading = true;
    if (viewCollectionId) {
      this.service.getViewCollection(viewCollectionId).take(1).subscribe(
        response => {
        console.log('REsponse ' + response.json());
        this.viewCollection = response.json();
        }
      );
    }
    console.log(this.viewCollection[0]);
    this.loading = false;
  }


  back() {
if (this.loggedInStatus) {
   this.router.navigateByUrl('/collection');
} else {
   this.router.navigateByUrl('/');
}
  }

  ngOnInit() {
     this.loadViewCollection(this.id);
  }

}
