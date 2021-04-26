import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'startdate', 'phonenum', 'status', 'adress'];
  dataSource: MatTableDataSource<WorkRequests>;
  counterApprove!: number;
  counterDeny! : number;
  counterCancel! : number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    const workrequests = [{id:"WR1", startdate:"23.1.2010", phonenum:"060234234",status:"No Status", adress: "Bulevar cara Lazara 14"},
    {id:"TR2", startdate:"33.1.2010", phonenum:"060234234",status:"No Status", adress: "Bulevar cara Lazara 14"},
    {id:"CR3", startdate:"13.1.2010", phonenum:"060234234",status:"No Status", adress: "Vulevar cara Lazara 14"},
    {id:"HR4", startdate:"14.1.2010", phonenum:"060234234",status:"No Status", adress: "Culevar cara Lazara 14"},
    {id:"YR5", startdate:"21.1.2010", phonenum:"060234234",status:"No Status", adress: "Pulevar cara Lazara 14"},
    {id:"OR6", startdate:"28.1.2010", phonenum:"060234234",status:"No Status", adress: "Lulevar cara Lazara 14"}]

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(workrequests);
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

export interface WorkRequests {
  id: string;
  startdate : string;
  phonenum: string;
  status: string;
  adress: string;
}

