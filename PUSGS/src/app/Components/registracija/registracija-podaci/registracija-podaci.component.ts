import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Entities/user';
import { UserRegistration } from 'src/app/Entities/user-registration';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registracija-podaci',
  templateUrl: './registracija-podaci.component.html',
  styleUrls: ['./registracija-podaci.component.css']
})
export class RegistracijaPodaciComponent implements OnInit {

  courseForm:FormGroup;
  Passwords:FormGroup;
  roles = new Array<string>();
  locations = new Array<string>();
  url = null;
  user = new UserRegistration();


  constructor(private fb:FormBuilder, private toastr: ToastrService , private router: Router, private userServise: UserService) { }

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
      lozinka2:new FormControl(['', Validators.required]),
      select : new FormControl('',Validators.required),
      slika: new FormControl('',Validators.required),
      dateofbirth: new FormControl('', Validators.required),
      location: new FormControl('',Validators.required),
    });
  }


onSubmit(){
  // this.toastr.success('Successfully reggisteres!','Success');
  // this.router.navigate(['/login']);
  // this.toastr.info("Wait for administrator check your data...", "Notification!");
  this.user.id = 0;
  this.user.firstname = this.courseForm.value.firstname;
  this.user.username = this.courseForm.value.username;
  this.user.email = this.courseForm.value.email;
  this.user.lastname = this.courseForm.value.lastname;
  this.user.password = this.courseForm.value.lozinka;
  this.user.role = this.courseForm.value.select;
  this.user.picture = this.courseForm.value.slika;
  this.user.dateofbirth = this.courseForm.value.dateofbirth;
  this.user.location = this.courseForm.value.location;

  this.userServise.register(this.user).subscribe(
    (res: any) => {
      if (res.succeeded) {
        //this.userService.formModel.reset();
        this.toastr.success('New user created!', 'Registration successful.');
        this.toastr.info("Wait for administrator check your data...", "Notification!");
         this.router.navigate(['/login']);        
      } else {
        res.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Username is already taken','Registration failed.');
              break;

            default:
            this.toastr.error(element.description,'Registration failed.');
              break;
          }
        });
      }
    },
    err => {
      console.log('Error');
      console.log(err);
    }
    
  );
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
