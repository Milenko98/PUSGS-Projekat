import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { WorkRequest } from 'src/app/Entities/work-request';
import { WorkRequestService } from 'src/app/Services/work-request.service';

@Component({
  selector: 'app-wr-multimedia',
  templateUrl: './wr-multimedia.component.html',
  styleUrls: ['./wr-multimedia.component.css']
})
export class WrMultimediaComponent implements OnInit{

  constructor(private wrService: WorkRequestService, private toastr: ToastrService){}
  files: File[] = [];
  workRequestForEdit = this.wrService.GetWorkRequestForEdit();
  edited = false;

  ngOnInit(){
    if(this.workRequestForEdit !== undefined && this.workRequestForEdit.multimedia !== undefined)
    {
      this.files = this.workRequestForEdit.multimedia.files;
    }
  }


	onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	onRemove(event) {
    if(this.workRequestForEdit != null)
    {
      this.edited = true;
    }
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
    this.wrService.AddMultimedia(this.files,this.edited);
	}

  onRemoveAll()
  {
    this.files.splice(0,this.files.length);
  }

  onAdd()
  {
    if(this.workRequestForEdit != null)
    {   
      this.edited = true;   
    }
    this.wrService.AddMultimedia(this.files,this.edited); 
    this.toastr.success('Success added multimedia files','Success');
    }
}
