import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PlanRada } from 'src/app/Entities/plan-rada';
import { PlanRadaService } from 'src/app/Services/plan-rada.service';

@Component({
  selector: 'app-sw-multimedia-attachments',
  templateUrl: './sw-multimedia-attachments.component.html',
  styleUrls: ['./sw-multimedia-attachments.component.css']
})
export class SwMultimediaAttachmentsComponent implements OnInit {

  constructor(private swService: PlanRadaService, private toastr: ToastrService){}
  files: File[] = [];
  planRadaForEdit = this.swService.GetPlanRadaForEdit();
  edited = false;

  ngOnInit(){
    if(this.planRadaForEdit !== undefined && this.planRadaForEdit.multimedia !== undefined)
    {
      this.files = this.planRadaForEdit.multimedia.files;
    }
  }

  onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

  onRemove(event) {
    if(this.planRadaForEdit != null)
    {
      this.edited = true;
    }
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
    this.swService.AddMultimedia(this.files,this.edited);
	}

  onRemoveAll()
  {
    this.files.splice(0,this.files.length);
  }

  onAdd()
  {
    if(this.planRadaForEdit != null)
    {   
      this.edited = true;   
    }
    this.swService.AddMultimedia(this.files,this.edited); 
    this.toastr.success('Uspesno dadati multimedijalni sadrzaji','Success');
    }

}
