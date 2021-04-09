import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPrijavaComponent } from './Components/prijava/header-prijava/header-prijava.component';
import { BodyPrijavaComponent } from './Components/prijava/body-prijava/body-prijava.component';
import { LoginPrijavaComponent } from './Components/prijava/login-prijava/login-prijava.component';
import { HeaderComponent } from './Components/core/header/header.component';
import { FooterComponent } from './Components/core/footer/footer.component';
import { SidebarComponent } from './Components/core/sidebar/sidebar.component';
import { PrijavaComponent } from './Components/prijava/prijava.component';
import { CoreComponent } from './Components/core/core.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MyIncidentsComponent } from './Components/dashboard/my-incidents/my-incidents.component';
import { MyWorkPlansComponent } from './Components/dashboard/my-work-plans/my-work-plans.component';
import { MySafetyDocsComponent } from './Components/dashboard/my-safety-docs/my-safety-docs.component';
import { DocumentsPieComponent } from './Components/dashboard/documents-pie/documents-pie.component';
import { RegistracijaComponent } from './Components/registracija/registracija.component';
import { RegistracijaPodaciComponent } from './Components/registracija/registracija-podaci/registracija-podaci.component';
import {ReactiveFormsModule} from '@angular/forms';
import { DocumentsComponent } from './Components/documents/documents.component';
import { DocumentsCoreComponent } from './Components/documents/documents-core/documents-core.component';
import { PlanRadaComponent } from './Components/documents/plan-rada/plan-rada.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPrijavaComponent,
    BodyPrijavaComponent,
    LoginPrijavaComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    PrijavaComponent,
    CoreComponent,
    DashboardComponent,
    MyIncidentsComponent,
    MyWorkPlansComponent,
    MySafetyDocsComponent,
    DocumentsPieComponent,
    RegistracijaComponent,
    RegistracijaPodaciComponent,
    DocumentsComponent,
    DocumentsCoreComponent,
    PlanRadaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
