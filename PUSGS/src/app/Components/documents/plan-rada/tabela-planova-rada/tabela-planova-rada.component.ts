import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabela-planova-rada',
  templateUrl: './tabela-planova-rada.component.html',
  styleUrls: ['./tabela-planova-rada.component.css']
})
export class TabelaPlanovaRadaComponent implements OnInit {

  podaci_za_tabelu!:Array<any>;

  constructor() { 
    this.podaci_za_tabelu = [
      {id : "WR1", StartDate: "12.4.2021", PhoneNumber : "066485923", Status : "Draft",     Address : "Mileticeva 2"},
      {id : "WR2", StartDate: "13.4.2021", PhoneNumber : "064125963", Status : "Draft",     Address : "Subticka 10"},
      {id : "WR3", StartDate: "14.4.2021", PhoneNumber : "069741583", Status : "Submitted", Address : "Nikole Pasica 12"},
      {id : "WR4", StartDate: "15.4.2021", PhoneNumber : "063479256", Status : "Submitted", Address : "Koce Kolarova 30"},
      {id : "WR5", StartDate: "16.4.2021", PhoneNumber : "061756349", Status : "Submitted", Address : "Masarikova 2"},
    ]
  }

  ngOnInit(): void {
  }

}
