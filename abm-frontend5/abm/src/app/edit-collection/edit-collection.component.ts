import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import 'rxjs/add/operator/take';
@Component({
  selector: 'abm-edit-collection',
  templateUrl: './edit-collection.component.html',
  styleUrls: ['./edit-collection.component.css']
})
export class EditCollectionComponent implements OnInit {

  collection = [{}];
  id;
  loading: boolean;
  constructor(private route: ActivatedRoute, private router: Router, private service: CollectionService) {
   this.id = this.route.snapshot.paramMap.get('id');

  }

  loadCollection(collectionId) {
    this.loading = true;
    if (collectionId)  {
      this.service.getCollectionById(collectionId).take(1).subscribe(response =>   {
        this.collection = response.json();
        }
      );
    }
    this.loading = false;
  }

  back() {
    this.router.navigateByUrl('/collection');
  }

  ngOnInit() {
    this.loadCollection(this.id);
  }

}
