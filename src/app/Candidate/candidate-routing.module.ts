import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApprovedThesesComponent } from './components/approved-theses/approved-theses.component';
import { MyThesesCandidateComponent } from './components/my-theses-candidate/my-theses-candidate.component';
import { ProponeThesisComponent } from './components/propone-thesis/propone-thesis.component';
import { TemplateComponent } from './components/template/template.component';
import { ThesesListComponent } from './components/theses-list/theses-list.component';

const routes: Routes = [
  {path: '', component: TemplateComponent, children:
  [
    {path: 'approvedTheses', component: ApprovedThesesComponent },
    {path: 'thesesList', component: ThesesListComponent },
    {path: 'myTheses', component: MyThesesCandidateComponent },
    {path: 'proponeThesis', component: ProponeThesisComponent },
    {path: '' , redirectTo: '/candidate/approvedTheses', pathMatch: 'full'}

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
