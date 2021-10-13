import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TemplateComponent } from './components/template/template.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { ReportsAdminComponent } from './components/reports-admin/reports-admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared/shared.module';



@NgModule({
  declarations: [
    TemplateComponent,
    ReportsAdminComponent,
    AdministratorsComponent,
    DepartmentsComponent,
    NavbarComponent
  
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
    
    
  ],
 
  
  
 
})
export class AdminModule { }
