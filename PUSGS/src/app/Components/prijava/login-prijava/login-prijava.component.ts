import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialAuthService, FacebookLoginProvider, SocialUser, GoogleLoginProvider } from 'angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

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
  socialUser: SocialUser;
  isLoggedin: boolean = null;
    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder, private socialAuthService: SocialAuthService, private userService: UserService, private router: Router, private toastr: ToastrService) {

     }

    ngOnInit() {
        this.form = this.fb.group({
            'Email': ['', Validators.compose([Validators.required,Validators.email])],
            'Password': ['', Validators.compose([Validators.required])]
        });

        this.socialAuthService.authState.subscribe((user) => {
          this.socialUser = user;
          this.isLoggedin = (user != null);
        });
        
    }

    loginWithFacebook(): void {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialusers=>{
        console.log(socialusers);  
      this.userService.FacebookLogin(socialusers).subscribe((res:any)=>{
        //localStorage.setItem('token', res.authToken);
        //localStorage.setItem('userName', res.userName);
        //localStorage.setItem('uloga', res.uloga);
        this.router.navigateByUrl('/dashboard');
      });
      console.log(socialusers); 
    });
    }

    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(socialusers => {
        console.log(socialusers);  
        this.userService.GoogleLogin(socialusers).subscribe((res:any)=>{
          localStorage.setItem('token', res.token);
          localStorage.setItem('userName', res.userName);
          localStorage.setItem('uloga', res.uloga);
          this.router.navigateByUrl('/dashboard');
        });
        console.log(socialusers); 
      });
    }

    onSubmit() {
        // this.formSubmitted = true;

        // if (this.form.valid) {
        //     let username = this.form.controls['email'].value;
        //     let password = this.form.controls['password'].value;

        //     //let user$ = this.authenticationService.login(username, password);

        //     //user$.subscribe(
        //         //(data: any) => console.log(data),
        //         err => console.error(err)
        //    // );
        // } else {
        //     console.log("The form is NOT valid");
        //     this.formSubmitted = false;
        // }

        this.userService.login(this.form.value).subscribe(
          (res: any) => {
            console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('userName', res.Email);
            localStorage.setItem('uloga', res.uloga);
            this.router.navigateByUrl('/dashboard');
          },
          err => {
            if (err.status == 400)
            
              this.toastr.error('Incorrect username or password.', 'Authentication failed.', {
                timeOut: 8000,
               // positionClass: 'toast-top-left',
              });
            else
              console.log(err);
          }
        );
    }

}
