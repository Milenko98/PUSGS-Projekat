import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkRequestEquipments } from 'src/app/Entities/work-request-equipments';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-wr-equipment',
  templateUrl: './wr-equipment.component.html',
  styleUrls: ['./wr-equipment.component.css']
})
export class WrEquipmentComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'type', 'coordinate', 'adress', 'add'];
  dataSource: MatTableDataSource<any>;
  equipments!: Array<WorkRequestEquipments>;
  selectedEquipmentId;
  equipmentsArray = new Array<WorkRequestEquipments>();
  
  workRequestForEdit = this.wrService.GetWorkRequestForEdit();
  edited = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private wrService: WorkRequestService, private toastr: ToastrService, private router: Router) {
    this.equipments = [{ id: "1", name: "Aca", type: "tip", coordinate: "23 07 20001", adress: "Bulevar cara Lazara 23" },
    { id: "2", name: "Laca", type: "Yip", coordinate: "23 07 20001", adress: "Bulevar cara Lazara 23" },
    { id: "3", name: "Dca", type: "Uip", coordinate: "33 07 20001", adress: "Vulevar cara Lazara 23" },
    { id: "4", name: "Fca", type: "Iip", coordinate: "43 07 20001", adress: "Sulevar cara Lazara 23" },
    { id: "5", name: "Gca", type: "Wip", coordinate: "53 07 20001", adress: "Dulevar cara Lazara 23" },
    { id: "6", name: "Wca", type: "Qip", coordinate: "63 07 20001", adress: "Julevar cara Lazara 23" }]

    this.dataSource = new MatTableDataSource(this.equipments);
    console.log("konstruktor equipmenta");
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
    if(this.workRequestForEdit != null)
    {
      this.edited = true;
    }
    this.equipmentsArray.push(eq);
    this.wrService.AddEquipments(this.equipmentsArray,this.edited);
    this.toastr.success('Success added equipment','Success');
    const indeks = this.equipments.indexOf(eq);
    this.equipments.splice(indeks,1);
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onCancel()
  {
    this.router.navigate(['/workRequest']);
  }

  onAdd()
  {
    if(this.workRequestForEdit != null)
    {
      this.edited = true;
      // this.wrService.ChangeWorkRequest(this.workRequestForEdit).subscribe(
      //   (res: any) => {
      //     if (res != null ) {
      //       this.toastr.success("Uspesna izmena!","Success");
      //     }
      //   }
      // );
    }
    this.wrService.AddWorkRequest(this.edited);

     this.wrService.AddWorkRequestDB().subscribe((res: any) => {
       if (res != null ) {
       }
     });
     
    this.toastr.success('Success added work request','Success');
  }

  Check()
  {
    if(this.workRequestForEdit != null)
    {
      this.edited = true;
    }
    let currentWorkRequest = this.wrService.GetCurrentWorkRequest(this.edited);
    if((currentWorkRequest.basicinfo == null || currentWorkRequest.equipments == null) && this.workRequestForEdit == null){
      return false;
    }
    return true;
  }
}
