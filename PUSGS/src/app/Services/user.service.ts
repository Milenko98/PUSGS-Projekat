import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../Entities/user';
import { UserRegistration } from '../Entities/user-registration';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BaseURI = 'https://localhost:44362/api';

  constructor(private http: HttpClient, private _router:Router, private toast: ToastrService) { }

  register(user: UserRegistration) {
     return this.http.post(this.BaseURI + '/User/Register', user);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/User/Login', formData);
  }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
    this.toast.success('Uspesno ste se odjavili!','Uspesna odjava');
  }

  GoogleLogin(formData){
    var body = {
      Id : formData.id,
      Ime : formData.firstName ,
      Prezime : formData.lastName,
      Email : formData.email,
      IdToken : formData.idToken
    };
    return this.http.post(this.BaseURI + '/User/SocialLogin',body);
  }

  FacebookLogin(formData){
    var body = {
      Id : formData.id,
      Ime : formData.firstName ,
      Prezime : formData.lastName,
      Email : formData.email,
      IdToken : formData.idToken
    };
    return this.http.post(this.BaseURI + '/User/SocialLogin',body);
  }
}
