import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wr-equipment',
  templateUrl: './wr-equipment.component.html',
  styleUrls: ['./wr-equipment.component.css']
})
export class WrEquipmentComponent implements OnInit {

  equipments! : Array<any>;

  constructor() {
    this.equipments = [
      {id : "1", name : "eq", tip: "tip", koordinate: "1234567", adresa : "Bulevar Oslobodjenja 21" },
      {id : "2", name : "eq", tip: "tip", koordinate: "1234567", adresa : "Bulevar Oslobodjenja 22" },
      {id : "3", name : "eq", tip: "tip", koordinate: "1234567", adresa : "Bulevar Oslobodjenja 23" },
      {id : "4", name : "eq", tip: "tip", koordinate: "1234567", adresa : "Bulevar Oslobodjenja 24" }
    ]
   }

  ngOnInit(): void {
  }

}
