import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Routes, RouterModule, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { OrderModule } from 'ngx-order-pipe';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule, MatSelectModule, MatTooltipModule, MatButtonToggleModule, MatGridListModule} from '@angular/material';
import { MatButtonModule, MatMenuModule, MatSortModule, MatIconModule, MatTableModule, MatExpansionModule } from '@angular/material';
import { MatDialogModule, MatCheckboxModule, MatPaginatorModule, MatInputModule} from '@angular/material';



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
import { FilterComponent } from './filter/filter.component';
import { HermesViewerComponent } from './hermes-viewer/hermes-viewer.component';
import { ModalBuildComponent } from './modal-build/modal-build.component';
import { ModalHermesComponent } from './modal-hermes/modal-hermes.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import { getAuthServiceConfigs } from './SocialLoginConfig';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { LogoutComponent } from './logout/logout.component';

// Services
import { Register } from './services/register.service';
import { Login } from './services/login.service';
import { Logout } from './services/logout.service';
import { GoogleLoginService } from './services/google-login.service';
import { AppErrorHandler } from './app-error-handler';
import { SearchService } from './services/search.service';
import { AuthGuardService } from './services/auth-guard.service';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { CreateCollectionComponent } from './create-collection/create-collection.component';
import { CollectionService } from './services/collection.service';
import { CapitalizeFirstPipe } from './shared/capitalize-first.pipe';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';
import { DataServiceService } from './services/data-service.service';
import { PinService } from './services/pin.service';
import { CurrentUserService } from './services/current-user.service';
import { ViewService } from './services/view.service';
import { UserService } from './services/user.service';
import { BuiltStatusPipe } from './shared/built-status.pipe';
import { ResetPasswordService } from './services/reset-password.service';


import { HermesService } from './services/hermes.service';
import { CommitSelectorComponent } from './commit-selector/commit-selector.component';
import { CommitService } from './services/commit.service';
import { ModalBuildViewerComponent } from './modal-build-viewer/modal-build-viewer.component';
import { ProjectCountPipe } from './project-count.pipe';
import { AddToCollectionComponent } from './add-to-collection/add-to-collection.component';
import { BuildService } from './services/build.service';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { ContextMenuModule, ContextMenuService } from 'ngx-contextmenu';
import { DataTableModule, PaginatorModule } from 'primeng/primeng';
import { ToastModule } from 'primeng/toast';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDialogboxComponent } from './delete-dialogbox/delete-dialogbox.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManagePublicCollectionsComponent } from './manage-public-collections/manage-public-collections.component';
import { AdminPendingReqComponent } from './admin-pending-req/admin-pending-req.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { DialogboxMakePublicComponent } from './dialogbox-make-public/dialogbox-make-public.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SaveSuccessComponent } from './save-success/save-success.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordSuccessComponent } from './reset-password-success/reset-password-success.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';
import { DialogVersionDialogComponent } from './edit-collection/dialog-version-dialog.component';
import { ParentviewComponent } from './parentview/parentview.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'collection', component: CollectionComponent, canActivate: [AuthGuardService] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuardService] },
  { path: 'editCollection/:id', component: EditCollectionComponent, canActivate: [AuthGuardService] },
  { path: 'editCollection/:id/:versionIndex', component: EditCollectionComponent, canActivate: [AuthGuardService] },
  { path: 'view/:id', component: ViewComponent },
  { path: 'view/:id/:versionIndex', component: ViewComponent },
  { path: 'parentview/:id', component: ParentviewComponent },
  { path: 'createCollection', component: CreateCollectionComponent, canActivate: [AuthGuardService] },
  { path: 'addToCollection', component: AddToCollectionComponent, canActivate: [AuthGuardService] },
  { path: 'filters', component: FilterComponent, canActivate: [AuthGuardService] },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'confirm-password', component: ConfirmPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'reset-password-success', component: ResetPasswordSuccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'save-success', component: SaveSuccessComponent},
  { path: 'manageusers', component: ManageUsersComponent },
  { path: 'managePublicCollections', component: ManagePublicCollectionsComponent },
  { path: 'pendingRequest', component: AdminPendingReqComponent },
  { path: 'profile', component: UserProfileComponent }

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
    FilterComponent,
    HermesViewerComponent,
    ModalBuildComponent,
    ModalHermesComponent,
    SearchComponent,
    ViewComponent,
    LogoutComponent,
    RegisterSuccessComponent,
    BsNavbarComponent,
    HomeComponent,
    EditCollectionComponent,
    CreateCollectionComponent,
    CapitalizeFirstPipe,
    DialogComponentComponent,
    BuiltStatusPipe,
    CommitSelectorComponent,
    ModalBuildViewerComponent,
    ProjectCountPipe,
    AddToCollectionComponent,
    DeleteDialogboxComponent,
    ManageUsersComponent,
    ManagePublicCollectionsComponent,
    AdminPendingReqComponent,
    DialogBoxComponent,
    DialogboxMakePublicComponent,
    UserProfileComponent,
    SaveSuccessComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ResetPasswordSuccessComponent,
    ConfirmPasswordComponent,
    DialogVersionDialogComponent,
    ParentviewComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BootstrapModalModule.forRoot({ container: document.body }),
    SocialLoginModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    OrderModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    HttpClientModule,
    ContextMenuModule,
    TableModule,
    DataTableModule,
    PaginatorModule,
    ConfirmDialogModule,
    CheckboxModule,
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    ToastModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatExpansionModule,
    MatGridListModule,
    MatButtonToggleModule
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
    CollectionService,
    SearchService,
    PinService,
    CurrentUserService,
    ViewService,
    UserService,
    { provide: ErrorHandler, useClass: AppErrorHandler },
    HermesService,
    CommitService,
    BuildService,
    ContextMenuService,
    ResetPasswordService,
    RouterLinkActive
  ],
  entryComponents: [
    DeleteDialogboxComponent,
    DialogComponentComponent,
    DialogBoxComponent,
    ModalHermesComponent,
    CommitSelectorComponent,
    HermesViewerComponent,
    ModalBuildViewerComponent,
    DialogboxMakePublicComponent,
    ModalBuildViewerComponent,
    DialogVersionDialogComponent
  ], exports: [



    MatTableModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
