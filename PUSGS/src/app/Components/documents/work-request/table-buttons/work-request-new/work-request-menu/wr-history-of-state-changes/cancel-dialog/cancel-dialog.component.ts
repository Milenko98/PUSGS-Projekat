import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.css']
})
export class CancelDialogComponent implements OnInit {

  id!: string;

  constructor(private wrService: WorkRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onYes()
  {
    this.id = this.wrService.GetId();
    this.wrService.onCancel(this.id);
    this.dialog.closeAll();
  }

}
