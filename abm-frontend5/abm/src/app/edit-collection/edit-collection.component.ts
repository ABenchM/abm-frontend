import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { DialogService } from 'ng2-bootstrap-modal';

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
  constructor(private route: ActivatedRoute, private router: Router,
    private service: CollectionService, private dialogService: DialogService) {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  loadCollection(collectionId) {
    this.loading = true;
    if (collectionId) {
      this.service.getCollectionById(collectionId).take(1).subscribe(response => {
        this.collection = response.json();
      }
      );
    }
    this.loading = false;
  }

  showConfirm(fargCollection) {
    const disposable = this.dialogService.addDialog(DialogComponentComponent, {
      title: 'Confirm',
      message: 'Are you sure?This cannot be undone.'
    })
      .subscribe((isConfirmed) => {
        // We get dialog result
        if (isConfirmed) {
          fargCollection.privateStatus = false;
          this.service.updateCollection(fargCollection).subscribe(
            response => {
              if (response.status === 200) {
                this.router.navigateByUrl('/collection');
              }
            });
        } else {
          // alert('declined');
        }
      });
    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);

  }



  back() {
    this.router.navigateByUrl('/collection');
  }

  ngOnInit() {
    this.loadCollection(this.id);
  }

}
