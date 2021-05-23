import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-work-request',
  templateUrl: './work-request.component.html',
  styleUrls: ['./work-request.component.css']
})
export class WorkRequestComponent implements OnInit {

  constructor(private route:ActivatedRoute, private wrService: WorkRequestService) { }

  ngOnInit(): void {
    this.wrService.OcistiWorkRequestForEdit(); 
  }

}
