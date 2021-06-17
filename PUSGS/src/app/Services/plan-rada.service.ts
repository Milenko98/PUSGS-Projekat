import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanRada } from '../Entities/plan-rada';
import { PlanRadaBasicInfo } from '../Entities/plan-rada-basic-info';
import { PlanRadaEquipments } from '../Entities/plan-rada-equipment';
import { PlanRadaHistoryOfChanges } from '../Entities/plan-rada-history-of-changes';
import { PlanRadaMultimedia } from '../Entities/plan-rada-multimedia';

@Injectable({
  providedIn: 'root'
})


export class PlanRadaService {


  createdPlanRada = new Array<PlanRada>();
  planrada = new PlanRada;
  editedPlanRada = new PlanRada;
  historyofchanges = new PlanRadaHistoryOfChanges;
  multimedia = new PlanRadaMultimedia;
  planRadaForEdit!: PlanRada;
  equipments = new Array<PlanRadaEquipments>();
  equipmentsedit = new Array<PlanRadaEquipments>();
  arrayhistory = new Array<PlanRadaHistoryOfChanges>();
  id!: string;

  constructor(private http:HttpClient) { }

  AddBasicInfo(pl: PlanRadaBasicInfo, edited: boolean) {
    if (edited == false) {
      this.historyofchanges = new PlanRadaHistoryOfChanges;
      this.historyofchanges.name = pl.createdBy;
      this.historyofchanges.lastname = pl.createdBy;
      this.historyofchanges.dateofchanges = pl.dateTimeCreated;
      this.historyofchanges.status = pl.status;
      this.historyofchanges.id = pl.id;

      this.planrada.basicinfo = pl;
      this.planrada.historyofchanges = this.historyofchanges;
      this.arrayhistory.push(this.historyofchanges);
    }
    else {
      // this.historyofchanges.name = wr.createdBy;
      // this.historyofchanges.lastname = wr.createdBy;
      // this.historyofchanges.dateofchanges = wr.dateTimeCreated;
      // this.historyofchanges.status = wr.status;

      this.editedPlanRada.basicinfo = pl;
      // this.editedWorkRequest.historyofchanges = this.historyofchanges;
      this.createdPlanRada.forEach(element => {
        if (element.basicinfo.id == this.planRadaForEdit.basicinfo.id) {
          element.basicinfo = this.editedPlanRada.basicinfo;
        }
      });
    }
  }

  GetBasicInfo() {
    let bi = Array<PlanRadaBasicInfo>();
    this.createdPlanRada.forEach(element => {
      bi.push(element.basicinfo);
    });
    return bi;
  }

  AddMultimedia(files: File[], edited: boolean) {
    if (edited == false) {
      this.planrada.multimedia = new PlanRadaMultimedia;
      this.planrada.multimedia.files = [];
      files.forEach(element => {
        this.planrada.multimedia.files.push(element);
      });
    }
    else {
      // this.multimedia.files = files;
      // this.editedWorkRequest.multimedia = this.multimedia;
      var element = this.createdPlanRada.find(x => x.basicinfo.id == this.planRadaForEdit.basicinfo.id);
      console.log("ispisi" + "\n");
      console.log(element);
      if (element !== null && element !== undefined) {
        console.log(this.planRadaForEdit);
        files.forEach(element1 => {
          if (this.planRadaForEdit.multimedia.files.indexOf(element1) === -1)
            this.planRadaForEdit.multimedia.files.push(element1);
        });
      }
    }
  }

  OcistiObjekat() {
    this.planrada = new PlanRada;
    this.editedPlanRada = new PlanRada;
  }

  GetAllPlanRada() {
    return this.createdPlanRada;
  }

  GetCurrentPlanRada(edited: boolean) {
    if (edited == true)
      return this.editedPlanRada;
    return this.planrada;
  }

  AddEquipments(eq: Array<PlanRadaEquipments>, edited: boolean) {
    if (edited == false) {
      this.planrada.equipments = eq;
    }
    else {
      this.createdPlanRada.forEach(element => {
        if (element.basicinfo.id == this.planRadaForEdit.basicinfo.id) {
          element.equipments = eq;
        }
      });
    }
  }

  AddPlanRada(edited: boolean) {
    if (edited == false) {
      console.log("Ispis pre dodavanja");
      console.log(this.planrada);
      if (this.planrada.multimedia === undefined) {
        this.planrada.multimedia = new PlanRadaMultimedia;
        this.planrada.multimedia.files = [];
      }
      this.createdPlanRada.push(this.planrada);
    }
    else {
      this.createdPlanRada.forEach(element => {
        if (element.basicinfo.id == this.planRadaForEdit.basicinfo.id) {
          element = this.editedPlanRada;
        }
      });
      this.editedPlanRada = new PlanRada;
    }
  }

  CallEdit(id: string) {
    this.createdPlanRada.forEach(element => {
      if (element.basicinfo.id == id) {
        this.planRadaForEdit = element;
      }
    });
    return this.planRadaForEdit;
  }

  GetPlanRadaForEdit() {
    return this.planRadaForEdit;
  }

  OcistiPlanRadaForEdit() {
    this.planRadaForEdit = null;
  }

  AddInHistory(his: PlanRadaHistoryOfChanges) {
    this.arrayhistory.push(his);
  }

  GetHistory(id: string) {
    let historys = new Array<PlanRadaHistoryOfChanges>();
    this.arrayhistory.forEach(element => {
      if (element.id == id) {
        historys.push(element);
      }
    });
    return historys;
  }


  onApprove(id: string) {
    let changedHistory = new PlanRadaHistoryOfChanges();
    if(this.arrayhistory[this.arrayhistory.length -1].status !== "Canceled"){
      changedHistory = Object.assign({},this.arrayhistory[this.arrayhistory.length - 1],{status:"Approved"});
      this.arrayhistory.push(changedHistory);
    }        
  }


  onDeny(id: string) {
    let changedHistory = new PlanRadaHistoryOfChanges();
    if(this.arrayhistory[this.arrayhistory.length -1].status !== "Canceled" && this.arrayhistory[this.arrayhistory.length -1].status !== "Approved"){
      changedHistory = Object.assign({},this.arrayhistory[this.arrayhistory.length - 1],{status:"Denied"});
      this.arrayhistory.push(changedHistory);
    }   
  }


  onCancel(id: string) {
    let changedHistory = new PlanRadaHistoryOfChanges();
    if(this.arrayhistory[this.arrayhistory.length -1].status !== "Approved"){
      changedHistory = Object.assign({},this.arrayhistory[this.arrayhistory.length - 1],{status:"Canceled"});
      this.arrayhistory.push(changedHistory);
    }    
  }

  TransferId(id: string) {
    this.id = id;
  }

  GetId() {
    return this.id;
  }

}