import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUnitRoutingModule } from './admin-unit-routing.module';
import { TemplateComponent } from './components/template/template.component';


@NgModule({
  declarations: [
    TemplateComponent
  ],
  imports: [
    CommonModule,
    AdminUnitRoutingModule
  ]
})
export class AdminUnitModule { }
