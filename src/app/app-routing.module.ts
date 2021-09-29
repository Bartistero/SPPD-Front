import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './unLoggedUser/components/about/about.component';
import { ApprovedThesisesComponent } from './unLoggedUser/components/approved-thesises/approved-thesises.component';
import { LoginPageComponent } from './unLoggedUser/components/login-page/login-page.component';

const routes: Routes = [ { path: '', redirectTo: 'about', pathMatch: 'full' },
{ path: 'about', component: AboutComponent},
{ path: 'approvedThesises', component: ApprovedThesisesComponent},

{ path: 'login', component: LoginPageComponent,}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
