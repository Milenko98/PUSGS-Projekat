import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.css']
})
export class ApproveDialogComponent implements OnInit {

  id!: string;

  constructor(private wrService: WorkRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onYes()
  {
    this.id = this.wrService.GetId();
    this.wrService.onApprove(this.id);
    this.dialog.closeAll();
  }

}
