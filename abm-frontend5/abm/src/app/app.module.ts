import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { BuildTabComponent } from './build-tab/build-tab.component';
import { BuildColourPipe } from './shared/build-colour.pipe';
import { FileSizePipe } from './shared/file-size.pipe';
import { HermesNamePipe } from './shared/hermes-name.pipe';
import { PrivateStatusPipe } from './shared/private-status.pipe';
import { SiteNamePipe } from './shared/site-name.pipe';
import { TabTitlePipe } from './shared/tab-title.pipe';



const routes : Routes = [
  {
    path: '',
    children: []
  }
]

@NgModule({
  declarations: [
    AppComponent,
    BuildTabComponent,
    BuildColourPipe,
    FileSizePipe,
    HermesNamePipe,
    PrivateStatusPipe,
    SiteNamePipe,
    TabTitlePipe

  ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(routes)


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
