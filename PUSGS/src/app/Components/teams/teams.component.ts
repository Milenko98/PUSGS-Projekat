import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'teamMembers', 'edit', 'delete'];
  dataSource: MatTableDataSource<Teams>;
  counterApprove!: number;
  counterDeny! : number;
  counterCancel! : number;
  teams! : Array<Teams>;
  team!: Teams;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.teams = [{id: 1, name:"k"},
    {id:2, name:"c"},
    {id:3, name:"d"},
    {id:4, name:"a"},
    {id:5, name:"e"},
    {id:6, name:"w"}]

    this.dataSource = new MatTableDataSource(this.teams);
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

  getId(id){
    alert(id);
  }

  getIdEdit(id)
  {
    alert(id);
  }

  getIdDelete(i)
  {
    console.log(i);
    console.log(this.teams);
    this.dataSource.data.splice(i,1);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}

export interface Teams {
  id: number;
  name : string;
}
