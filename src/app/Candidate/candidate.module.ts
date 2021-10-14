import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { TemplateComponent } from './components/template/template.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ProponeThesisComponent } from './components/propone-thesis/propone-thesis.component';
import { ThesesListComponent } from './components/theses-list/theses-list.component';
import { SharedModule } from '../shared/shared/shared.module';
import { MyThesesCandidateComponent } from './components/my-theses-candidate/my-theses-candidate.component';
import { ApprovedThesesComponent } from './components/approved-theses/approved-theses.component';


@NgModule({
  declarations: [
    TemplateComponent,
    NavbarComponent,
    ProponeThesisComponent,
    ThesesListComponent,
    MyThesesCandidateComponent,
    ApprovedThesesComponent
  ],
  imports: [
    CommonModule,
    CandidateRoutingModule,
    SharedModule
  ]
})
export class CandidateModule { }
