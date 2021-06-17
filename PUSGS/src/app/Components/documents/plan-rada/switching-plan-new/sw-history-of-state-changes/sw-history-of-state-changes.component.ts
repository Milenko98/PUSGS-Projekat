import { DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlanRadaHistoryOfChanges } from 'src/app/Entities/plan-rada-history-of-changes';
import { PlanRada } from 'src/app/Entities/plan-rada';
import { PlanRadaService } from 'src/app/Services/plan-rada.service';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';
import { CancelDialogComponent } from './cancel-dialog/cancel-dialog.component';
import { DenyDialogComponent } from './deny-dialog/deny-dialog.component';

@Component({
  selector: 'app-sw-history-of-state-changes',
  templateUrl: './sw-history-of-state-changes.component.html',
  styleUrls: ['./sw-history-of-state-changes.component.css']
})
export class SwHistoryOfStateChangesComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dateofchanges', 'name', 'lastname', 'status', 'approve', 'deny', 'cancel'];
  dataSource: MatTableDataSource<PlanRadaHistoryOfChanges>;
  historys = new Array<PlanRadaHistoryOfChanges>();
  planRadaForEdit = this.swService.GetPlanRadaForEdit();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private swService: PlanRadaService, public dialog: MatDialog) {

    
  }
  ngOnInit(): void {
    if(this.planRadaForEdit != null)
    {
      this.historys = this.swService.GetHistory(this.planRadaForEdit.basicinfo.id);
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

  onApprove(id: string):void
  {
    console.log(this.historys);
    this.swService.TransferId(id);
    this.dialog.open(ApproveDialogComponent);
  }

  onDeny(id: string):void
  {
    this.swService.TransferId(id);
    this.dialog.open(DenyDialogComponent);
    // this.wrService.onDeny(id);
    // this.historys = this.wrService.GetHistory(this.workRequestForEdit.basicinfo.id);
    // this.dataSource._updateChangeSubscription();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  onCancel(id: string):void
  {
    this.swService.TransferId(id);
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

