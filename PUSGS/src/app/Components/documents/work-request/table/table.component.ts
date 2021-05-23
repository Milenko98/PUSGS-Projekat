import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { WorkRequestBasicInfo } from 'src/app/Entities/work-request-basic-info';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'startdate', 'phonenum', 'status', 'adress'];
  dataSource: MatTableDataSource<WorkRequestBasicInfo>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private wrService: WorkRequestService, private router: Router)
   {

    let workrequests = this.wrService.GetBasicInfo();

    this.dataSource = new MatTableDataSource(workrequests);
  }
  ngOnInit(): void
  {
    console.log(this.wrService.GetAllWorkRequests());
    this.wrService.OcistiObjekat();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  EditWorkRequest(workRequestId)
  {
    this.wrService.CallEdit(workRequestId);
    this.router.navigate(['/WorkRequestNew/wrBasicInfo']);
  }
}

