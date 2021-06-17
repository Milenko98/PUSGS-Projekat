import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PlanRadaBasicInfo } from 'src/app/Entities/plan-rada-basic-info';
import { PlanRadaService } from 'src/app/Services/plan-rada.service';


export interface PodaciTabelePlanovaRada {
  id: string;
  startdate: string;
  phonenumber: string;
  status: string;
  address: string;
}

/*
const PODACI_ZA_TABELU: PodaciTabelePlanovaRada[] = [
      {id : "WR1", startdate: "12.4.2021", phonenumber : "063369474", status : "Draft",     address : "Mileticeva 2"},
      {id : "WR2", startdate: "13.4.2021", phonenumber : "062363576", status : "Draft",     address : "Subticka 10"},
      {id : "WR3", startdate: "14.4.2021", phonenumber : "064369579", status : "Submitted", address : "Nikole Pasica 12"},
      {id : "WR4", startdate: "15.4.2021", phonenumber : "065389576", status : "Submitted", address : "Koce Kolarova 30"},
      {id : "WR5", startdate: "16.4.2021", phonenumber : "060365578", status : "Submitted", address : "Masarikova 2"},
      {id : "WR6", startdate: "16.4.2021", phonenumber : "065365378", status : "Submitted", address : "Masarikova 2"},
      {id : "WR7", startdate: "16.4.2021", phonenumber : "061365977", status : "Submitted", address : "Masarikova 2"},

];*/

@Component({
  selector: 'app-tabela-planova-rada',
  templateUrl: './tabela-planova-rada.component.html',
  styleUrls: ['./tabela-planova-rada.component.css']
})
export class TabelaPlanovaRadaComponent implements OnInit {

  displayedColumns: string[] = ['id', 'startdate', 'phonenumber', 'status', 'address'];
  dataSource: MatTableDataSource<PlanRadaBasicInfo>;

  //podaci_za_tabelu!:Array<any>;

  constructor(private swService: PlanRadaService, private router: Router)
   {

    let planovirada = this.swService.GetBasicInfo();

    this.dataSource = new MatTableDataSource(planovirada);
  }

  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    console.log(this.swService.GetAllPlanRada());
    this.swService.OcistiObjekat();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  primeniFilter(filterValue: string) {
     this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  EditPlanRada(planRadaId)
  {
    this.swService.CallEdit(planRadaId);
    this.router.navigate(['/SwitchingPlanNew/BasicInformations']);
  }

}
