import { NumberInput } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { tap } from 'rxjs/operators';
import { WorkRequest } from '../Entities/work-request';
import { WorkRequestBasicInfo } from '../Entities/work-request-basic-info';
import { WorkRequestEquipments } from '../Entities/work-request-equipments';
import { WorkRequestHistoryOfChanges } from '../Entities/work-request-history-of-changes';
import { WorkRequestMultimedia } from '../Entities/work-request-multimedia';

@Injectable({
  providedIn: 'root'
})
export class WorkRequestService {

  basicinfos= Array<WorkRequestBasicInfo>();

  createdWorkRequests = new Array<WorkRequest>();
  workrequest = new WorkRequest;
  editedWorkRequest = new WorkRequest;
  editedWorkRequestt = new WorkRequest;
  historyofchanges = new WorkRequestHistoryOfChanges;
  multimedia = new WorkRequestMultimedia;
  workRequestForEdit!: WorkRequest;
  equipments = new Array<WorkRequestEquipments>();
  equipmentsedit = new Array<WorkRequestEquipments>();
  arrayhistory = new Array<WorkRequestHistoryOfChanges>();
  filesEdit:File[];
  pom = new WorkRequestBasicInfo();
  id!: number;
  readonly BaseURI = 'https://localhost:44362/api';

  constructor(private http:HttpClient) {
    console.log("Konstruktor servisa\n"+ JSON.stringify(this.editedWorkRequest));
  }


  AddBasicInfo(wr: WorkRequestBasicInfo, edited: boolean) {
    if (edited == false) {
      this.workrequest.historyofchanges = [];
      this.historyofchanges = new WorkRequestHistoryOfChanges;
      this.historyofchanges.name = wr.createdBy;
      this.historyofchanges.lastname = wr.createdBy;
      this.historyofchanges.dateofchanges = wr.dateTimeCreated;
      this.historyofchanges.status = wr.status;
      this.historyofchanges.id = wr.id;
      this.historyofchanges.BasicInfoId = wr.idd;

      this.workrequest.basicinfo = wr;
      this.workrequest.historyofchanges.push(this.historyofchanges);
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

      this.UpdateBasicInfo(wr).subscribe((res: any) => {
        if (res !== null) {
          console.log("Rezultat updatea:\n"+JSON.stringify(res));
        } else {
        }
      },
      err => {
        console.log('Error!');
        console.log(err);    
      });
    }
  }

  UpdateBasicInfo(wr:WorkRequestBasicInfo){
    return this.http.post(this.BaseURI+'/WorkRequest/ChangeBasicInfo/'+wr.idd, wr);
  }

  GetBasicInfo() {
    let bi = this.http.get(this.BaseURI+'/WorkRequest/GetBasicInfo');
    // let bi = Array<WorkRequestBasicInfo>();
    // this.createdWorkRequests.forEach(element => {
    //   bi.push(element.basicinfo);
    // });
    return bi;
  }

  GetBasicInfoId(id:number) {
    let bi = this.http.get<WorkRequestBasicInfo>(this.BaseURI+'/WorkRequest/GetBasicInfoId/'+id);
    //let bi = Array<WorkRequestBasicInfo>();
    //this.createdWorkRequests.forEach(element => {
      //bi.push(element.basicinfo);
    //});
    return bi;
  }

  getWorkRequestForUpdate(id:number){
    return this.http.get<WorkRequest>(this.BaseURI+'/WorkRequest/GetWorkRequestForUpdate/'+ id);
  }

  getPom(){
    return this.pom;
  }
  GetHystoryOfChanges() {
    let bi = this.http.get(this.BaseURI+'/WorkRequest/GetHystoryOfChanges');
    //let bi = Array<WorkRequestBasicInfo>();
    //this.createdWorkRequests.forEach(element => {
      //bi.push(element.basicinfo);
    //});
    return bi;
  }

  GetMultimedia() {
    let bi = this.http.get(this.BaseURI+'/WorkRequest/GetMultimedia');
    //let bi = Array<WorkRequestBasicInfo>();
    //this.createdWorkRequests.forEach(element => {
      //bi.push(element.basicinfo);
    //});
    return bi;
  }

  GetEquipments() {
    let bi = this.http.get(this.BaseURI+'/WorkRequest/GetEquipments');
    //let bi = Array<WorkRequestBasicInfo>();
    //this.createdWorkRequests.forEach(element => {
      //bi.push(element.basicinfo);
    //});
    return bi;
  }

  AddMultimedia(files: File[], edited: boolean) {
    if (edited == false) {
       this.workrequest.multimedia = [];
      //  this.workrequest.multimedia.files = [];
      //  this.workrequest.multimedia.filename = [];
      files.forEach(element => {
        var wrm = new WorkRequestMultimedia();
        // this.workrequest.multimedia.files.push(element);
        // this.workrequest.multimedia.filename.push(element.name);
        // this.workrequest.multimedia.forEach(element2 => {
        //   // this.workrequest.multimedia. = files;
        //   element2.file = element;
        //   element2.filename = element.name;
        // });
        wrm.file = element;
        wrm.filename = element.name;
        var id 
        //   if(this.createdWorkRequests !== undefined && this.createdWorkRequests[this.createdWorkRequests.length - 1].multimedia !== null && this.createdWorkRequests[this.createdWorkRequests.length - 1].multimedia !== undefined)
        //   var mm = this.createdWorkRequests[this.createdWorkRequests.length - 1].multimedia;
        // //var mm = this.createdWorkRequests[this.createdWorkRequests.length - 1].multimedia!;
        // if(mm.length != 0)
        // {
        //   id = mm[mm.length - 1].id +1;
        // }
        // id = 1;
        wrm.id = Math.floor(Math.random() * 100).toString();
        this.workrequest.multimedia.push(wrm)
        
      });
      console.log("Fajlovi: "+this.workrequest.multimedia)
    }
    else {
      // this.multimedia.files = files;
      // this.editedWorkRequest.multimedia = this.multimedia;
      this.workRequestForEdit.multimedia = [];
      var element = this.createdWorkRequests.find(x => x.basicinfo.id == this.workRequestForEdit.basicinfo.id);
      console.log("ispisi" + "\n");
      console.log(element);
      if (element !== null && element !== undefined) {
        console.log(this.workRequestForEdit);
        files.forEach(element1 => {
          // element.multimedia.forEach(element => {
          //   // if (this.workRequestForEdit.multimedia.files.indexOf(element1) === -1)
          //   // this.workRequestForEdit.multimedia.files.push(element1);
          //   // this.workRequestForEdit.multimedia.filename.push(element1.name);

          //    if (element.file === element1)
          //    element.file = element1;
          //    element.filename = element1.name;
          // });
          var wrm = new WorkRequestMultimedia();
          wrm.file = element1;
          wrm.filename = element1.name;

          this.workRequestForEdit.multimedia.push(wrm)
        });
      }
     // console.log(this.workRequestForEdit.multimedia.filename);
    }
  }

  getFilesEdit(){
    return this.filesEdit;
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
      this.editedWorkRequest.equipments = eq;
      console.log( "Posle dodavanja equipmenta\n"+JSON.stringify(this.editedWorkRequest))
    }
  }

  UpdateWorkRequest(wr: WorkRequest){
    return this.http.post(this.BaseURI + '/WorkRequest/UpdateWorkRequest/'+wr.basicinfo.idd,wr);
  }

  AddWorkRequest(edited: boolean) {
    if (edited == false) {
      console.log("Ispis pre dodavanja");
      console.log(this.workrequest);
      if (this.workrequest.multimedia === undefined) {
        // this.workrequest.multimedia = new WorkRequestMultimedia;
        //  this.workrequest.multimedia.filename = [];
        //  this.workrequest.multimedia.files = [];
      }
      this.createdWorkRequests.push(this.workrequest);
    }
    else {
      this.createdWorkRequests.forEach(element => {
        if (element.basicinfo.id == this.workRequestForEdit.basicinfo.id) {
          element = this.editedWorkRequest;
        }
      });
      

      this.editedWorkRequestt = this.workRequestForEdit;
      console.log("editovan posle equipmenta\n",+ JSON.stringify(this.editedWorkRequest));
      this.UpdateWorkRequest(this.editedWorkRequest).subscribe((res: any) => {
        if (res !== null) {
          console.log("Uspesno updateovan:\n"+ JSON.stringify(res));
          //this.workRequestForEdit = res;
          //console.log("Prihvacen wr za update:\n"+ JSON.stringify(this.workRequestForEdit));
        } else {
        }
      },
      err => {
        console.log('Error!');
        console.log(err);    
      });
      this.editedWorkRequest = new WorkRequest;
    }
  }

  AddWorkRequestDB()
  {
    return this.http.post(this.BaseURI + '/WorkRequest/AddWorkRequest', this.workrequest);
  }

  // ChangeWorkRequest(wr: WorkRequest)
  // {
  //   var temp = new WorkRequest;
  //   this.createdWorkRequests.forEach(element => {
  //     if(element.basicinfo.id == wr.basicinfo.id)
  //     temp = element;
  //   });
  //   console.log("Ispis pre izmene: "+ JSON.stringify(temp));
  //   return this.http.put(this.BaseURI + '/WorkRequest/ChangeWorkRequest', temp);
  // }

  CallEdit(id: string) {
    // this.createdWorkRequests.forEach(element => {
    //   if (element.basicinfo.id == id) {
    //     this.workRequestForEdit = element;
    //   }
    // });
    //console.log(JSON.stringify(this.createdWorkRequests));
    this.getWorkRequestForUpdate(this.pom.idd).subscribe((res: any) => {
      if (res !== null) {
        console.log("dobavljeni wr za update:\n"+ JSON.stringify(res));
        this.workRequestForEdit = res;
        console.log("Prihvacen wr za update:\n"+ JSON.stringify(this.workRequestForEdit));
      } else {
      }
    },
    err => {
      console.log('Error!');
      console.log(err);    
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

  GetHistory(id: number) {
    let historys = new Array<WorkRequestHistoryOfChanges>();
    this.workRequestForEdit.historyofchanges.forEach(element => {
      if (element.idd == id) {
        historys.push(element);
      }
    });
    console.log("Ispis istorije pri editu:"+ JSON.stringify(historys));
    return historys;
  }

  AddHistoryOnDocument(his: WorkRequestHistoryOfChanges){
    return this.http.post(this.BaseURI + '/WorkRequest/AddHistory', his);
  }

  onApprove(id: number) {
    let changedHistory = new WorkRequestHistoryOfChanges();
    let temp = Array<WorkRequestHistoryOfChanges>();
    this.arrayhistory.forEach(element => {
      if(element.idd == id){
        temp.push(element);
      }
    });
    //console.log("istorijaaa:"+ JSON.stringify(this.workRequestForEdit.historyofchanges));
    if(this.workRequestForEdit.historyofchanges[this.workRequestForEdit.historyofchanges.length -1].status !== "Canceled"){
      changedHistory = Object.assign({},this.workRequestForEdit.historyofchanges[this.workRequestForEdit.historyofchanges.length - 1],{status:"Approved"});
      this.workRequestForEdit.historyofchanges.push(changedHistory);
      console.log("istorijaaa:"+ JSON.stringify(this.workRequestForEdit.historyofchanges));
      this.AddHistoryOnDocument(changedHistory).subscribe((res: any) => {
        if (res !== null) {
          console.log("Uspesno dodata istorija");
        } else {
        }
      },
      err => {
        console.log('Error!');
        console.log(err);    
      });
    } 
    //console.log("ffff"+ JSON.stringify(this.workRequestForEdit.historyofchanges));       
  }

  onDeny(id: number) {
    let changedHistory = new WorkRequestHistoryOfChanges();
    let temp = Array<WorkRequestHistoryOfChanges>();
    this.arrayhistory.forEach(element => {
      if(element.idd == id){
        temp.push(element);
      }
    });
    if(temp[temp.length -1].status !== "Canceled" && temp[temp.length -1].status !== "Approved"){
      changedHistory = Object.assign({},temp[temp.length - 1],{status:"Denied"});
      this.arrayhistory.push(changedHistory);
    }   
  }

  onCancel(id: number) {
    let changedHistory = new WorkRequestHistoryOfChanges();
    let temp = Array<WorkRequestHistoryOfChanges>();
    this.arrayhistory.forEach(element => {
      if(element.idd == id){
        temp.push(element);
      }
    });
    if(temp[temp.length -1].status !== "Approved"){
      changedHistory = Object.assign({},temp[temp.length - 1],{status:"Canceled"});
      this.arrayhistory.push(changedHistory);
    }    
  }

  TransferId(id: number) {
    this.id = id;
  }

  GetId() {
    return this.id;
  }
}
