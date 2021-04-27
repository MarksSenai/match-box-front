import { AuthGuard } from './security/auth.guard';
import { Interceptor } from './security/interceptor.module';
import { AuthService } from './security/auth.service';
import { SecurityRoutingModule } from './security/security-routing.module';
import { ConfigService } from './configurations/config.service';
import { AppRoutingModule } from './app-routing.module';
import { AlertService } from './alert/alert.service';
import { UploadFileService } from './upload/upload-file.service';
import { ReportService } from './reports/report.service';
import { HomeService } from './home/home.service';
import { MachinesService } from './machines/machines.service';
import { NgModule, Injectable } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SafeURLPipe } from '../app/shared/safe-url';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { MachinesComponent } from './machines/machines.component';
import { ReportsComponent } from './reports/reports.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { ConfigurationsComponent } from './configurations/configurations.component';
import { Routes, RouterModule} from '@angular/router';
import { UsersCreateComponent } from './users/users-create/users-create.component';
import { UsersListComponent } from './users/users-list/users-list.component';

import { UsersService } from './users/users.service';
import { MachineCreateComponent } from './machines/machine-create/machine-create.component';
import { MachinesListComponent } from './machines/machines-list/machines-list.component';
import { MachineUpdateComponent } from './machines/machine-update/machine-update.component';
import { MachineItemComponent } from './machines/machine-item/machine-item.component';
import { PermissionsManageComponent } from './permissions-manage/permissions-manage.component';
import { PermissionsUserComponent } from './permissions-user/permissions-user.component';
import { PermissionsMachineComponent } from './permissions-machine/permissions-machine.component';
import { PermissionsService } from './permissions//permissions.service';
import { HomeItemComponent } from './home-item/home-item.component';
import { HomeListComponent } from './home-list/home-list.component';
import { ReportComponent } from './report/report.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportItemComponent } from './report-item/report-item.component';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserListPermissionComponent } from './users/user-list-permission/user-list-permission.component';
import { MachinesListPermissionComponent } from './machines/machines-list-permission/machines-list-permission.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
import { AlertComponent } from './alert/alert/alert.component';
import { ConfigCreateComponent } from './configurations/config-create/config-create.component';
import { ConfigUpdateComponent } from './configurations/config-update/config-update.component';
import { ConfigItemComponent } from './configurations/config-item/config-item.component';
import { LoginFormComponent } from './security/login-form/login-form.component'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UsersImportComponent } from './users/users-import/users-import.component';
import { XlsxUploadComponent } from './upload/xlsx-upload/xlsx-upload.component';
import { RemoteUpdateComponent } from './remote/remote-update/remote-update.component';
import { CompanyImageComponent } from './configurations/config-image/company-image/company-image.component';
import { RemoteMachinesComponent } from './remote/remote-machines/remote-machines.component';
import { RemoteLogoComponent } from './remote/remote-logo/remote-logo.component';
import { RemoteMachineItemComponent } from './remote/remote-machine-item/remote-machine-item.component';
import { APP_INITIALIZER } from '@angular/core';
import { EnvServiceProvider } from './env.service.provider';


const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home', canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'users-create', component: UsersCreateComponent, canActivate: [AuthGuard]},
  {path: 'users-import', component: UsersImportComponent, canActivate: [AuthGuard]},
  {path: 'user-update/:userid', component: UserUpdateComponent, canActivate: [AuthGuard]},
  {path: 'machines', component: MachinesComponent, canActivate: [AuthGuard]},
  {path: 'machines-create', component: MachineCreateComponent, canActivate: [AuthGuard]},
  {path: 'machine-update/:machineid', component: MachineUpdateComponent, canActivate: [AuthGuard]},
  {path: 'permissions', component: PermissionsComponent, canActivate: [AuthGuard]},
  {path: 'reports', component: ReportsComponent, canActivate: [AuthGuard]},
  {path: 'configurations', component: ConfigurationsComponent, canActivate: [AuthGuard]},
  {path: 'config-cretate', component: ConfigCreateComponent, canActivate: [AuthGuard]},
  {path: 'config-update', component: ConfigUpdateComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginFormComponent},
  {path: 'remote-update', component: RemoteUpdateComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    MachinesComponent,
    ReportsComponent,
    PermissionsComponent,
    ConfigurationsComponent,
    UsersCreateComponent,
    UsersListComponent,
    MachineCreateComponent,
    MachinesListComponent,
    MachineUpdateComponent,
    MachineItemComponent,
    PermissionsManageComponent,
    PermissionsUserComponent,
    PermissionsMachineComponent,
    HomeItemComponent,
    HomeListComponent,
    ReportComponent,
    ReportListComponent,
    ReportItemComponent,
    FormUploadComponent,
    UserUpdateComponent,
    UserListPermissionComponent,
    MachinesListPermissionComponent,
    SafeURLPipe,
    PermissionsListComponent,
    AlertComponent,
    ConfigCreateComponent,
    ConfigUpdateComponent,
    ConfigItemComponent,
    LoginFormComponent,
    UserProfileComponent,
    UsersImportComponent,
    XlsxUploadComponent,
    RemoteUpdateComponent,
    CompanyImageComponent,
    RemoteMachinesComponent,
    RemoteLogoComponent,
    RemoteMachineItemComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    Interceptor,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  
  ],
  providers: [
    AuthGuard,
    UsersService,
    MachinesService,
    PermissionsService,
    HomeService,
    ReportService,
    UploadFileService,
    AlertService,
    ConfigService,
    AuthService,
    Title,
    EnvServiceProvider
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }