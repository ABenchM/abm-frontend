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
  versions = [{}];
  version = {};
  commits = [{}];
  derivedVersion = {};
  id;
  loading: boolean;
  saving: boolean;
  disabled: boolean;
  constructor(private route: ActivatedRoute, private router: Router,
    private service: CollectionService, private dialogService: DialogService) {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  loadCollection(collectionId) {
    this.loading = true;
    if (collectionId) {
      this.service.getCollectionById(collectionId).take(1).subscribe(response => {
        this.collection = response.json();
        this.versions = response.json()[0].versions;
        this.version = response.json()[0].versions[0];
        this.commits = response.json()[0].versions[0].commits;
        // console.log(response.json()[0].versions[0].number);
        // console.log(this.version.number);
      }
      );
    }
    this.loading = false;
  }

  deriveVersion(ver) {
    this.disabled = true;
    this.service.postDeriveVersion(ver).subscribe(
      response => {
        if (response.status === 200) {

          this.derivedVersion = response.json();
          this.versions.push(this.derivedVersion);
          this.version = this.derivedVersion;

        }
      }
    );
    this.disabled = false;
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

  update(fargCollection) {
    this.saving = true;
    console.log(fargCollection);
    this.service.updateCollection(fargCollection).subscribe(
      response => {
        if (response.status === 200) {
          this.router.navigateByUrl('/editCollection/' + fargCollection.id);
        }
      }
    );
    this.saving = false;
  }


  back() {
    this.router.navigateByUrl('/collection');
  }

  ngOnInit() {
    this.loadCollection(this.id);
  }

}
