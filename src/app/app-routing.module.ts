import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivationPageComponent } from './shared/components/activation-page/activation-page.component';
import { AboutComponent } from './unLoggedUser/components/about/about.component';
import { ApprovedThesisesComponent } from './unLoggedUser/components/approved-thesises/approved-thesises.component';
import { LoginPageComponent } from './unLoggedUser/components/login-page/login-page.component';

import { AuthorizeGuard } from './_guards/authorize.guard';
import { UnLoggedGuard } from './_guards/un-logged.guard';

const routes: Routes = [ 
{ path: '', redirectTo: 'about', pathMatch: 'full' },
{path:'email/activate', component:ActivationPageComponent,canActivate: [UnLoggedGuard]},
{ path: 'about', component: AboutComponent,canActivate: [UnLoggedGuard]
},
{ path: 'approvedThesises', component: ApprovedThesisesComponent,canActivate: [UnLoggedGuard]
},

{ path: 'login', component: LoginPageComponent,canActivate: [UnLoggedGuard]
},
{ path: 'admin',canActivate: [AuthorizeGuard]
,
data: {
  permission: 'SUPER_ADMIN'
},
loadChildren: () => import('./Admin/admin.module').then((m) => m.AdminModule)},
{ path: 'adminUnit',canActivate: [AuthorizeGuard]
,
data: {
  permission: 'ADMIN'
},
loadChildren: () => import('./AdminUnit/admin-unit.module').then((m) => m.AdminUnitModule)},
{ path: 'candidate',canActivate: [AuthorizeGuard]
,
data: {
  permission: 'STUDENT'
},
loadChildren: () => import('./Candidate/candidate.module').then((m) => m.CandidateModule)},
{ path: 'supervisor',canActivate: [AuthorizeGuard]
,
data: {
  permission: 'LECTURER'
},
loadChildren: () => import('./Supervisor/supervisor.module').then((m) => m.SupervisorModule)},
];


 

  


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
