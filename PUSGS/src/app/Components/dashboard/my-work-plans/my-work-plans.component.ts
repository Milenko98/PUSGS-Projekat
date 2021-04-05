import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-work-plans',
  templateUrl: './my-work-plans.component.html',
  styleUrls: ['./my-work-plans.component.css']
})
export class MyWorkPlansComponent implements OnInit {

  drafts: number = 0;
  canceled: number = 1;
  executing: number = 2;
  completed: number = 3;

  myPlans: number = 10;

  constructor() { }

  ngOnInit(): void {
  }

}
