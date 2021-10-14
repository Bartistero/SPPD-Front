import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from '../AdminUnit/components/reports/reports.component';
import { AdministratorsComponent } from './components/administrators/administrators.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { TemplateComponent } from './components/template/template.component';

const routes: Routes = [
  {path: '', component: TemplateComponent, children:
  [
   
    { path: 'administrators', component: AdministratorsComponent },
    { path: 'departments', component: DepartmentsComponent },
    {path: 'reports', component:ReportsComponent},
    {path: '' , redirectTo: '/admin/departments', pathMatch: 'full'}

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
