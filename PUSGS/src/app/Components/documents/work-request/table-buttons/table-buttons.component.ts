import { Component, OnInit } from '@angular/core';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-table-buttons',
  templateUrl: './table-buttons.component.html',
  styleUrls: ['./table-buttons.component.css']
})
export class TableButtonsComponent implements OnInit {

  constructor(private wrService: WorkRequestService) { }

  

  ngOnInit(): void {
  }

  Metoda()
  {
    // this.wrService.PrimiZahtev();
  }

}
