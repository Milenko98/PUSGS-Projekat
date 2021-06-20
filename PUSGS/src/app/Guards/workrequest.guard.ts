import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkrequestGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('uloga') == "Dispecer" || localStorage.getItem('uloga') == "Administrator"){
    console.log("uspesan ulazak u workrequest");
      return true;
    }
    else {
      this.router.navigate(['/documents']);
      console.log("neuspesan ulazak u workrequest");
      this.toastr.error("You dont have permission for Work Request!","Error!");
      return false;
    }

  }
  
}
