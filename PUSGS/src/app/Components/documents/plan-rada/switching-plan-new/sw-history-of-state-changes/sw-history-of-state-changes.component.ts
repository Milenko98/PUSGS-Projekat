import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sw-history-of-state-changes',
  templateUrl: './sw-history-of-state-changes.component.html',
  styleUrls: ['./sw-history-of-state-changes.component.css']
})
export class SwHistoryOfStateChangesComponent implements OnInit {

  counterApprove! : number;
  counterDeny! : number;
  counterCancel! : number;
  istorija_stanja! : Array<any>;
  wr! : string;
  dateofchanges! : string;
  name! : string;
  lastname! : string;
  status! : string;
  choose! : string;

  constructor() {

    this.istorija_stanja = [
      {id : "WR1", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
      {id : "WR2", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
      {id : "WR3", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
      {id : "WR4", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
      {id : "WR5", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
    ]
    this.counterApprove = 0;
    this.counterCancel = 0;
    this.counterDeny = 0;
    this.choose = "";

   }

  ngOnInit(): void {
  }

  onApprove():void
  {
    this.counterApprove++;
  }

  onDeny():void
  {
    this.counterDeny++;;
  }

  onCancel():void
  {
    this.counterCancel++;;
  }


  onIzmena():void
  {
    if(this.choose !="" && this.istorija_stanja.find(x=>x.wr == this.choose)==true){
      let doc = this.istorija_stanja.find(x=>x.wr == this.choose);
      doc.status = "neki izbor";
      this.istorija_stanja[doc] = doc;
    }
  }

  onIzbor(event)
  {
    this.choose = event.target.value;
  }


}
