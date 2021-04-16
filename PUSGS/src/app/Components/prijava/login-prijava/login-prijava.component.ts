import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-prijava',
  templateUrl: './login-prijava.component.html',
  styleUrls: ['./login-prijava.component.css']
})
export class LoginPrijavaComponent implements OnInit {

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
  }

}
