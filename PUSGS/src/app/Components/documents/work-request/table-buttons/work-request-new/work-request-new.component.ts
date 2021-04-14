import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-request-new',
  templateUrl: './work-request-new.component.html',
  styleUrls: ['./work-request-new.component.css']
})
export class WorkRequestNewComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
