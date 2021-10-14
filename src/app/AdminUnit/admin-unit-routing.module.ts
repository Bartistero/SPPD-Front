import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockedAcountsComponent } from './components/blocked-acounts/blocked-acounts.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TemplateComponent } from './components/template/template.component';
import { ThesesComponent } from './components/theses/theses.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path: '', component: TemplateComponent, children:
  [
   
    { path: 'users', component: UsersComponent },
    { path: 'faculties', component: FacultiesComponent },
    {path: 'theses', component:ThesesComponent},
    {path: 'reports', component:ReportsComponent},
    {path: 'blockedAccounts', component:BlockedAcountsComponent},
    {path: '' , redirectTo: '/adminUnit/users', pathMatch: 'full'}

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUnitRoutingModule { }
