import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sw-equipment',
  templateUrl: './sw-equipment.component.html',
  styleUrls: ['./sw-equipment.component.css']
})
export class SwEquipmentComponent implements OnInit {

  equipments:Array<any>;

  constructor() { 
    this.equipments = [
      {id : "1", name : "oprema1", tip: "tip", koordinate: "2569874", adresa : "Bulevar Oslobodjenja 21" },
      {id : "2", name : "oprema2", tip: "tip", koordinate: "1234567", adresa : "Bulevar Cara Lazara  22" },
      {id : "3", name : "oprema3", tip: "tip", koordinate: "1234567", adresa : "Bulevar Evrope 23" },
      {id : "4", name : "oprema4", tip: "tip", koordinate: "1234567", adresa : "Bulevar Cara Dusana 30" }
    ]
  }

  ngOnInit(): void {
  }

}
