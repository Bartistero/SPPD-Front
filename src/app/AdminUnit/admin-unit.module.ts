import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUnitRoutingModule } from './admin-unit-routing.module';
import { TemplateComponent } from './components/template/template.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { ThesesComponent } from './components/theses/theses.component';
import { UsersComponent } from './components/users/users.component';
import { BlockedAcountsComponent } from './components/blocked-acounts/blocked-acounts.component';
import { ReportsComponent } from './components/reports/reports.component';
import { SharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [
    TemplateComponent,
    NavbarComponent,
    FacultiesComponent,
    ThesesComponent,
    UsersComponent,
    BlockedAcountsComponent,
    ReportsComponent


  ],
  imports: [
    CommonModule,
    AdminUnitRoutingModule,
    SharedModule
  ]
})
export class AdminUnitModule { }
