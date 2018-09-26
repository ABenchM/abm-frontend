import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {OrderModule} from 'ngx-order-pipe';
import {ContextMenuModule} from 'ngx-contextmenu';
import {ShContextMenuModule} from 'ng2-right-click-menu';
import {NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import {NgbAccordion} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule, MatMenuModule, MatSortModule, MatIconModule, MatTableModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatCheckboxModule, MatDialogModule} from '@angular/material';


// Components

import { AppComponent } from './app.component';
import { BuildTabComponent } from './build-tab/build-tab.component';
import { BuildColourPipe } from './shared/build-colour.pipe';
import { FileSizePipe } from './shared/file-size.pipe';
import { HermesNamePipe } from './shared/hermes-name.pipe';
import { PrivateStatusPipe } from './shared/private-status.pipe';
import { SiteNamePipe } from './shared/site-name.pipe';
import { TabTitlePipe } from './shared/tab-title.pipe';
import { AboutComponent } from './about/about.component';
import { CollectionComponent } from './collection/collection.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { FilterComponent } from './filter/filter.component';
import { HermesViewerComponent } from './hermes-viewer/hermes-viewer.component';
import { ModalBuildComponent } from './modal-build/modal-build.component';
import { ModalHermesComponent } from './modal-hermes/modal-hermes.component';
import { ModalLoginComponent } from './modal-login/modal-login.component';
import { SearchComponent } from './search/search.component';
import { VersionDropDownComponent } from './version-drop-down/version-drop-down.component';
import { ViewComponent } from './view/view.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import { getAuthServiceConfigs } from './SocialLoginConfig';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { LogoutComponent } from './logout/logout.component';

// Services
import {Register} from './services/register.service';
import { Login } from './services/login.service';
import { Logout } from './services/logout.service';
import {GoogleLoginService} from './services/google-login.service';
import {UtilityService} from './services/utility.service';
import { AppErrorHandler } from './app-error-handler';
import {SearchService } from './services/search.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CollectionService } from './services/collection.service';
import { CapitalizeFirstPipe } from './shared/capitalize-first.pipe';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { DataServiceService } from './services/data-service.service';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PinService } from './services/pin.service';
import { CurrentUserService } from './services/current-user.service';
import { ViewService } from './services/view.service';
import {ToastService} from './services/toast.service';
import { BuiltStatusPipe } from './shared/built-status.pipe';
import {WebsocketService} from './services/websocket.service';
import {MessageService} from './services/message.service';
import { HermesService } from './services/hermes.service';
import { CommitSelectorComponent } from './commit-selector/commit-selector.component';
import { CommitService } from './services/commit.service';
import { ModalBuildViewerComponent } from './modal-build-viewer/modal-build-viewer.component';
import { ProjectCountPipe } from './project-count.pipe';
import { AddToCollectionComponent } from './add-to-collection/add-to-collection.component';
import { BuildService } from './services/build.service';
import { AdminPendingReqComponent } from './admin-pending-req/admin-pending-req.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { DeleteDialogboxComponent } from './delete-dialogbox/delete-dialogbox.component';
import { DailogBoxComponent } from './dailog-box/dailog-box.component';
import { ManagePublicCollectionsComponent } from './manage-public-collections/manage-public-collections.component';

const routes: Routes = [
 {path: '', pathMatch: 'full', component: HomeComponent},
  { path: 'collection', component: CollectionComponent },
  { path: 'search', component: SearchComponent , canActivate: [AuthGuardService]},
  {path: 'editCollection/:id' , component: EditCollectionComponent, canActivate: [AuthGuardService] },
  {path: 'view/:id' , component: ViewComponent },
  {path: 'createCollection', component: CreateCollectionComponent, canActivate: [AuthGuardService] },
  {path: 'addToCollection', component: AddToCollectionComponent, canActivate: [AuthGuardService] },
  {path: 'filters', component: FilterComponent ,  canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'about', component: AboutComponent },
  {path: 'register', component: RegisterComponent},
  {path: 'register-success', component: RegisterSuccessComponent},
  {path: 'profile', component: MyProfileComponent},
  {path: 'pendingRequest', component: AdminPendingReqComponent},
  {path: 'manageusers', component: ManageUsersComponent},
  {path: 'publicCollections', component: ManagePublicCollectionsComponent},
  {path: 'publicCollection', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BuildTabComponent,
    BuildColourPipe,
    FileSizePipe,
    HermesNamePipe,
    PrivateStatusPipe,
    SiteNamePipe,
    TabTitlePipe,
    AboutComponent,
    CollectionComponent,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CriteriaComponent,
    FilterComponent,
    HermesViewerComponent,
    ModalBuildComponent,
    ModalHermesComponent,
    ModalLoginComponent,
    SearchComponent,
    VersionDropDownComponent,
    ViewComponent,
    LogoutComponent,
    RegisterSuccessComponent,
    BsNavbarComponent,
    HomeComponent,
    EditCollectionComponent,
    CreateCollectionComponent,
    CapitalizeFirstPipe,
    DialogComponentComponent,
    MyProfileComponent,
    BuiltStatusPipe,
    CommitSelectorComponent,
    ModalBuildViewerComponent,
    ProjectCountPipe,
    AddToCollectionComponent,
    AdminPendingReqComponent,
    ManageUsersComponent,
    DeleteDialogboxComponent,
    DailogBoxComponent,
    ManagePublicCollectionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    BootstrapModalModule.forRoot({container: document.body}),
    SocialLoginModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    OrderModule,
    ContextMenuModule.forRoot(),
    ShContextMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    DataServiceService,
    Register,
    Login,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    Logout,
    GoogleLoginService,
    AuthGuardService,
    UtilityService,
    CollectionService,
    SearchService,
    PinService,
    CurrentUserService,
    ViewService,
    {provide: ErrorHandler , useClass: AppErrorHandler},
    ToastService,
    WebsocketService,
    MessageService,
    HermesService,
    CommitService,
    BuildService
  ],
  entryComponents: [
    DeleteDialogboxComponent,
    DialogComponentComponent,
    ModalHermesComponent,
    CommitSelectorComponent,
    HermesViewerComponent,
    ModalBuildViewerComponent,
    DailogBoxComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }