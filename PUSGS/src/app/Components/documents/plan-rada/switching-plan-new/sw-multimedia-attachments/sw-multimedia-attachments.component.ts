import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sw-multimedia-attachments',
  templateUrl: './sw-multimedia-attachments.component.html',
  styleUrls: ['./sw-multimedia-attachments.component.css']
})
export class SwMultimediaAttachmentsComponent implements OnInit {

  url = null;

  constructor() { }

  ngOnInit(): void {
  }

  onSelectFile(event)
  {
    if(event.target.files)
    {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }
  }

}
