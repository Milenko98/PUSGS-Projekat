import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Teams } from '../teams.component';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'lastname','add'];
  dataSource: MatTableDataSource<Team>;
  team! : Array<Team>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.team = [{id: 1, name:"k",lastname:"s"},
    {id:2, name:"c",lastname:"sd"},
    {id:3, name:"d",lastname:"g"},
    {id:4, name:"a",lastname:"h"},
    {id:5, name:"e",lastname:"j"},
    {id:6, name:"w",lastname:"k"}]

    this.dataSource = new MatTableDataSource(this.team);
  }
  ngOnInit(): void {
    
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

  getIdAdd(id)
  {
    alert(id);
  }
}

export interface Team {
  id: number;
  name : string;
  lastname : string;
}
