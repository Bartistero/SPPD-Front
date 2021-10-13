import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { TemplateComponent } from './components/template/template.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { ReportsAdminComponent } from './components/reports-admin/reports-admin.component';



@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReportsAdminComponent,
    AdministratorsComponent,
    DepartmentsComponent,
    NgModule
  ]
  
})
export class AdminModule { }
