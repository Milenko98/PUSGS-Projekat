import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
// import { CoreComponent } from './Components/core/core.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PrijavaComponent } from './Components/prijava/prijava.component';
import { RegistracijaPodaciComponent } from './Components/registracija/registracija-podaci/registracija-podaci.component';
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
