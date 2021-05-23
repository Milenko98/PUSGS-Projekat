import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registracija-podaci',
  templateUrl: './registracija-podaci.component.html',
  styleUrls: ['./registracija-podaci.component.css']
})
export class RegistracijaPodaciComponent implements OnInit {

  courseForm!: FormGroup;
  roles = new Array<string>();
  locations = new Array<string>();
  url = null;


  constructor(private fb:FormBuilder, private toastr: ToastrService , private router: Router) { }

  ngOnInit(): void {
    this.roles.push("Dispecer", "Clan ekipe", "Radnik", "Potrosac", "Administrator");
    this.locations.push("Bulevar Cara Lazara 23", "Bulevar Oslobodjenja 3", "Karadjordjeva 3", "Suboticka 12");
    this.initForm();
  }

  private initForm() {
    this.courseForm = this.fb.group({
      username: new FormControl('', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required,Validators.email]),
      firstname: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      lastname: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
      lozinka: new FormControl('',Validators.required),
      select : new FormControl('',Validators.required),
      slika: new FormControl('',Validators.required),
      dateofbirth: new FormControl('', Validators.required),
      location: new FormControl('',Validators.required)
    });
  }

onSubmit(){
  this.toastr.success('Successfully reggisteres!','Success');
  this.router.navigate(['/login']);
  this.toastr.info("Wait for administrator check your data...", "Notification!");
}

check(pass){

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
