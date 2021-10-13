import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { TemplateComponent } from './components/template/template.component';
import { AddThesisComponent } from './components/add-thesis/add-thesis.component';
import { ApprovedThesesComponent } from './components/approved-theses/approved-theses.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyThesesComponent } from './components/my-theses/my-theses.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SharedModule } from '../shared/shared/shared.module';


@NgModule({
  declarations: [
    TemplateComponent,
    AddThesisComponent,
    ApprovedThesesComponent,
    NavbarComponent,
    MyThesesComponent,
    TicketsComponent

  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule,
    SharedModule
  ]
})
export class SupervisorModule { }
