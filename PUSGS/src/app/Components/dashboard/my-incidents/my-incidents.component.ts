import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-incidents',
  templateUrl: './my-incidents.component.html',
  styleUrls: ['./my-incidents.component.css']
})
export class MyIncidentsComponent implements OnInit {

  drafts: number = 0;
  canceled: number = 1;
  executing: number = 2;
  completed: number = 3;

  myIncidents: number = 5;

  constructor() { }

  ngOnInit(): void {
  }

}
