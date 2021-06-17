import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlanRadaService } from 'src/app/Services/plan-rada.service';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.css']
})
export class CancelDialogComponent implements OnInit {

  id!: string;

  constructor(private swService: PlanRadaService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onYes()
  {
    this.id = this.swService.GetId();
    this.swService.onCancel(this.id);
    this.dialog.closeAll();
  }

}
