import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { AboutComponent } from './unLoggedUser/components/about/about.component';
import { ApprovedThesisesComponent } from './unLoggedUser/components/approved-thesises/approved-thesises.component';
import { LoginPageComponent } from './unLoggedUser/components/login-page/login-page.component';
import { NavbarComponent } from './unLoggedUser/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BannerComponent } from './shared/components/banner/banner.component';
import { DepartmentsComponent } from './Admin/components/departments/departments.component';

import { AdministratorsComponent } from './Admin/components/administrators/administrators.component';
import { UsersComponent } from './AdminUnit/components/users/users.component';
import { FacultiesComponent } from './AdminUnit/components/faculties/faculties.component';
import { ThesesComponent } from './AdminUnit/components/theses/theses.component';
import { ReportsComponent } from './AdminUnit/components/reports/reports.component';
import { BlockedAcountsComponent } from './AdminUnit/components/blocked-acounts/blocked-acounts.component';
import { ApprovedThesesComponent } from './Supervisor/components/approved-theses/approved-theses.component';
import { AddThesisComponent } from './Supervisor/components/add-thesis/add-thesis.component';
import { MyThesesComponent } from './Supervisor/components/my-theses/my-theses.component';
import { TicketsComponent } from './Supervisor/components/tickets/tickets.component';
import { ThesesListComponent } from './Candidate/components/theses-list/theses-list.component';
import { ProponeThesisComponent } from './Candidate/components/propone-thesis/propone-thesis.component';
import { ReportsAdminComponent } from './Admin/components/reports-admin/reports-admin.component';
import { AdminModule } from './Admin/admin.module';
import { SharedModule } from './shared/shared/shared.module';
import { ApiService } from './_services/api.service';
import { UniversalAppInterceptorService } from './_helpers/universal-app-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ApprovedThesisesComponent,
    LoginPageComponent,
    NavbarComponent,
    FooterComponent,
    BannerComponent,
    
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
    
   
    
  ],
  exports:[
    SharedModule
  ],
  
  providers: [
    ApiService,
    { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
