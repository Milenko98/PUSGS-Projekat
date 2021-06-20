import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkRequest } from 'src/app/Entities/work-request';
import { WorkRequestBasicInfo } from 'src/app/Entities/work-request-basic-info';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['idd','id', 'startdate', 'phonenum', 'status', 'adress'];
  dataSource: MatTableDataSource<WorkRequestBasicInfo>;
  workrequests = Array<WorkRequestBasicInfo>();
  workrequestss = Array<WorkRequest>();
  workRequestForEdit =  new WorkRequest();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private wrService: WorkRequestService, private router: Router)
   {

    //   let workrequests = this.wrService.GetBasicInfo();

    //  this.dataSource = new MatTableDataSource(workrequests);
  }
  ngOnInit(): void
  {
    this.GetBasicInfo();   
    console.log(this.wrService.GetAllWorkRequests());
    this.wrService.OcistiObjekat();
  }

  GetBasicInfo()
  {
    this.wrService.GetBasicInfo().subscribe(
      (res: any) => {
        if (res != null) {
  
          res.forEach(element => {

            this.workrequests.push(element);
            
          });
          this.dataSource = new MatTableDataSource(this.workrequests);
        } else {
        }
      },
      err => {
        console.log('Error!');
        console.log(err);    
      });
  }

  GetHystoryOfChanges()
  {
    this.wrService.GetHystoryOfChanges().subscribe(
      (res: any) => {
        if (res != null) {
  
          res.forEach(element => {

            this.workrequests.push(element);
            
          });
          this.dataSource = new MatTableDataSource(this.workrequests);
        } else {
        }
      },
      err => {
        console.log('Error!');
        console.log(err);    
      });
  }
  ngAfterViewInit() {
    if(this.dataSource !== undefined){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetBasicInfoId(id:number){
    this.wrService.GetBasicInfoId(id).subscribe(
      (res: any) => {
        console.log("res pre dodele"+JSON.stringify(res));
        if (res !== null) {
          console.log("res pre dodele"+JSON.stringify(res));
          if (res !== null) {
            // this.workRequestForEdit.basicinfo =  res as WorkRequestBasicInfo;
            // this.wrService.workRequestForEdit.basicinfo = this.workRequestForEdit.basicinfo;
            this.wrService.pom = res;
            console.log("Dobavljeni basicinfo:\n"+JSON.stringify(this.wrService.pom));
          }
        } else {
        }
      },
      err => {
        console.log('Error!');
        console.log(err);    
      });
  }

  EditWorkRequest(workRequestId, id)
  {
    this.GetBasicInfoId(workRequestId);
    this.wrService.CallEdit(id);
    this.router.navigate(['/WorkRequestNew/wrBasicInfo']);
  }
}

