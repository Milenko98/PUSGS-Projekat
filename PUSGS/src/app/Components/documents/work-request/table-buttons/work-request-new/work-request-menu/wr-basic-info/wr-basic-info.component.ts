import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-wr-basic-info',
  templateUrl: './wr-basic-info.component.html',
  styleUrls: ['./wr-basic-info.component.css']
})
export class WrBasicInfoComponent implements OnInit {

  courseForm!: FormGroup;
  typeofWorks =new Array<string>();
  types = new Array<string>();
  incidents = new Array<string>();
  date!: Date;

  constructor(private fb:FormBuilder, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.typeofWorks.push('popravak','obilazak');
    this.types.push('planirani', 'neplanirani');
    this.incidents.push('inc1','inc2','inc3');

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
    });
    this.date=new Date();
    let latest_date =this.datepipe.transform(this.date, 'dd-MM-yyyy');
    this.courseForm.get('status').setValue('Draft');
    this.courseForm.get('createdBy').setValue('Milenko Pjaca');
    this.courseForm.get('datecreated').setValue(latest_date);
  }

  onSubmit(){
    alert("Uspesna registracija");
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
