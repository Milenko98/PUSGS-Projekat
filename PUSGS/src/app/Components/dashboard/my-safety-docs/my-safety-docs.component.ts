import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-safety-docs',
  templateUrl: './my-safety-docs.component.html',
  styleUrls: ['./my-safety-docs.component.css']
})
export class MySafetyDocsComponent implements OnInit {

  drafts: number = 0;
  canceled: number = 1;
  executing: number = 2;
  completed: number = 3;

  mySafetyDoc: number = 10;
  
  constructor() { }

  ngOnInit(): void {
  }

}
