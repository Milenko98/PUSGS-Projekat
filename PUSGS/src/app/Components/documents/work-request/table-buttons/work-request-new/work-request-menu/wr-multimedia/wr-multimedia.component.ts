import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wr-multimedia',
  templateUrl: './wr-multimedia.component.html',
  styleUrls: ['./wr-multimedia.component.css']
})
export class WrMultimediaComponent implements OnInit{

  ngOnInit(){
  }

  files: File[] = [];

	onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
    console.log(this.files);
	}

	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}


  // onSelectFile(event)
  // {
  //   if(event.target.files)
  //   {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload=(event:any)=>{
  //       this.url = event.target.result;
  //     }
  //   }
  // }
}
