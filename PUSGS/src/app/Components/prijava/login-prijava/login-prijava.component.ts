import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-prijava',
  templateUrl: './login-prijava.component.html',
  styleUrls: ['./login-prijava.component.css']
})
export class LoginPrijavaComponent implements OnInit {

  hide: boolean = true;
/*
  courseForm!: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    alert("Uspesna registracija");
  }

  private initForm() {
    this.courseForm = this.fb.group({     
      email: new FormControl('', [Validators.required,Validators.email]),    
      lozinka: new FormControl('',[Validators.required,Validators.pattern('[a-z A-Z][a-z A-Z 0-9]+')]),
    });
  }*/

  form: FormGroup;
    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.form = this.fb.group({
            'email': ['', Validators.compose([Validators.required,Validators.email])],
            'password': ['', Validators.compose([Validators.required])]
        });
    }

    onSubmit(loginForm) {
        this.formSubmitted = true;

        if (this.form.valid) {
            let username = this.form.controls['email'].value;
            let password = this.form.controls['password'].value;

            //let user$ = this.authenticationService.login(username, password);

            //user$.subscribe(
                //(data: any) => console.log(data),
                err => console.error(err)
           // );
        } else {
            console.log("The form is NOT valid");
            this.formSubmitted = false;
        }
    }

}
