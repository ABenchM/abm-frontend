import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommitService } from '../services/commit.service';

@Component({
  selector: 'abm-commit-selector',
  templateUrl: './commit-selector.component.html',
  styleUrls: ['./commit-selector.component.css']
})
export class CommitSelectorComponent implements OnInit {


  @Input() commit: any;
  loading: boolean;
  branches = [];
  tags = [];
  commits = [];
  page = 1;
  cols: any[];
  branchCols :any[];
  tagCols:any[];
  constructor(public activeModal: NgbActiveModal, private commitService: CommitService) { }

  

  loadBranches() {
    this.loading = true;

    this.commitService.getBranches(this.commit.repository).subscribe(
      response => {
        if (response.status === 200) {

          this.branches = response.json();
        }
      }
    );
    this.loading = false;
  }

  switchCommit(id) {
    this.commit.commitId = id;
    this.commitService.changeCommit(this.commit).subscribe(
      response => {
        if (response.status === 200) {
          this.activeModal.close();
        }
      }
    );


  }

  loadPrevCommitPage() {
    this.page--;
    this.loadCommits();
  }

  loadNextCommitPage() {
    this.page++;
    this.loadCommits();
  }

  loadCommits() {
    this.loading = true;
    this.commitService.getCommits(this.commit.repository, this.page).subscribe(
      response => {
        if (response.status === 200) {
          this.commits = response.json();

        }
      }
    );
    this.loading = false;
  }
  loadTags() {
    this.loading = true;
    this.commitService.getTags(this.commit.repository).subscribe(
      response => {
        if (response.status === 200) {

          this.tags = response.json();
        }
      }
    );
    this.loading = false;
  }

  ngOnInit() {
    this.loadBranches();
    this.loadTags();
    this.loadCommits();
    this.cols = [
      { field: 'commitId', header: 'commitId' },
      { field: 'creationDate', header: 'creationDate' },
      { field: 'message', header: 'message' }
    ];
    
    this.branchCols = [
      { field: 'commit', header: 'commit' },
      { field: 'name', header: 'name' }
    ];
    
    this.tagCols = [
      { field: 'commit', header: 'commit' },
      { field: 'name', header: 'name' }
    ];
  }

}
