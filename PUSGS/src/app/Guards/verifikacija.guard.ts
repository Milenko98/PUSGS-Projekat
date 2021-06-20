import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerifikacijaGuard implements CanActivate {
  constructor(private router: Router, private toastr: ToastrService){}
  email: boolean;
  admin: boolean;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(localStorage.getItem('VerifikacijaEmail') == null){}
    else if (localStorage.getItem('VerifikacijaEmail') != null || localStorage.getItem('uloga') != "Administrator")
    {
      if(localStorage.getItem('uloga') == null)
       {
          return true;
       }
       else if(localStorage.getItem('uloga') == "Administrator")
       {
        return true;
       }
       return false;
    }
    this.toastr.error("There is no accounts for verifiaction!","Error!");
    return false;
  }
  
}
