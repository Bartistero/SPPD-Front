import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './unLoggedUser/components/about/about.component';
import { ApprovedThesisesComponent } from './unLoggedUser/components/approved-thesises/approved-thesises.component';
import { LoginPageComponent } from './unLoggedUser/components/login-page/login-page.component';

const routes: Routes = [ 
  { path: '', redirectTo: 'about', pathMatch: 'full' },
{ path: 'about', component: AboutComponent},
{ path: 'approvedThesises', component: ApprovedThesisesComponent},

{ path: 'login', component: LoginPageComponent},
{ path: 'admin',
loadChildren: () => import('./Admin/admin.module').then((m) => m.AdminModule)},
{ path: 'adminUnit',
loadChildren: () => import('./AdminUnit/admin-unit.module').then((m) => m.AdminUnitModule)},
{ path: 'candidate',
loadChildren: () => import('./Candidate/candidate.module').then((m) => m.CandidateModule)},
{ path: 'supervisor',
loadChildren: () => import('./Supervisor/supervisor.module').then((m) => m.SupervisorModule)},
];


 

  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
