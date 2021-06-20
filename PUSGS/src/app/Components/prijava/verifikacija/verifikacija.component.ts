import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserRegistration } from 'src/app/Entities/user-registration';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-verifikacija',
  templateUrl: './verifikacija.component.html',
  styleUrls: ['./verifikacija.component.css']
})
export class VerifikacijaComponent implements OnInit {

email: string;
uloga: boolean;
users = new Array<UserRegistration>();
displayedColumns: string[] = ['username', 'firstname','lastname', 'email', 'verifikovan', 'odbijen', 'approve', 'deny'];
dataSource: MatTableDataSource<UserRegistration> = new MatTableDataSource([]);

  constructor(private router: Router,private toastr: ToastrService, private userService: UserService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isVerificated: boolean;

  ngOnInit(): void {
    if(localStorage.getItem('uloga') != "Administrator")
    this.uloga = false;
    this.uloga = true;
    if(localStorage.getItem("VerifikacijaEmail")!= null){
      this.email = localStorage.getItem("VerifikacijaEmail");
    }
    this.isVerificated = false;



    this.userService.GetUsersForVerification().subscribe((res: any) => {
      if (res !== null) {
        this.users = res;
        this.dataSource = new MatTableDataSource(this.users);
        console.log(this.users);
        this.ngAfterViewInit();
      } else {
      }
    },
    err => {
      console.log('Error!');
      console.log(err);    
    });
  }

  ngAfterViewInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }

  applyFilter(event: Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Verifikacija(event){
  //   this.isVerificated = event.Checked;
  //   //console.log(this.isVerificated);
  // }

  Verificate(){
    console.log("tuga"+this.isVerificated)
    if(this.isVerificated == true){
      console.log(this.isVerificated)
      localStorage.removeItem('VerifikacijaEmail');
      this.toastr.success("Successfuly verificated!","Success!");
      this.router.navigate(['/dashboard']);  
    }
  }

  Approve(email: string)
  {
  console.log(email);
    this.userService.ApproveUser(email).subscribe((res: any) => {
      if (res !== null) {
        this.toastr.success("Successfuly approved user!","Success!");
        console.log(res);
      } else {
        this.toastr.error("User is already approved!","Error!");
      }
    },
    err => {
      console.log(err); 
      this.toastr.error("Error!","Error!");   
    });
  }

  Deny(email: string)
  {
    this.userService.DenyUser(email).subscribe((res: any) => {
      if (res !== null) {
        if(res.error.text === "verifikovan")
        {
          this.toastr.error("User is already managed!","Error!");
        }
        this.toastr.success("Successfuly denied user!","Success!");
        console.log(res);
      }
    },
    err => {
      console.log(err); 
      this.toastr.error("Error!","Error!");   
    });
  }

}
