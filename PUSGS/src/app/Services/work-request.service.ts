import { Injectable } from '@angular/core';
import { WorkRequest } from '../Entities/work-request';
import { WorkRequestBasicInfo } from '../Entities/work-request-basic-info';
import { WorkRequestEquipments } from '../Entities/work-request-equipments';
import { WorkRequestHistoryOfChanges } from '../Entities/work-request-history-of-changes';
import { WorkRequestMultimedia } from '../Entities/work-request-multimedia';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestService {

  createdWorkRequests = new Array<WorkRequest>();
  workrequest = new WorkRequest;
  editedWorkRequest = new WorkRequest;
  historyofchanges = new WorkRequestHistoryOfChanges;
  multimedia = new WorkRequestMultimedia;
  workRequestForEdit!: WorkRequest;
  equipments = new Array<WorkRequestEquipments>();
  equipmentsedit = new Array<WorkRequestEquipments>();
  arrayhistory = new Array<WorkRequestHistoryOfChanges>();
  id!: string;

  constructor() { }


  AddBasicInfo(wr: WorkRequestBasicInfo, edited: boolean) {
    if (edited == false) {
      this.historyofchanges = new WorkRequestHistoryOfChanges;
      this.historyofchanges.name = wr.createdBy;
      this.historyofchanges.lastname = wr.createdBy;
      this.historyofchanges.dateofchanges = wr.dateTimeCreated;
      this.historyofchanges.status = wr.status;
      this.historyofchanges.id = wr.id;

      this.workrequest.basicinfo = wr;
      this.workrequest.historyofchanges = this.historyofchanges;
      this.arrayhistory.push(this.historyofchanges);
    }
    else {
      // this.historyofchanges.name = wr.createdBy;
      // this.historyofchanges.lastname = wr.createdBy;
      // this.historyofchanges.dateofchanges = wr.dateTimeCreated;
      // this.historyofchanges.status = wr.status;

      this.editedWorkRequest.basicinfo = wr;
      // this.editedWorkRequest.historyofchanges = this.historyofchanges;
      this.createdWorkRequests.forEach(element => {
        if (element.basicinfo.id == this.workRequestForEdit.basicinfo.id) {
          element.basicinfo = this.editedWorkRequest.basicinfo;
        }
      });
    }
  }

  GetBasicInfo() {
    let bi = Array<WorkRequestBasicInfo>();
    this.createdWorkRequests.forEach(element => {
      bi.push(element.basicinfo);
    });
    return bi;
  }

  AddMultimedia(files: File[], edited: boolean) {
    if (edited == false) {
      this.workRequestForEdit.multimedia = new WorkRequestMultimedia;
      this.workRequestForEdit.multimedia.files = [];
      files.forEach(element => {
        this.workrequest.multimedia.files.push(element);
      });
    }
    else {
      // this.multimedia.files = files;
      // this.editedWorkRequest.multimedia = this.multimedia;
      var element = this.createdWorkRequests.find(x => x.basicinfo.id == this.workRequestForEdit.basicinfo.id);
      console.log("ispisi" + "\n");
      console.log(element);
      if (element !== null && element !== undefined) {
        console.log(this.workRequestForEdit);
        files.forEach(element1 => {
          if (this.workRequestForEdit.multimedia.files.indexOf(element1) === -1)
            this.workRequestForEdit.multimedia.files.push(element1);
        });
      }
    }
  }

  OcistiObjekat() {
    this.workrequest = new WorkRequest;
    this.editedWorkRequest = new WorkRequest;
  }

  GetAllWorkRequests() {
    return this.createdWorkRequests;
  }

  GetCurrentWorkRequest(edited: boolean) {
    if (edited == true)
      return this.editedWorkRequest;
    return this.workrequest;
  }

  AddEquipments(eq: Array<WorkRequestEquipments>, edited: boolean) {
    if (edited == false) {
      this.workrequest.equipments = eq;
    }
    else {
      this.createdWorkRequests.forEach(element => {
        if (element.basicinfo.id == this.workRequestForEdit.basicinfo.id) {
          element.equipments = eq;
        }
      });
    }
  }

  AddWorkRequest(edited: boolean) {
    if (edited == false) {
      console.log("Ispis pre dodavanja");
      console.log(this.workrequest);
      if (this.workrequest.multimedia === undefined) {
        this.workrequest.multimedia = new WorkRequestMultimedia;
        this.workrequest.multimedia.files = [];
      }
      this.createdWorkRequests.push(this.workrequest);
    }
    else {
      this.createdWorkRequests.forEach(element => {
        if (element.basicinfo.id == this.workRequestForEdit.basicinfo.id) {
          element = this.editedWorkRequest;
        }
      });
      this.editedWorkRequest = new WorkRequest;
    }
  }

  CallEdit(id: string) {
    this.createdWorkRequests.forEach(element => {
      if (element.basicinfo.id == id) {
        this.workRequestForEdit = element;
      }
    });
    return this.workRequestForEdit;
  }

  GetWorkRequestForEdit() {
    return this.workRequestForEdit;
  }

  OcistiWorkRequestForEdit() {
    this.workRequestForEdit = null;
  }

  AddInHistory(his: WorkRequestHistoryOfChanges) {
    this.arrayhistory.push(his);
  }

  GetHistory(id: string) {
    let historys = new Array<WorkRequestHistoryOfChanges>();
    this.arrayhistory.forEach(element => {
      if (element.id == id) {
        historys.push(element);
      }
    });
    return historys;
  }

  onApprove(id: string) {
    this.arrayhistory.forEach(element => {
      if (element.id == id) {
        element.status = "Approved";
      }
    });
  }

  onDeny(id: string) {
    this.arrayhistory.forEach(element => {
      if (element.id == id) {
        element.status = "Denied";
      }
    });
  }

  onCancel(id: string) {
    this.arrayhistory.forEach(element => {
      if (element.id == id) {
        element.status = "Canceled";
      }
    });
  }

  TransferId(id: string) {
    this.id = id;
  }

  GetId() {
    return this.id;
  }
}
