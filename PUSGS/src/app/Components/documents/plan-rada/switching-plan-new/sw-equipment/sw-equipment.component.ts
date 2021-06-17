import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PlanRadaEquipments } from 'src/app/Entities/plan-rada-equipment';
import { PlanRadaService } from 'src/app/Services/plan-rada.service';

@Component({
  selector: 'app-sw-equipment',
  templateUrl: './sw-equipment.component.html',
  styleUrls: ['./sw-equipment.component.css']
})
export class SwEquipmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'coordinate', 'adress', 'add'];
  dataSource: MatTableDataSource<any>;
  equipments!: Array<PlanRadaEquipments>;
  selectedEquipmentId;
  equipmentsArray = new Array<PlanRadaEquipments>();
  
  planRadaForEdit = this.swService.GetPlanRadaForEdit();
  edited = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private swService: PlanRadaService, private toastr: ToastrService, private router: Router) {
    this.equipments = [{ id: "1", name: "Aca", type: "tip", coordinate: "23 07 20001", adress: "Bulevar cara Lazara 23" },
    { id: "2", name: "Laca", type: "Yip", coordinate: "23 07 20001", adress: "Bulevar cara Lazara 23" },
    { id: "3", name: "Dca", type: "Uip", coordinate: "33 07 20001", adress: "Vulevar cara Lazara 23" },
    { id: "4", name: "Fca", type: "Iip", coordinate: "43 07 20001", adress: "Sulevar cara Lazara 23" },
    { id: "5", name: "Gca", type: "Wip", coordinate: "53 07 20001", adress: "Dulevar cara Lazara 23" },
    { id: "6", name: "Wca", type: "Qip", coordinate: "63 07 20001", adress: "Julevar cara Lazara 23" }]

    this.dataSource = new MatTableDataSource(this.equipments);
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


  Add(eq) {
    if(this.planRadaForEdit != null)
    {
      this.edited = true;
    }
    this.equipmentsArray.push(eq);
    this.swService.AddEquipments(this.equipmentsArray,this.edited);
    this.toastr.success('Uspesno dodata oprema','Success');
    const indeks = this.equipments.indexOf(eq);
    this.equipments.splice(indeks,1);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCancel()
  {
    this.router.navigate(['/planRada']);
  }

  onAdd()
  {
    if(this.planRadaForEdit != null)
    {
      this.edited = true;
    }
    this.swService.AddPlanRada(this.edited);
     
    this.toastr.success('Uspesno dodat plan rada','Success');
  }


  Check()
  {
    if(this.planRadaForEdit != null)
    {
      this.edited = true;
    }
    let currentPlanRada = this.swService.GetCurrentPlanRada(this.edited);
    if((currentPlanRada.basicinfo == null || currentPlanRada.equipments == null) && this.planRadaForEdit == null){
      return false;
    }
    return true;
  }

}
