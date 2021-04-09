import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
// import { CoreComponent } from './Components/core/core.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DocumentsCoreComponent } from './Components/documents/documents-core/documents-core.component';
import { PlanRadaComponent } from './Components/documents/plan-rada/plan-rada.component';
import { PrijavaComponent } from './Components/prijava/prijava.component';
import { RegistracijaComponent } from './Components/registracija/registracija.component';

const routes: Routes = [ {
  path: "",
  redirectTo: "/login",
  pathMatch: 'full'
},
{
  path: "login",
  component: PrijavaComponent
},

{
  path: "dashboard",
  component: DashboardComponent
},

{
  path: "registration",
  component: RegistracijaComponent
},

{
  path: "documents",
  component: DocumentsCoreComponent
},

{
  path: "planRada",
  component: PlanRadaComponent
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
