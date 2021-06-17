import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { PlanRadaBasicInfo } from 'src/app/Entities/plan-rada-basic-info';
import { PlanRadaService } from 'src/app/Services/plan-rada.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unos-podataka',
  templateUrl: './unos-podataka.component.html',
  styleUrls: ['./unos-podataka.component.css']
})
export class UnosPodatakaComponent implements OnInit {

  courseForm!: FormGroup;
  typeofWorks =new Array<string>();
  types = new Array<string>();
  incidents = new Array<string>();
  createdWR = new PlanRadaBasicInfo();
  date!: Date;
  adresses = new Array<string>();
  edited = false;

  constructor(private fb:FormBuilder, public datepipe: DatePipe, private wrService: PlanRadaService, private router: Router, private toastr: ToastrService) { }
  planRadaForEdit = this.wrService.GetPlanRadaForEdit();

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
    if(this.planRadaForEdit != null){
      this.courseForm.get('selectType').setValue(this.planRadaForEdit.basicinfo.type);
      this.courseForm.get('status').setValue(this.planRadaForEdit.basicinfo.status);
      this.courseForm.get('selectIncident').setValue(this.planRadaForEdit.basicinfo.incident);
      this.courseForm.get('selectTypeofWork').setValue(this.planRadaForEdit.basicinfo.typeOfWork);
      this.courseForm.get('startdate').setValue(this.planRadaForEdit.basicinfo.startDateTime);
      this.courseForm.get('enddate').setValue(this.planRadaForEdit.basicinfo.endDateTime);
      this.courseForm.get('emergencyWork').setValue(this.planRadaForEdit.basicinfo.emergencyWork);
      this.courseForm.get('company').setValue(this.planRadaForEdit.basicinfo.company);
      this.courseForm.get('phonenum').setValue(this.planRadaForEdit.basicinfo.phoneNum);
      this.courseForm.get('datecreated').setValue(this.planRadaForEdit.basicinfo.dateTimeCreated);
      this.courseForm.get('status').setValue(this.planRadaForEdit.basicinfo.status);
      this.courseForm.get('createdBy').setValue(this.planRadaForEdit.basicinfo.createdBy);
      this.courseForm.get('details').setValue(this.planRadaForEdit.basicinfo.details);
      this.courseForm.get('notes').setValue(this.planRadaForEdit.basicinfo.notes);
      this.courseForm.get('selectAdress').setValue(this.planRadaForEdit.basicinfo.adress);
      this.courseForm.get('purpose').setValue(this.planRadaForEdit.basicinfo.purpose);
    }
    else
    {
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'dd-MM-yyyy');
    this.courseForm.get('status').setValue('Draft');
    this.courseForm.get('createdBy').setValue('Jovan Conti');
    this.courseForm.get('datecreated').setValue(latest_date);
    }
  }

  onSubmit(){
    let basicinfo = this.wrService.GetBasicInfo()!;
    if(this.planRadaForEdit == null)
    {

      if(basicinfo.length == 0)
      {
        this.createdWR.id = "WR"+1;
      }
      else
      {
        let pom = basicinfo[basicinfo.length - 1].id;
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
    this.createdWR.createdBy = this.courseForm.value.createdBy;
    this.createdWR.company = this.courseForm.value.company;
    this.createdWR.phoneNum = this.courseForm.value.phonenum;
    this.createdWR.purpose = this.courseForm.value.purpose;
    this.createdWR.details = this.courseForm.value.details;
    this.createdWR.notes = this.courseForm.value.notes;
    this.createdWR.adress = this.courseForm.value.selectAdress;
    if(this.planRadaForEdit != null)
    {
      this.edited = true;
      this.createdWR.id = this.planRadaForEdit.basicinfo.id;
    }
    this.wrService.AddBasicInfo(this.createdWR,this.edited);
    this.toastr.success('Uspesno dodate osnovne informacije','Success');
  }

  onCancel()
  {
    this.courseForm.reset();
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'dd-MM-yyyy');
    this.courseForm.get('status').setValue('Draft');
    this.courseForm.get('createdBy').setValue('Jovan Conti');
    this.courseForm.get('datecreated').setValue(latest_date);
  }

}
