import { DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-wr-history-of-state-changes',
  templateUrl: './wr-history-of-state-changes.component.html',
  styleUrls: ['./wr-history-of-state-changes.component.css']
})
export class WrHistoryOfStateChangesComponent implements OnInit {

  displayedColumns: string[] = ['wr', 'dateofchanges', 'name', 'lastname', 'status'];
  dataSource: MatTableDataSource<UserData>;
  counterApprove!: number;
  counterDeny! : number;
  counterCancel! : number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    const users = [{wr:"wr1", dateofchanges:"23.1.2010", name:"Milan", lastname:"Zinic",status:"No Status"},
    {wr:"wr2", dateofchanges:"24.1.2010", name:"Jovan", lastname:"Pilic",status:"No Status"},
    {wr:"wr3", dateofchanges:"25.1.2010", name:"Ivan", lastname:"Kijic",status:"No Status"},
    {wr:"wr4", dateofchanges:"26.1.2010", name:"Goran", lastname:"Finic",status:"No Status"},
    {wr:"wr5", dateofchanges:"27.1.2010", name:"Stefan", lastname:"Dimic",status:"No Status"},
    {wr:"wr6", dateofchanges:"28.1.2010", name:"Milenko", lastname:"Siljic",status:"No Status"}]

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  ngOnInit(): void {
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


  onApprove():void
  {
    this.counterApprove++;
  }

  onDeny():void
  {
    this.counterDeny++;;
  }

  onCancel():void
  {
    this.counterCancel++;;
  }
}

export interface UserData {
  wr: string;
  dateofchanges : string;
  name: string;
  lastname: string;
  status: string;
}
