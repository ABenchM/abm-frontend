import { take } from 'rxjs/operators';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CollectionService } from '../services/collection.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'abm-parentview',
  templateUrl: './parentview.component.html',
  styleUrls: ['./parentview.component.css']
})
export class ParentviewComponent implements OnInit {

  viewCollection: any = [{}];
  loading: boolean;
  version: any = {};
  projects = [{}];
  id;
  parentCollName;
  parentVersName;

  constructor(private service: CollectionService, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService) {

    this.id = this.route.snapshot.paramMap.get('id');
    this.loadViewCollection(this.id);

  }

  loggedInStatus() {

    return localStorage.getItem('loggedIn') === 'true';
  }

  loadViewCollection(viewCollectionId) {
    this.loading = true;
    console.log(localStorage.getItem('currentUser'));
    if (viewCollectionId) {
      this.service.getVersionParentDetails(viewCollectionId).pipe(take(1)).subscribe(
        response => {
          if (response.status === 200) {
            if (response.json() !== undefined) {
              this.viewCollection = response.json();
              this.version = this.viewCollection.versions[0];
              this.projects = this.version.projects;
            }
          } else if (response.status === 403) {
            this.toastr.error('Your session has expried. Please login first ');
            this.router.navigateByUrl('/login');
          }

        },
        (error) => {
          this.toastr.error('This version was deleted by the Owner/Administrator.');
          console.log(error);
        }
      );
    }
    this.loading = false;
  }

  ngOnInit() {

  }

}

