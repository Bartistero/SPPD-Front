import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministratorsComponent } from './components/administrators/administrators.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { ReportsAdminComponent } from './components/reports-admin/reports-admin.component';
import { TemplateComponent } from './components/template/template.component';

const routes: Routes = [
  {path: '', component: TemplateComponent, children:
  [
   
    { path: 'administrators', component: AdministratorsComponent },
    { path: 'departments', component: DepartmentsComponent },
    {path: 'reports', component:ReportsAdminComponent},
    {path: '' , redirectTo: '/admin/departments', pathMatch: 'full'}

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
