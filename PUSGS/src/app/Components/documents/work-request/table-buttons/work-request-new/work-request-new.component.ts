import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-work-request-new',
  templateUrl: './work-request-new.component.html',
  styleUrls: ['./work-request-new.component.css']
})
export class WorkRequestNewComponent implements OnInit {

  constructor(private route:ActivatedRoute, private wrService: WorkRequestService) { }

  ngOnInit(): void {
    this.wrService.OcistiObjekat();
  }

}
