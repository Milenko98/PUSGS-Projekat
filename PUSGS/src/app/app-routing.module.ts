import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
// import { CoreComponent } from './Components/core/core.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { DocumentsCoreComponent } from './Components/documents/documents-core/documents-core.component';
import { PlanRadaComponent } from './Components/documents/plan-rada/plan-rada.component';
import { SwitchingPlanNewComponent } from './Components/documents/plan-rada/switching-plan-new/switching-plan-new.component';
import { UnosPodatakaComponent } from './Components/documents/plan-rada/switching-plan-new/unos-podataka/unos-podataka.component';
import { BasicInfoComponent } from './Components/documents/safety-documents/new-safety-docs/basic-info/basic-info.component';
import { NewSafetyDocsComponent } from './Components/documents/safety-documents/new-safety-docs/new-safety-docs.component';
import { SafetyDocumentsComponent } from './Components/documents/safety-documents/safety-documents.component';
import { WrBasicInfoComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/wr-basic-info/wr-basic-info.component';
import { WrHistoryOfStateChangesComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/wr-history-of-state-changes/wr-history-of-state-changes.component';
import { WorkRequestNewComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-new.component';
import { WorkRequestComponent } from './Components/documents/work-request/work-request.component';
import { PrijavaComponent } from './Components/prijava/prijava.component';
import { RegistracijaComponent } from './Components/registracija/registracija.component';
import {ActivatedRoute} from '@angular/router';
import { WrMultimediaComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/wr-multimedia/wr-multimedia.component';
import { WrEquipmentComponent } from './Components/documents/work-request/table-buttons/work-request-new/work-request-menu/wr-equipment/wr-equipment.component';
import { SwHistoryOfStateChangesComponent } from './Components/documents/plan-rada/switching-plan-new/sw-history-of-state-changes/sw-history-of-state-changes.component';
import { SwMultimediaAttachmentsComponent } from './Components/documents/plan-rada/switching-plan-new/sw-multimedia-attachments/sw-multimedia-attachments.component';
import { SwEquipmentComponent } from './Components/documents/plan-rada/switching-plan-new/sw-equipment/sw-equipment.component';
import { SwSwitchingInstructionsComponent } from './Components/documents/plan-rada/switching-plan-new/sw-switching-instructions/sw-switching-instructions.component';
import { NotificationComponent } from './Components/notification/notification.component';
import { AllNotificationsComponent } from './Components/notification/all-notifications/all-notifications.component';
import { UnreadNotificationsComponent } from './Components/notification/unread-notifications/unread-notifications.component';
import { InfoNotificationsComponent } from './Components/notification/info-notifications/info-notifications.component';
import { ErrorNotificationsComponent } from './Components/notification/error-notifications/error-notifications.component';
import { SuccessNotificationsComponent } from './Components/notification/success-notifications/success-notifications.component';
import { WarningNotificationsComponent } from './Components/notification/warning-notifications/warning-notifications.component';
import { MapComponent } from './Components/map/map.component';
import { TeamsComponent } from './Components/teams/teams.component';
import { NewTeamComponent } from './Components/teams/new-team/new-team.component';

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
  path: "Notifications",
  component: NotificationComponent,

  children:[
    {
    path: "AllNotifications",
    component: AllNotificationsComponent

    },

    {
      path: "UnreadNotifications",
      component: UnreadNotificationsComponent
    },

    {

      path: "InfoNotifications",
      component: InfoNotificationsComponent

    },

    {
      path: "ErrorNotifications",
      component: ErrorNotificationsComponent
    },

    {
      path: "SuccessNotifications",
      component: SuccessNotificationsComponent
    },

    {
      path: "WarningNotifications",
      component: WarningNotificationsComponent
    }
  ]
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

{
  path: "safetyDocs",
  component: SafetyDocumentsComponent
},

{
  path: "newSafetyDocs",
  component: NewSafetyDocsComponent
},

{
  path: "basicInfo",
  component: BasicInfoComponent
},

{
  path: "SwitchingPlanNew",
  component: SwitchingPlanNewComponent,

  children:[
    {
    path: "BasicInformations",
    component: UnosPodatakaComponent

    },

    {
      path: "swHistoryOfStateChanges",
    component: SwHistoryOfStateChangesComponent
    },

    {
      path: "swMiltimediaAttachments",
      component: SwMultimediaAttachmentsComponent
    },

    {
      path: "swEquipment",
      component: SwEquipmentComponent
    },

    {
      path: "swSwitchingInstructions",
      component: SwSwitchingInstructionsComponent
    }
  ]


},



{
  path: "workRequest",
  component: WorkRequestComponent,

  children:[
  ]
},

{
  path: "WorkRequestNew",
  component: WorkRequestNewComponent,
  children:[
    {
      path: "wrHistoryOfStateChanges",
      component: WrHistoryOfStateChangesComponent
    },
    {
      path: "wrBasicInfo",
      component: WrBasicInfoComponent
    },
    {
      path: "wrMultimedia",
      component: WrMultimediaComponent
    },
    {
      path: "wrEquipment",
      component: WrEquipmentComponent
    }
  ]
},

{
  path: "map",
  component: MapComponent
},

{
  path: "teams",
  component: TeamsComponent
},
{
  path: "NewTeam",
  component: NewTeamComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
