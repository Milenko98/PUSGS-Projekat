import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-wr-equipment',
  templateUrl: './wr-equipment.component.html',
  styleUrls: ['./wr-equipment.component.css']
})
export class WrEquipmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'coordinate', 'adress'];
  dataSource: MatTableDataSource<Equipment>;
  equipments! : Array<number>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create 100 users
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    const equipments = [{id:"1", name:"Aca", type:"tip", coordinate:"23 07 20001",adress:"Bulevar cara Lazara 23"},
    {id:"2", name:"Laca", type:"Yip", coordinate:"23 07 20001",adress:"Bulevar cara Lazara 23"},
    {id:"3", name:"Dca", type:"Uip", coordinate:"33 07 20001",adress:"Vulevar cara Lazara 23"},
    {id:"4", name:"Fca", type:"Iip", coordinate:"43 07 20001",adress:"Sulevar cara Lazara 23"},
    {id:"5", name:"Gca", type:"Wip", coordinate:"53 07 20001",adress:"Dulevar cara Lazara 23"},
    {id:"6", name:"Wca", type:"Qip", coordinate:"63 07 20001",adress:"Julevar cara Lazara 23"}]

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(equipments);
  }
ngOnInit(): void {
  this.equipments = [1,2,3,4,5,6];
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
}

export interface Equipment {
id: string;
name : string;
type: string;
coordinate: string;
adress: string;
}
