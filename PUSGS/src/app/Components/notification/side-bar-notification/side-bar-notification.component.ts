import { DatePipe, getLocaleDateTimeFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-side-bar-notification',
  templateUrl: './side-bar-notification.component.html',
  styleUrls: ['./side-bar-notification.component.css']
})
export class SideBarNotificationComponent implements OnInit {

  datum: Date = new Date();
  allRead: boolean = false;

  readNotifications: Array<any>;

  constructor(private toastr: ToastrService) { }

  
  showSuccess(){
    this.toastr.success('Moj prvi toaster success',Date());
    
  }

  ErrorSuccess(){
    this.toastr.error('Error toastr', Date());
  }

  infoSuccess(){
    this.toastr.info('Info toast', Date());
  }

  warningSuccess() {
    this.toastr.warning('Warning toastr', Date());
  }

  clearAll(){
    this.toastr.clear();
  }

  markAllAsRead(){
    this.allRead = true;
  }

  //Trebace za kasnije
  //toastrService.clear(toastId?: number);
  //toastrService.remove(toastId: number);

  ngOnInit(): void {
  }

}
