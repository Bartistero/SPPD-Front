import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddThesisComponent } from './components/add-thesis/add-thesis.component';
import { ApprovedThesesComponent } from './components/approved-theses/approved-theses.component';
import { MyThesesComponent } from './components/my-theses/my-theses.component';
import { TemplateComponent } from './components/template/template.component';
import { TicketsComponent } from './components/tickets/tickets.component';

const routes: Routes = [
  {path: '', component: TemplateComponent, children:
  [
   
    { path: 'approvedTheses', component: ApprovedThesesComponent },
    { path: 'addTheses', component: AddThesisComponent },
    {path: 'myTheses', component:MyThesesComponent},
    {path: 'tickets', component:TicketsComponent},
    {path: '' , redirectTo: '/supervisor/approvedTheses', pathMatch: 'full'}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupervisorRoutingModule { }
