import { DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { WorkRequest } from 'src/app/Entities/work-request';
import { WorkRequestHistoryOfChanges } from 'src/app/Entities/work-request-history-of-changes';
import { WorkRequestService } from 'src/app/Services/work-request.service';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';
import { DenyDialogComponent } from './deny-dialog/deny-dialog.component';

@Component({
  selector: 'app-wr-history-of-state-changes',
  templateUrl: './wr-history-of-state-changes.component.html',
  styleUrls: ['./wr-history-of-state-changes.component.css']
})
export class WrHistoryOfStateChangesComponent implements OnInit {

  displayedColumns: any[] = ['basicInfoId', 'dateofchanges', 'name', 'lastname', 'status', 'approve', 'deny', 'cancel'];
  dataSource: MatTableDataSource<WorkRequestHistoryOfChanges>;
  historys = new Array<WorkRequestHistoryOfChanges>();
  workRequestForEdit = this.wrService.GetWorkRequestForEdit();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private wrService: WorkRequestService, public dialog: MatDialog) {

    
  }
  ngOnInit(): void {
    
    if(this.workRequestForEdit != null)
    {
      this.historys = this.wrService.GetHistory(this.workRequestForEdit.basicinfo.idd);
      this.dataSource = new MatTableDataSource(this.historys);
    }
    else{
      this.dataSource = new MatTableDataSource(this.historys);
    }
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


  onApprove(id: number):void
  {
    console.log(this.historys);
    this.wrService.TransferId(id);
    this.dialog.open(ApproveDialogComponent);
  }

  onDeny(id: number):void
  {
    this.wrService.TransferId(id);
    this.dialog.open(DenyDialogComponent);
    // this.wrService.onDeny(id);
    // this.historys = this.wrService.GetHistory(this.workRequestForEdit.basicinfo.id);
    // this.dataSource._updateChangeSubscription();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  onCancel(id: number):void
  {
    this.wrService.TransferId(id);
    this.dialog.open(CancelDialogComponent);
    // this.wrService.onCancel(id);
    // this.historys = this.wrService.GetHistory(this.workRequestForEdit.basicinfo.id);
    // this.dataSource._updateChangeSubscription();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}

export interface UserData {
  wr: string;
  dateofchanges : string;
  name: string;
  lastname: string;
  status: string;
}
