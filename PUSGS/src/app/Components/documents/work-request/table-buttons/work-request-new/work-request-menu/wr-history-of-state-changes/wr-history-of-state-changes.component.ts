import { DOCUMENT } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wr-history-of-state-changes',
  templateUrl: './wr-history-of-state-changes.component.html',
  styleUrls: ['./wr-history-of-state-changes.component.css']
})
export class WrHistoryOfStateChangesComponent implements OnInit {

  counterApprove! : number;
  counterDeny! : number;
  counterCancel! : number;
  documents! : Array<any>;
  wr! : string;
  dateofchanges! : string;
  name! : string;
  lastname! : string;
  status! : string;
  choose! : string;

  constructor() {

    this.documents = [
      {wr : "WR1", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
      {wr : "WR2", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
      {wr : "WR3", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
      {wr : "WR4", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
      {wr : "WR5", dateofchanges: "12.3.2021", name : "Name", lastname : "Last Name", status : "No status"},
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
    if(this.choose !="" && this.documents.find(x=>x.wr == this.choose)==true){
      let doc = this.documents.find(x=>x.wr == this.choose);
      doc.status = "neki izbor";
      this.documents[doc] = doc;
    }
  }

  onIzbor(event)
  {
    this.choose = event.target.value;
  }
}
