import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRadaService } from 'src/app/Services/plan-rada.service';

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.css']
})
export class ApproveDialogComponent implements OnInit {

  id!: string;

  constructor(private swService: PlanRadaService, public dialog: MatDialog) { }

  
  ngOnInit(): void {
  }

  onYes()
  {
    this.id = this.swService.GetId();
    this.swService.onApprove(this.id);
    this.dialog.closeAll();
  }

}
