import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupervisorRoutingModule } from './supervisor-routing.module';
import { TemplateComponent } from './components/template/template.component';


@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    SupervisorRoutingModule
  ]
})
export class SupervisorModule { }
