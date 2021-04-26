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
import { SafetyDocumentsComponent } from './Components/documents/safety-documents/safety-documents.component';
import { NewSafetyDocsComponent } from './Components/documents/safety-documents/new-safety-docs/new-safety-docs.component';
import { BasicInfoComponent } from './Components/documents/safety-documents/new-safety-docs/basic-info/basic-info.component';
import { DugmadiOpcijeComponent } from './Components/documents/plan-rada/dugmadi-opcije/dugmadi-opcije.component';
import { TabelaPlanovaRadaComponent } from './Components/documents/plan-rada/tabela-planova-rada/tabela-planova-rada.component';
import { SwitchingPlanNewComponent } from './Components/documents/plan-rada/switching-plan-new/switching-plan-new.component';
import { StatusniBarComponent } from './Components/documents/plan-rada/switching-plan-new/statusni-bar/statusni-bar.component';
import { UnosPodatakaComponent } from './Components/documents/plan-rada/switching-plan-new/unos-podataka/unos-podataka.component';
import { WorkRequestComponent } from './Components/documents/work-request/work-request.component';
import { TableButtonsComponent } from './Components/documents/work-request/table-buttons/table-buttons.component';
import { TableComponent } from './Components/documents/work-request/table/table.component';
import { WorkRequestNewComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-new.component';
import { WorkRequestMenuComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/work-request-menu.component';
import { WrBasicInfoComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/wr-basic-info/wr-basic-info.component';
import { WrHistoryOfStateChangesComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/wr-history-of-state-changes/wr-history-of-state-changes.component';
import { WrMultimediaComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/wr-multimedia/wr-multimedia.component';
import { WrEquipmentComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/wr-equipment/wr-equipment.component';
import { SwHistoryOfStateChangesComponent } from './Components/documents/plan-rada/switching-plan-new/sw-history-of-state-changes/sw-history-of-state-changes.component';
import { SwMultimediaAttachmentsComponent } from './Components/documents/plan-rada/switching-plan-new/sw-multimedia-attachments/sw-multimedia-attachments.component';
import { SwEquipmentComponent } from './Components/documents/plan-rada/switching-plan-new/sw-equipment/sw-equipment.component';
import { SwSwitchingInstructionsComponent } from './Components/documents/plan-rada/switching-plan-new/sw-switching-instructions/sw-switching-instructions.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { SideBarNotificationComponent } from './Components/notification/side-bar-notification/side-bar-notification.component';
import { AllNotificationsComponent } from './Components/notification/all-notifications/all-notifications.component';
import { UnreadNotificationsComponent } from './Components/notification/unread-notifications/unread-notifications.component';
import { InfoNotificationsComponent } from './Components/notification/info-notifications/info-notifications.component';
import { ErrorNotificationsComponent } from './Components/notification/error-notifications/error-notifications.component';
import { SuccessNotificationsComponent } from './Components/notification/success-notifications/success-notifications.component';
import { WarningNotificationsComponent } from './Components/notification/warning-notifications/warning-notifications.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MapComponent } from './Components/map/map.component';
import { TeamsComponent } from './Components/teams/teams.component';
import {MatIconModule} from '@angular/material/icon';
import { NewTeamComponent } from './Components/teams/new-team/new-team.component';


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
    SafetyDocumentsComponent,
    NewSafetyDocsComponent,
    BasicInfoComponent,
    DugmadiOpcijeComponent,
    TabelaPlanovaRadaComponent,
    SwitchingPlanNewComponent,
    StatusniBarComponent,
    UnosPodatakaComponent,
    WorkRequestComponent,
    TableButtonsComponent,
    TableComponent,
    WorkRequestNewComponent,
    WorkRequestMenuComponent,
    WrBasicInfoComponent,
    WrHistoryOfStateChangesComponent,
    WrMultimediaComponent,
    WrEquipmentComponent,
    SwHistoryOfStateChangesComponent,
    SwMultimediaAttachmentsComponent,
    SwEquipmentComponent,
    SwSwitchingInstructionsComponent,
    NotificationComponent,
    SideBarNotificationComponent,
    AllNotificationsComponent,
    UnreadNotificationsComponent,
    InfoNotificationsComponent,
    ErrorNotificationsComponent,
    SuccessNotificationsComponent,
    WarningNotificationsComponent,
    MapComponent,
    TeamsComponent,
    NewTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
