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

        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('uloga');

        console.log(localStorage);
        //localStorage.removeItem('VerifikacijaEmail');
        
    }

    loginWithFacebook(): void {
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(socialusers=>{
        console.log(socialusers);  
      this.userService.FacebookLogin(socialusers).subscribe((res:any)=>{
        localStorage.setItem('token', "token");
        //localStorage.setItem('userName', res.userName);
        localStorage.setItem('uloga', "Potrosac");
        this.router.navigateByUrl('/dashboard');
        console.log(localStorage.getItem('uloga'));
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
          localStorage.setItem('uloga', "Potrosac");
          this.router.navigateByUrl('/dashboard');
          console.log(localStorage.getItem('uloga'));
        });
        console.log(socialusers); 
        
      });
    }

    onSubmit() {

        this.userService.login(this.form.value).subscribe(
          (res: any) => {
            console.log(res);
            localStorage.setItem('token', res.token);
            localStorage.setItem('userName', res.email);
            localStorage.setItem('uloga', res.role);
            // if(localStorage.getItem('VerifikacijaEmail')!= null && localStorage.getItem('uloga') != "Administrator"){
            //   this.toastr.error("Wait for administrator approves!","Error!");
            //   this.router.navigateByUrl('/login');
            // }
            //else
            this.router.navigateByUrl('/dashboard');
          },
          err => {
            if (err.error.text === "Pogresna lozinka ili username.")   
              this.toastr.error("Incorrect username or password!", "Authentication failed.");
            else if(err.error.text === "Odbijen si.")
              this.toastr.error("Admin rejected you!", "Error!");
            else if(err.error.text === "Niste verifikovani.")
              this.toastr.error("You are not verified.Wait for admin to verify you!","Error!");
            else
              console.log(err);
          }
        );
    }

}
