import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRadaService } from 'src/app/Services/plan-rada.service';

@Component({
  selector: 'app-deny-dialog',
  templateUrl: './deny-dialog.component.html',
  styleUrls: ['./deny-dialog.component.css']
})
export class DenyDialogComponent implements OnInit {

  id!: string;

  constructor(private swService: PlanRadaService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onYes()
  {
    this.id = this.swService.GetId();
    this.swService.onDeny(this.id);
    this.dialog.closeAll();
  }

}
