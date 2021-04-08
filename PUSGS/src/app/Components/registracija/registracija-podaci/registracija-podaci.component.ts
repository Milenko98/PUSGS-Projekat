import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-registracija-podaci',
  templateUrl: './registracija-podaci.component.html',
  styleUrls: ['./registracija-podaci.component.css']
})
export class RegistracijaPodaciComponent implements OnInit {

  courseForm!: FormGroup;
  roles = new Array<string>();
  url = null;


  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.roles.push("role1");
    this.roles.push("role2");
    this.roles.push("role3");
    this.roles.push("role4");
    this.initForm();
  }

  private initForm() {
    this.courseForm = this.fb.group({
      username: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      firstname: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      lastname: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      lozinka: new FormControl('',[Validators.required]),
      select : new FormControl('',Validators.required),
      slika: new FormControl('',Validators.required)
    });
  }

onSubmit(){
  alert("Uspesna registracija");
}

onClear()
{
  this.courseForm.reset();
}

onSelectFile(event)
{
  if(event.target.files){
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload=(event:any)=>{
      this.url = event.target.result;
    }
  }
}
}
