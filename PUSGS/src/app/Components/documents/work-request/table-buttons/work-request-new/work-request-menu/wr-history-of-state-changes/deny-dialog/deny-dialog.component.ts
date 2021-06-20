import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-deny-dialog',
  templateUrl: './deny-dialog.component.html',
  styleUrls: ['./deny-dialog.component.css']
})
export class DenyDialogComponent implements OnInit {

  id!: number;

  constructor(private wrService: WorkRequestService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onYes()
  {
    this.id = this.wrService.GetId();
    this.wrService.onDeny(this.id);
    this.dialog.closeAll();
  }

}
