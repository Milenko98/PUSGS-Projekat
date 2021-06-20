import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { WorkRequestBasicInfo } from 'src/app/Entities/work-request-basic-info';
import { WorkRequestService } from 'src/app/Services/work-request.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wr-basic-info',
  templateUrl: './wr-basic-info.component.html',
  styleUrls: ['./wr-basic-info.component.css']
})
export class WrBasicInfoComponent implements OnInit {

  courseForm!: FormGroup;
  typeofWorks =new Array<string>();
  basicinfo = Array<WorkRequestBasicInfo>();
  types = new Array<string>();
  incidents = new Array<string>();
  createdWR = new WorkRequestBasicInfo();
  date!: Date;
  adresses = new Array<string>();
  edited = false;

  constructor(private fb:FormBuilder, public datepipe: DatePipe, private wrService: WorkRequestService, private router: Router, private toastr: ToastrService) { }
  workRequestForEdit = this.wrService.GetWorkRequestForEdit();
  pom = this.wrService.getPom();

  ngOnInit(): void {
    this.typeofWorks.push('popravak','obilazak');
    this.types.push('planirani', 'neplanirani');
    this.incidents.push('inc1','inc2','inc3');
    this.adresses.push('Bulevar Cara Lazara 12', 'Vojvode Misica 29', 'Bulevar oslobodjenja 3');
    this.initForm();
  }

  private initForm() {
    this.courseForm = this.fb.group({
      selectType: new FormControl('', Validators.required),
      status: new FormControl(''),
      selectIncident: new FormControl(''),
      selectTypeofWork: new FormControl('', Validators.required),
      startdate: new FormControl('', Validators.required),
      enddate : new FormControl('', Validators.required),
      createdBy: new FormControl(''),
      emergencyWork: new FormControl(''),
      company: new FormControl('', Validators.required),
      phonenum: new FormControl('', Validators.required),
      datecreated: new FormControl(Date.now.toString()),
      purpose: new FormControl('', Validators.required),
      details: new FormControl(''),
      notes: new FormControl(''),
      selectAdress: new FormControl('', Validators.required)
    });
    if(this.workRequestForEdit != null){
      if(!(this.pom && (Object.keys(this.pom).length === 0))){
      this.courseForm.get('selectType').setValue(this.workRequestForEdit.basicinfo.type);
      this.courseForm.get('status').setValue(this.workRequestForEdit.basicinfo.status);
      this.courseForm.get('selectIncident').setValue(this.workRequestForEdit.basicinfo.incident);
      this.courseForm.get('selectTypeofWork').setValue(this.workRequestForEdit.basicinfo.typeOfWork);
      this.courseForm.get('startdate').setValue(this.workRequestForEdit.basicinfo.startDateTime);
      this.courseForm.get('enddate').setValue(this.workRequestForEdit.basicinfo.endDateTime);
      this.courseForm.get('emergencyWork').setValue(this.workRequestForEdit.basicinfo.emergencyWork);
      this.courseForm.get('company').setValue(this.workRequestForEdit.basicinfo.company);
      this.courseForm.get('phonenum').setValue(this.workRequestForEdit.basicinfo.phoneNum);
      this.courseForm.get('datecreated').setValue(this.workRequestForEdit.basicinfo.dateTimeCreated);
      this.courseForm.get('status').setValue(this.workRequestForEdit.basicinfo.status);
      this.courseForm.get('createdBy').setValue(this.workRequestForEdit.basicinfo.createdBy);
      this.courseForm.get('details').setValue(this.workRequestForEdit.basicinfo.details);
      this.courseForm.get('notes').setValue(this.workRequestForEdit.basicinfo.notes);
      this.courseForm.get('selectAdress').setValue(this.workRequestForEdit.basicinfo.adress);
      this.courseForm.get('purpose').setValue(this.workRequestForEdit.basicinfo.purpose);
      // console.log("Jebo majku vise: \n"+JSON.stringify(this.pom));
      // this.courseForm.get('selectType').setValue(this.pom.type);
      // this.courseForm.get('status').setValue(this.pom.status);
      // this.courseForm.get('selectIncident').setValue(this.pom.incident);
      // this.courseForm.get('selectTypeofWork').setValue(this.pom.typeOfWork);
      // this.courseForm.get('startdate').setValue(this.pom.startDateTime);
      // this.courseForm.get('enddate').setValue(this.pom.endDateTime);
      // this.courseForm.get('emergencyWork').setValue(this.pom.emergencyWork);
      // this.courseForm.get('company').setValue(this.pom.company);
      // this.courseForm.get('phonenum').setValue(this.pom.phoneNum);
      // this.courseForm.get('datecreated').setValue(this.pom.dateTimeCreated);
      // this.courseForm.get('status').setValue(this.pom.status);
      // this.courseForm.get('createdBy').setValue(this.pom.createdBy);
      // this.courseForm.get('details').setValue(this.pom.details);
      // this.courseForm.get('notes').setValue(this.pom.notes);
      // this.courseForm.get('selectAdress').setValue(this.pom.adress);
      // this.courseForm.get('purpose').setValue(this.pom.purpose);
      }
    }
    else
    {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'dd-MM-yyyy');
    this.courseForm.get('status').setValue('Draft');
    this.courseForm.get('createdBy').setValue('Milenko Pjaca');
    this.courseForm.get('datecreated').setValue(latest_date);
    }
  }

  onSubmit(){

    this.wrService.GetBasicInfo().subscribe(
      (res: any) => {
        if (res != null) {
  
          this.basicinfo =  new Array<WorkRequestBasicInfo>();  
  
          res.forEach(element => {

            this.basicinfo.push(element);
            
          });
         
        } else {
        }
      },
      err => {
        console.log('greska');
        console.log(err);
    });
     //this.basicinfo = this.wrService.GetBasicInfo()!;
    if(this.workRequestForEdit == null)
    {

      if(this.basicinfo.length == 0)
      {
        this.createdWR.id = "WR"+1;
      }
      else
      {
        let pom = this.basicinfo[this.basicinfo.length - 1].id;
        let brojstring = pom.substr(pom.length -1);
        let broj = Number(brojstring);
        let uvecan = broj +1;
        this.createdWR.id = "WR"+ uvecan;
      }
    }
    this.createdWR.type = this.courseForm.value.selectType;
    this.createdWR.status = this.courseForm.value.status;
    this.createdWR.incident = this.courseForm.value.selectIncident;
    this.createdWR.typeOfWork = this.courseForm.value.selectTypeofWork;
    this.createdWR.startDateTime = this.courseForm.value.startdate;
    this.createdWR.endDateTime = this.courseForm.value.enddate;
    this.createdWR.dateTimeCreated = this.courseForm.value.datecreated;
    this.createdWR.emergencyWork = this.courseForm.value.emergencyWork;
    if(this.courseForm.value.emergencyWork === "")
    this.createdWR.emergencyWork = false;
    this.createdWR.createdBy = this.courseForm.value.createdBy;
    this.createdWR.company = this.courseForm.value.company;
    this.createdWR.phoneNum = this.courseForm.value.phonenum;
    this.createdWR.purpose = this.courseForm.value.purpose;
    this.createdWR.details = this.courseForm.value.details;
    this.createdWR.notes = this.courseForm.value.notes;
    this.createdWR.adress = this.courseForm.value.selectAdress;
    this.createdWR.idd = this.pom.idd;
    if(!(this.pom && (Object.keys(this.pom).length === 0)))
    {
      this.edited = true;
      this.createdWR.id = this.pom.id;
    }
    this.wrService.AddBasicInfo(this.createdWR,this.edited);
    console.log("Basic info: "+JSON.stringify(this.courseForm.value));
    this.toastr.success('Success added basic info','Success');
  }
  
  onCancel()
  {
    this.courseForm.reset();
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'dd-MM-yyyy');
    this.courseForm.get('status').setValue('Draft');
    this.courseForm.get('createdBy').setValue('Milenko Pjaca');
    this.courseForm.get('datecreated').setValue(latest_date);
  }

}
